//Create a gray box with a title, username, password, url, and a button to add the password

import React from 'react';
import { TextField, Typography,Box,  Button} from '@mui/material';
import hashPassword from '../util/passwordHash';
import axios from 'axios';
import { FormControl } from '@mui/base/FormControl';

let csrfToken = '';


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

export default function AddPassword({onClose, url, username, password, setUrl, setUsername, setPassword}) { getCSRF();
    return ( <div style={{ margin: '10px', 
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
            bgcolor: '#08178c'}}>

        <Typography variant="h4" component="h1" sx={{
                color: 'white',
                padding: '30px',
                fontWeight: 'bold',
                textAlign: 'center',
                mt: 3}}> Add Password
        </Typography>
<FormControl>
            <TextField
                margin="normal"
                required
                id="url"
                label="URL"
                name="url"
                autoComplete="url"
                autoFocus
                value={url}
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
                autoFocus
                value={username}
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
                autoFocus
                value={password}
                sx={{ backgroundColor: 'white', borderRadius: '5px', width: '90%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#5ca85c',
                        color: 'black',
                        width: '80%',
                        bottom: '0',
                        m: 2,
                        '&:hover': {
                            bgcolor: '#f0ad4e',
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
            </div>
        </FormControl>
        </Box>
        </div>
    );
}




        
