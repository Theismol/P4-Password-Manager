/* global chrome */
import { TextField, Typography,Box,  Button} from '@mui/material';
import React from 'react';
import hashPassword from '../util/passwordHash';
import axios from 'axios';



function loginGet()
{
    //chrome.runtime.sendMessage({message: "open_new_tab"}, function(response) {
    //        console.log(response);
    //    });
    ////axios.get("http://localhost:4000/api/password/chceckToken", {
    //    withCredentials: true,
    //}).then((response) => {
    //    console.log(response);
    //}).catch((error) => {
    //    console.log(error);
    //});

}

export default function Login({onLogin}) {
    function callAPI() {
        axios.get("http://localhost:4000/api/auth/exntionCheckLogin", {
            withCredentials: true,
        }).then((response) => {
            if (response.status === 200) {
                onLogin();
            }
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }
    callAPI();

    return (
    <div>
      <Box sx={{
              width: '350px',
              margin: '10px',
              height: '450px',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#08192c'}}>

      <Typography variant="h4" component="h1" sx={{
              color: 'white',
              padding: '30px',
              fontWeight: 'bold',
              textAlign: 'center',
              mt: 3}}> Sign in
      </Typography>
      <Typography component="p" sx={{ color: 'white', marginLeft: '9%'}}> Press the Button to Sign in:</Typography>
            <Button
              onClick={loginGet}
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
        <Button onClick={callAPI} sx={{color: 'white', 
                marginLeft: '9%', 
                bgcolor: '#f0ad4e',
                marginTop: '10px'}}>Check Token</Button>
      </Box>
    </div>
        
   );
}

