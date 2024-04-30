import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import CryptoJS from 'crypto-js';
import axios from 'axios';

export default function PasswordModal({ open, handleCloseModal, selectedRow }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [csrftoken, setCsrftoken] = useState("");

  useEffect(() => {
    console.log("calling calling");
    axios.get('http://localhost:4000/api/auth/getCSRF' , {withCredentials: true}).then((response) => {
      console.log(response.data.csrftoken);
      setCsrftoken(response.data.csrftoken);
    }).catch((error) => {
      console.log(error.response.data.message);
      console.log(error);
    } )
    if (selectedRow) {
      console.log(decryptPassword(selectedRow.password));
      setUsername(selectedRow.username);
      setPassword(decryptPassword(selectedRow.password));
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
  }, [open, selectedRow]); // Update when selectedRow or generatedPassword changes

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
  const encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, localStorage.getItem("key")).toString();
  };
  const decryptPassword = (password) => {
    return CryptoJS.AES.decrypt(password, localStorage.getItem("key")).toString(CryptoJS.enc.Utf8);
  }
  
  const savePasswordToBackend = async () => {
    const encryptedPassword = encryptPassword(password);
    try {
      if (!selectedRow) {
        axios.post('http://localhost:4000/api/password/addPasswordToUser', {
          title: title,
          username: username,
          password: encryptedPassword,
          url: url,
          notes: notes,
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
        <Typography variant="h5" gutterBottom>
          Details
        </Typography>
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
        <Button variant="contained" onClick={handleSaveChanges} style={{ float: 'right', marginRight: '10' }}>Save Changes</Button>
      </Box>
    </Modal>
  );
}
