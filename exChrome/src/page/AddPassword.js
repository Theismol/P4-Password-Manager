//Create a gray box with a title, username, password, url, and a button to add the password

import React from 'react';
import { useState, useEffect, useCallback }  from 'react';
import { TextField, Typography,Box,  Button} from '@mui/material';

import {enterMasterPassword} from './EnterMasterPassword'

import axios from 'axios';

import * as CryptoJS from 'crypto-js';

function getCSRF() {
    return axios.get("http://localhost:4000/api/auth/getCSRF", {
        withCredentials: true,
    }).then((response) => {
        return response.data.csrftoken;
    }).catch((error) => {
        throw new Error("Failed to fetch CSRF token");
    });
}

function AddPassword({ onClose, onSave }) {
    const [url, setUrl] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [csrfToken, setCsrfToken] = useState(null);
    const [count, setCount] = useState(0);

    //caleback to generate a new password
    //  const generatePassword = () => {
  //  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:"<>?';
  //  const passwordLength = 26;
  //  let passwordString = '';
  //  const randomValues = window.crypto.getRandomValues(new Uint32Array(passwordLength));
  //  for (let i = 0; i < passwordLength; i++) {
  //      passwordString += characters[randomValues[i] % characters.length];
  //  }
  //  setPassword(passwordString);
  //}
  
    const genereatePassword = useCallback(async () => {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:"<>?';
            const passwordLength = 26;
            let passwordString = '';
            const randomValues = window.crypto.getRandomValues(new Uint32Array(passwordLength));
            for (let i = 0; i < passwordLength; i++) {
                passwordString += characters[randomValues[i] % characters.length];
            }
            setPassword(passwordString);
    }, []);

    useEffect(() => {
        fetchCsrfToken();
    }, []); 
    
    const fetchCsrfToken = useCallback(() => {
        getCSRF()
            .then((token) => setCsrfToken(token))
            .catch((error) => console.error(error)); 
    }, []); 

    const handleSave = useCallback(() => {
        if (csrfToken !== null) {
            //
            addPassword();
        } else {
            console.error("CSRF token not available");
        }
    }, [csrfToken]); // Add dependencies

    const addPassword = useCallback(async () => {
        // Encrypt the password
        
        const encryptedPassword = CryptoJS.AES.encrypt(password, enterMasterPassword).toString();
        // Send the password to the server
        axios.post("http://localhost:4000/api/password/addPasswordToUser", {
            url: url,
            title: url,
            username: username,
            password: encryptedPassword,
            csrftoken: csrfToken // Use the fetched CSRF token
        }, {
            withCredentials: true,
        }).then((response) => {
            console.log(response);
            onSave();
            onClose();
        }).catch((error) => {
            console.error("Failed to add password:", error); // Handle error
        });
    }, [url, username, password, csrfToken]); // Add dependencies

    return ( 
         <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    overflow: 'auto', // Enable scrolling if content exceeds 
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
                    zIndex: 9, // Ensure it's behind Openelement but above other content
                }}
            >
        <Box
            sx={{
                position: 'fixed',
                top: '50%',
                left: '0%',
                zIndex: 10, // Ensure it's above the semi-transparent background
                bgcolor: 'rgba(0, 0, 0, 0.5)', 
                transform: 'translate(0%, -50%)',
                    width: '310px',
                maxHeight: '80vh', // Set maximum height to 80% of viewport height
                overflow: 'auto', // Enable scrolling if content exceeds dimensions
                bgcolor: '#748EAB',
                borderRadius: '10px',
                padding: '20px',
            }}
        >
                <Typography variant="h4" component="h1" sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 2,
                }}>Add Password
                </Typography>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addPassword();
                    }}
                >
                    <TextField
                        fullWidth
                        margin="normal"
                        required
                        id="url"
                        label="URL"
                        name="url"
                        autoComplete="url"
                        size="small"
                        autoFocus
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        required
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        size="small"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        required
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        size="small"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                    />
                    <Box sx={{
                        display: 'flex', justifyContent: 'center', width: '100%', mt: 2
                    }}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                bgcolor: '#5ca85c',
                                color: 'black',
                                width: '40%',
                                '&:hover': {
                                    bgcolor: '#5ca85c',
                                    color: 'black',
                                    transition: '0.5s',
                                }
                            }}> Save </Button>
                        <Button
                            variant="contained"
                            onClick={onClose}
                            sx={{
                                bgcolor: '#d9534f',
                                color: 'black',
                                width: '40%',
                                ml: 2,
                                '&:hover': {
                                    bgcolor: '#d9534f',
                                    color: 'black',
                                    transition: '0.5s',
                                }
                            }}> Close </Button>
                    </Box>
                </form>
                <Button onClick={genereatePassword} sx={{
                    bgcolor: '#5bc0de',
                    color: 'black',
                    width: '90%',
                    mt: 2,
                    '&:hover': {
                        bgcolor: '#5bc0de',
                        color: 'black',
                        transition: '0.5s',
                    }
                }} > Generate Password </Button>
            </Box>
        </Box>
    );
};


export default AddPassword;
        
