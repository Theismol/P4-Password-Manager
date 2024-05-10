import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, Select, InputLabel, OutlinedInput, MenuItem, Checkbox, ListItemText } from '@mui/material';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { FormControl } from '@mui/base';
import { NaclEncrypt } from '../../services/NaclEncryption';
import { AESDecrypt, AESEncrypt } from '../../services/AESEncryption';


export default function PasswordModal({ open, handleCloseModal, selectedRow, canShare }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [csrftoken, setCsrftoken] = useState("");
  const [shareID, setShareID] = useState("");
  const [shareUsername, setShareusername] = useState("");
  const [sameOrgUsers, setSameOrgUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/auth/getCSRF' , {withCredentials: true}).then((response) => {
      console.log(response.data.csrftoken);
      setCsrftoken(response.data.csrftoken);
    }).catch((error) => {
      console.log(error.response.data.message);
      console.log(error);
    } )
    if (selectedRow) {
      setUsername(selectedRow.username);
      setPassword(AESDecrypt(selectedRow.password,localStorage.getItem("key")));
      setTitle(selectedRow.title);
      setUrl(selectedRow.url);
      setNotes(selectedRow.url);
    }
    else {
      setUsername("");
      setPassword("");
      setTitle("");
      setUrl("");
      setNotes("");
    }

    axios.get("http://localhost:4000/api/organization/getUserInOrganization", {
      withCredentials: true
    }).then((response) => {
      setSameOrgUsers(response.data.users);
    }).catch((error) => {
      console.log(error);
    });
  }, [open, selectedRow]); // Update when selectedRow or generatedPassword changes


  const handleShareChange = (event) => {
    const {
      target: { value },
    } = event;
    for (let i=0;i<sameOrgUsers.length;i++) {
      if (value === sameOrgUsers[0].username) {
        setShareusername(value);
        setShareID(sameOrgUsers[0]._id)
        break;
      }
    }
  };
  const generatePassword = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:"<>?';
    const passwordLength = 26;
    let passwordString = '';
    const randomValues = window.crypto.getRandomValues(new Uint32Array(passwordLength));
    for (let i = 0; i < passwordLength; i++) {
        passwordString += characters[randomValues[i] % characters.length];
    }
    setPassword(passwordString);

  }
  
  const savePasswordToBackend = async () => {
    const encryptedPassword = AESEncrypt(password,localStorage.getItem("key"));
    try {
      if (!selectedRow) {
        axios.post('http://localhost:4000/api/password/addPasswordToUser', {
          title: title,
          username: username,
          password: encryptedPassword,
          url: url,
          notes: notes,
          isIncoming: false,
          csrftoken: csrftoken
        }, {
          withCredentials: true,
        }).then((response) => {
          console.log("we added it");
          handleCloseModal();

        }).catch((error) => {
          console.log(error);
          console.log("we did not add it");
        })
      }
      else {
        axios.put("http://localhost:4000/api/password/updatePassword", {    
        passwordId: selectedRow._id,
        title: title,
        username: username,
        password: encryptedPassword,
        url: url,
        notes: notes,
        csrftoken: csrftoken
      }, {
        withCredentials: true,
      }).then((response) => {
        console.log("we updated it");
        handleCloseModal();

        }).catch((error) => {
          console.log("we did not update it");
        })

      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };
  const handleSharePasswords= () => {
    axios.get('http://localhost:4000/api/keyExchange/getKeys', {withCredentials: true, params: {user: shareID}}).then((response) => {
      const publicKey = response.data.publicKey;
      const privateKey = response.data.privateKey;
      const encryptedPassword = NaclEncrypt(publicKey, AESDecrypt(privateKey,localStorage.getItem("key")), JSON.stringify({username: username, password: password, url: url, title: title}))
      //Skal tjekke om her virker, kryptere key til local storage og decrypt de incoming passwords der er.
      axios.post('http://localhost:4000/api/password/sendPassword', {user: shareID, csrftoken: csrftoken, password : encryptedPassword}, {withCredentials: true}).then((response) => {
        open = false;
        console.log("it has been shared woo");
      }).catch((error) => {
        console.log("sharing did not work :(");
      })
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleSaveChanges = () => {
    if (password) {
      savePasswordToBackend(); // Save the generated password
    }
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: '80vw',
          maxHeight: '80vh',
          overflowY: 'auto',
          borderRadius: 4,
        }}
      >
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Typography variant="h5" gutterBottom>
            Details
          </Typography>
          <Box sx={{justifyContent: "flex-end"}}>
            <FormControl>
              <InputLabel id="sharelabel">Available users to share with</InputLabel>
              <Select
                labelId='sharelabel'
                id="shareselect"
                value={shareUsername}
                onChange={handleShareChange}
                input={<OutlinedInput label="Hello"/>}
                renderValue={(selected) => selected}
              >
                {sameOrgUsers.map ((user) => (
                  <MenuItem key={user.username} value={user.username}>
                    <Checkbox checked={user.username === shareUsername}/>
                    <ListItemText primary={user.username}/>
                  </MenuItem>
                ))}
              </Select>
              <Button onClick={handleSharePasswords} variant="contained" >Share password</Button>
            </FormControl>
          </Box>
        </Box>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Notes"
          variant="outlined"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={generatePassword}>Generate Password</Button>
        <Button variant="contained" onClick={handleCloseModal} style={{ float: 'right' }}>Close</Button>
        <Button variant="contained" onClick={handleSaveChanges} style={{ float: 'right', marginRight: '' }}>Save Changes</Button>
      </Box>
    </Modal>
  );
}
