//create a new Dashboard component
//
import { TextField, Typography,Box,  Button} from '@mui/material';
import React  from 'react';
import { useState } from 'react';

import hashPassword from '../util/passwordHash';
import axios from 'axios';
import AddPassword from './AddPassword';







function getPasswords() {
    //add a list of passwords and urls and usernames
    const getPass = axios.get("http://localhost:4000/api/password/getPasswords", {
        withCredentials: true,
    }).then((response) => {
        console.log(response);
        return response;
    }).catch((error) => {
        console.log(error);
    });
    return getPass;
  //  return [
  //      {name: "twitter", url: "https://twitter.com", username: "user1", password: "password1"},
  //      {name: "facebook", url: "https://facebook.com", username: "user2", password: "password2"},
  //      {name: "instagram", url: "https://instagram.com", username: "user3", password: "password3"},
  //      {name: "gmail", url: "https://google.com", username: "user4", password: "password4"},
  //      {name: "yahoo", url: "https://yahoo.com", username: "user5", password: "password5"},
  //      {name: "outlook", url: "https://outlook.com", username: "user6", password: "password6"},
  //      {name: "amazon", url: "https://amazon.com", username: "user7", password: "password7"},
  //      {name: "netflix", url: "https://netflix.com", username: "user8", password: "password8"},
  //      {name: "spotify", url: "https://spotify.com", username: "user9", password: "password9"}
  //  ];
}

export default function Dashboard() {
    const [url, setUrl] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function updateUrl(event) {
        setUrl(event.target.value);
    }

    const [addPasswordBoll, setAddPasswordBoll] = useState(false);

    function setAddPassword() {
        setAddPasswordBoll(!addPasswordBoll);
    }
    return (
        <Box sx={{
            width: '350px',
            margin: '10px',
            minHeight: '450px',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
                
            bgcolor: '#08192c'}}>
            <Typography variant="h4" component="h1" sx={{
                color: 'white',
                padding: '30px',
                fontWeight: 'bold',
                textAlign: 'center',
                mt: 3}}> Dashboard
            </Typography>
        <Typography component="p" sx={{ color: 'white',
                itemAlign: 'center',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                ///create a hover from left to right animation
                '&:hover': {
                    color: 'red',
                    transition: '0.5s',
                   } 
                }}> List of your passwords: </Typography>
        <br/>

        {addPasswordBoll ? (
            <AddPassword 
                onClose={() => setAddPassword(false)} 
                url={url} 
                username={username} 
                password={password} 
                setUrl={updateUrl}
            /> 
        ) : null}

        
        <Button variant="contained"
        onClick={setAddPassword}
        sx={{
                bgcolor: '#f0ad4e',
                color: 'black',
                width: '80%',
                mt: 3,
                mb: 2,
                '&:hover': {
                    bgcolor: '#f0ad4e',
                    color: 'black',
                    transition: '0.5s',
                }
        }}> Add Password </Button>
        </Box>

    );
}
