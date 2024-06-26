/* global chrome */
import { TextField, Typography,Box,  Button} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EnterMasterPassword from './EnterMasterPassword';


function openWebApp()
{
    chrome.runtime.sendMessage({message: "open_new_tab"}, function(response) {
            console.log(response);
        });

}

export default function Login({onLogin}) {
    const [enteredPasswordBoolean, setEnteredPasswordBoolean] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/auth/exntionCheckLogin", {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setEnteredPasswordBoolean(true);
                }
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []); // Empty dependency array to ensure useEffect runs only once


    return (
    <div>
      <Box sx={{
              width: '350px',
              height: '450px',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#08192c'}}>

        {enteredPasswordBoolean ? <EnterMasterPassword onClose={onLogin} /> : null}

      <Typography variant="h4" component="h1" sx={{
              color: 'white',
              padding: '30px',
              fontWeight: 'bold',
              textAlign: 'center'
              }}> Sign in
      </Typography>
      <Typography component="p" sx={{ color: 'white', marginLeft: '9%'}}> Press the Button to Sign in:</Typography>
            <Button
              onClick={openWebApp}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,
                      bgcolor: '#f0ad4e',
                      color: 'black',
                      fontWeight: 'bold',
                      borderRadius: '5px',
                      border: '2px solid #f0ad4e',
                      width: '80%',
                      marginLeft:"9%"}}>
              Sign In
        </Button>
      </Box>
    </div>
        
   );
}

