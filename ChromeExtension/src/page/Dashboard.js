/* global chrome */
//create a new Dashboard component
import { TextField, Typography, Box, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import AddPassword from './AddPassword';
import Openelement from './Openelement';
import { enterMasterPassword } from './EnterMasterPassword';

import CryptoJS from 'crypto-js';

export let updatePass = { name: null, url: null, username: null, password: null };

export default function Dashboard() {
    const [currentPasswords, setCurrentPasswords] = useState([]);
    const [addPasswordBoolean, setAddPasswordBoolean] = useState(false);
    const [openElementBoolean, setOpenElementBoolean] = useState(false);
    const [save, setSave] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/password/getPasswords", {
                    withCredentials: true,
                });
                setCurrentPasswords(response.data.passwords);
                storePassword(response.data.passwords);
            } catch (error) {
                console.error("Error fetching passwords:", error);
            }
        };

        fetchData();

    }, [save]);

    const storePassword = async (passwords) => {
        try {
            console.log(passwords)
            const response = await axios.get("http://localhost:4000/api/auth/getUserKey", {
                withCredentials: true,
            });
            const passwordList = passwords.map((password) => {

                return {
                    url: password.url,
                    username: password.username,
                    password: password.password,
                };
            });

            const encryptedPassword = CryptoJS.AES.encrypt(enterMasterPassword, response.data.key).toString();

            chrome.storage.sync.set({ encryptedpassword: passwordList });
            chrome.storage.sync.set({ encryptedMasterPassword: encryptedPassword });



        } catch (error) {
            console.error("Error fetching key:", error);
        }
    };





    const setAddPassword = () => {
        setAddPasswordBoolean(!addPasswordBoolean);
    };

    const setOpenElement = () => {
        setOpenElementBoolean(!openElementBoolean);
    };

    const setSaveBoll = () => {
        setSave(!save);
    };

    return (
        <Box sx={{
            width: '350px',
            minHeight: '450px',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            bgcolor: '#08192c'
        }}>

            <Typography variant="h4" component="h1" sx={{

                color: 'white',
                padding: '30px',
                fontWeight: 'bold',
                textAlign: 'center'

            }}> Dashboard
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                <Typography component="p" sx={{
                    color: 'white',
                    textAlign: 'center',
                    marginTop: '20px'
                }}>
                    List of your passwords:
                </Typography>
                <List sx={{ width: '100%', padding: 0 }}>

                    {currentPasswords.map((password, index) => (

                        <ListItem
                            key={password._id}
                            button
                            onClick={() => {
                                updatePass = password;
                                setOpenElement();
                            }}

                            sx={{
                                width: '90%', // Adjusted width to 80%
                                border: '1px solid white',
                                borderRadius: '3px',
                                '&:hover': { backgroundColor: 'gray' },
                                padding: '1px',
                                //this makes horizontal centering work
                                margin: '0 auto', ...(index !== currentPasswords.length - 1 && { marginBottom: '3px' }),
                            }}>


                            <ListItemIcon sx={{ paddingLeft: '20px' }}>
                                <img
                                    src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${password.url}&size=24`} alt="favicon" />
                            </ListItemIcon>


                            <ListItemText
                                primary={
                                    <Typography variant="h7" sx={{ color: 'white' }}>
                                        {password.title}
                                    </Typography>
                                }

                                secondary={
                                    <Typography sx={{ color: 'white' }}>
                                        {password.username}
                                    </Typography>
                                } />

                        </ListItem>
                    ))}
                </List>
            </Box>;
            <br />

            {addPasswordBoolean ? <AddPassword onClose={setAddPassword} onSave={setSaveBoll} /> : null}
            {openElementBoolean ? <Openelement onClose={setOpenElement} /> : null}

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
