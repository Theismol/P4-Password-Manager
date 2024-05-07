//Create a gray box with a title, username, password, url, and a button to add the password

import React from 'react';
import { useState, useEffect, useCallback }  from 'react';
import { TextField, Typography,Box,  Button} from '@mui/material';
import hashPassword from '../util/passwordHash';
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
    const [masterPassword, setMasterPassword] = useState("");
    const [csrfToken, setCsrfToken] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchCsrfToken();
    }, []); 
    
    const fetchCsrfToken = useCallback(() => {
        getCSRF()
            .then((token) => setCsrfToken(token))
            .catch((error) => console.error(error)); 
    }, []); 

        const allUrls = [
            "https://spotify.com",
            "https://twitter.com",
            "https://facebook.com",
            "https://google.com",
            "https://yahoo.com",
            "https://outlook.com",
            "https://amazon.com",
            "https://netflix.com",
            "https://github.com",
            "https://openai.com",
            "http://geeksforgeeks.org",
            "https://messenger.com",
            "https://chat.openai.com/",
        ];

    const hadelGenerate = () => {
        if (count >= allUrls.length) {
            setCount(0);
        }
        const currentUrl = allUrls[count];
        setUrl(currentUrl);
        setUsername("user" + count + "name");
        setPassword("password" + count);
        setMasterPassword("q");
        setCount(count + 1);
    };

     //when the user clicks the save button, the addPassword function is called
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
        const hashedMasterPassword = await hashPassword(masterPassword);        
        const encryptedPassword = CryptoJS.AES.encrypt(password, hashedMasterPassword).toString();
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
        <Box sx={{
                top: 0,
                left: 0,
                margin: '20px',
                height: '90%',
                position: 'absolute',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                width: '350px',
                bgcolor: 'rgba(0,0,0,0.5)',
                zIndex: 10,
            }}>

        <Box sx={{
            minHeight: '450px',
            justifyContent: 'center',
                textAlign: 'center',
                margin: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            bgcolor: '#748EAB',
        }}>

        <Typography variant="h4" component="h1" sx={{
                color: 'white',
                padding: '30px',
                fontWeight: 'bold',
                textAlign: 'center',
                mt: 3}}> Add Password
        </Typography>
        <form
        onSubmit={(e) => {
            e.preventDefault();
            addPassword();
        }}
        >
            <TextField
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
                sx={{ backgroundColor: 'white', borderRadius: '5px', width: '90%' }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                size="small"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ backgroundColor: 'white', borderRadius: '5px', width: '90%' }}
            />
            <TextField
                margin="normal"
                required
                size="small"
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ backgroundColor: 'white', borderRadius: '5px', width: '90%' }}
            />
            <TextField
                margin="normal"
                required
                size="small"
                fullWidth
                id="masterpassword"
                label="Master Password"
                name="masterpassword"
                autoComplete="masterpassword"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                sx={{ backgroundColor: 'white', borderRadius: '5px', width: '90%' }}
            />
            
            <Box sx={{
                display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        bgcolor: '#5ca85c',
                        color: 'black',
                        width: '80%',
                        bottom: '0',
                        m: 2,
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
                        width: '80%',
                        m: 2,
                        '&:hover': {
                            bgcolor: '#d9534f',
                            color: 'black',
                            transition: '0.5s',
                        }
                    }}> Close </Button>
            </Box>
        </form>
        <Button onClick={hadelGenerate} sx={{
            display: 'flex',
            itemAlign: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            bgcolor: '#5bc0de',
            color: 'black',
            width: '100%',
            mb: 2,
            '&:hover': {
                bgcolor: '#5bc0de',
                color: 'black',
                transition: '0.5s',
            }
        }} > Generate Password </Button>
        <h3> {count} </h3>
        </Box>
        </Box>
    );
}

export default AddPassword;
        
