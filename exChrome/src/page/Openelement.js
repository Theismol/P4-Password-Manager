import React from 'react';
import { useState } from 'react';
import { TextField, Typography,Box,  Button} from '@mui/material';
import hashPassword from '../util/passwordHash';
import axios from 'axios';

import { updatePass } from './Dashboard';



function Openelement({onClose, onSave}) {
    return ( 
        <Box sx={{
            margin: '10px', 
                //full screen height and width
                height: '100vh',
                width: '100%',
                bgcolor: 'rgba(0,0,0,0.5)',
                top: -10,
                left: -10,
                zIndex: 10,
                position: 'absolute',
            }}>

        <Box sx={{
            position: 'relative',
            width: '350px',
            margin: '10px',
            minHeight: '450px',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            textAlign: 'center',
            bgcolor: '#748EAB',
        }}>




        <Typography variant="h4" component="h1" sx={{
                color: 'white',
                padding: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
                mt: 3}}> Change Site
        </Typography>
        <Box sx={{
                display: 'flex',
                alignItems: 'center',

                width: '100%',
                justifyContent: 'center',
        }}>
        <img src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${updatePass.url}&size=24`} alt="favicon"/>
        <Typography component="p" sx={{ color: 'white',
                fontSize: '20px',
                itemAlign: 'center',
                textAlign: 'center',
                marginLeft: '10px',
                alignItems: 'center',
                justifyContent: 'center'
            }}> - {updatePass.title}
        </Typography>
        </Box>

        <form>
            <TextField
                margin="normal"
                required
                id="url"
                label="URL"
                name="url"
                autoComplete="url"
                value={updatePass.url} 
                sx={{ backgroundColor: 'white',
                        borderRadius: '5px', width: '90%' }}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={updatePass.username}
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
                value={updatePass.password}
                sx={{ backgroundColor: 'white', borderRadius: '5px', width: '90%' }}
            />
            <Box sx={{
                display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    onClick={onClose}
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

export default Openelement;





