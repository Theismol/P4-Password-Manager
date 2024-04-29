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
            bgcolor: '#808080',
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
            }}>  {updatePass.title} - {updatePass.username}
        </Typography>
        </Box>

        <form
        >
            <TextField
                margin="normal"
                required
                id="url"
                label="URL"
                name="url"
                autoComplete="url"
                autoFocus
                value={updatePass.url} 
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

export default Openelement;





