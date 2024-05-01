/* global chrome */
//create a new Dashboard component
import { TextField,  Typography,Box,  Button} from '@mui/material';
import React, {useState}  from 'react';

import hashPassword from '../util/passwordHash';

import axios from 'axios';
import AddPassword from './AddPassword';
import Openelement from './Openelement';


let boolShow = true;

export let updatePass =  {name: null, url: null, username: null, password: null};

    function getPass() {
        //add a list of passwords and urls and usernames
        const getPass = axios.get("http://localhost:4000/api/password/getPasswords", {
            withCredentials: true,
        }).then((response) => {
            return response.data.passwords;
        }).catch((error) => {
            return "errorsdasd"
        });
        return getPass;
    }

export default function Dashboard() {

    const [allPasswords, setAllPasswords] = useState(getPass());
    const [currentPasswords, setCurrentPasswords] = useState([]);

    allPasswords.then((passwords) => {
        if (passwords !== "errorsdasd" && boolShow) {
            setCurrentPasswords(passwords);
        }
        //when its done loading set the current passwords
    });

    if (currentPasswords.length !== 0 && boolShow) {
        console.log(currentPasswords);
        boolShow = false;

        chrome.runtime.sendMessage({currentPasswords}, function(response) {
            console.log(response.message);
        });
    }


    const [addPasswordBoll, setAddPasswordBoll] = useState(false);
    const [openElementBoll, setOpenElementBoll] = useState(false);

    function setAddPassword() {
        setAddPasswordBoll(!addPasswordBoll);
    }
    function setOpenElement() {
        setOpenElementBoll(!openElementBoll);
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
        {currentPasswords.map((password) => {
            return (
                <Box key={password._id} onClick={() => {
                    updatePass = password;
                    setOpenElement();
                }}
                    sx={{
                        padding: '10px',
                        paddingLeft: '40px',
                        display: 'flex',
                        flexDirection: 'row',
                        border: '1px solid white',
                        '&:hover': {'background-color': 'gray'}
                }}>
                <img src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${password.url}&size=24`} alt="favicon"/>
                <Typography component="p" sx={{ color: 'white',
                        fontWeight: 'bold',  
                        marginLeft: '9%'
                }}>
                  {password.title} - {password.username} 
                </Typography>
                </Box>
                
            );
        })}
        <br/>

        {addPasswordBoll ? <AddPassword onClose={setAddPassword} /> : null}
        {openElementBoll ? <Openelement onClose={setOpenElement} /> : null}
        
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
