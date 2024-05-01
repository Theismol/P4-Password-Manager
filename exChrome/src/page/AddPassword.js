//Create a gray box with a title, username, password, url, and a button to add the password

import React from 'react';
import { useState } from 'react';
import { TextField, Typography,Box,  Button} from '@mui/material';
import hashPassword from '../util/passwordHash';



import axios from 'axios';


let csrfToken = "";

function getCSRF() {
    axios.get("http://localhost:4000/api/auth/getCSRF", {
        withCredentials: true,
    }).then((response) => {
        console.log(response);
        csrfToken = response.data.csrftoken;
        console.log(csrfToken);
    }).catch((error) => {
        console.log(error);
    });
}


function AddPassword({onClose, onSave}) {
    const [url, setUrl] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function addPassword() {
        getCSRF();
        axios.post("http://localhost:4000/api/password/addPasswordToUser", {
            url: url,
            title: url,
            username: username,
            password: password,
            csrftoken: "CSRF_TOKEN"
        }, {
            withCredentials: true,
        }).then((response) => {
            console.log(response);
            onClose();
        }).catch((error) => {
            console.log(error);
        });
    }

    return ( 
        <Box sx={{
            margin: '10px', 
                //full screen height
                height: '450px',
                width: '350px',
                top: 0,
                left: 0,
                zIndex: 10,
                paddingLeft: '15px',
                position: 'absolute',
                justifyContent: 'center', 
                alignItems: 'center', 
                textAlign: 'center', 
            }}>
        <Box sx={{
            width: '300px',
            margin: '10px',
            minHeight: '450px',
            justifyContent: 'center',
            borderRadius: '10px',
            alignItems: 'center',
                textAlign: 'center',
            bgcolor: '#8080af',
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
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ backgroundColor: 'white', borderRadius: '5px', width: '90%' }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </Box>
        </Box>
    );
}

export default AddPassword;
        
