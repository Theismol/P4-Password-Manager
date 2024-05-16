import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { TextField, Typography,Box,  Button, Alert} from '@mui/material';

import { enterMasterPassword } from './EnterMasterPassword';
import { updatePass } from './Dashboard';
import * as CryptoJS from 'crypto-js';



function Openelement({ onClose, onSave }) {

    return (
         <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    overflow: 'auto', // Enable scrolling if content exceeds 
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
                    zIndex: 9, // Ensure it's behind Openelement but above other content
                }}
            >
        <Box
            sx={{
                position: 'fixed',
                top: '50%',
                left: '0%',
                zIndex: 10, // Ensure it's above the semi-transparent background
                bgcolor: 'rgba(0, 0, 0, 0.5)', 
                transform: 'translate(0%, -50%)',
                    width: '310px',
                maxHeight: '80vh', // Set maximum height to 80% of viewport height
                overflow: 'auto', // Enable scrolling if content exceeds dimensions
                bgcolor: '#748EAB',
                borderRadius: '10px',
                padding: '20px',
            }}
        >
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>Change Site</Typography>
            {/* Your content */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${updatePass.url}&size=24`} alt="favicon" />

                <Typography component="p"
        sx={{ color: 'white',
                fontSize: '20px', ml: 1
        }}> - {updatePass.title}</Typography>
            </Box>
            <ShowChangeSite
            onClose={onClose}
            encryptPassword={updatePass.password}
            hashPassword={enterMasterPassword} />
        </Box>
    </Box>
    );
}
function ShowChangeSite({onClose, encryptPassword, hashPassword}) {
    //encrypt password
    const [originalPassword, setUpdatePass] = useState("");
    const [isHovered, setIsHovered] = useState({
        url: false,
        username: false,
        password: false

    });

    const handleMouseEnter = (field) => {
        setIsHovered(prev => ({ ...prev, [field]: true }));
    };

    const handleMouseLeave = (field) => {
        setIsHovered(prev => ({ ...prev, [field]: false }));
    };

    useEffect(() => {
        console.log(encryptPassword);
        const bytes = CryptoJS.AES.decrypt(encryptPassword, hashPassword);
        console.log(bytes);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        setUpdatePass(originalText);


    }, []);

    return (
        <form>
            <TextField
        //url
        margin="normal"
        required
        fullWidth
        id="url"
        label="URL"
        name="url"
        size="small"
        autoComplete="url"
        value={updatePass.url}
        disabled={isHovered.url} // Conditionally disable based on hover
        onMouseEnter={() => handleMouseEnter('url')}
        onMouseLeave={() => handleMouseLeave('url')}
        sx={{
            filter: 'brightness(85%)',
            backgroundColor: 'white',
            marginTop: '20px',
            borderRadius: '5px',
            width: '90%',
            '& .MuiInputLabel-root': {
                color: 'black', // 
            },
            '.Mui-disabled': {
                color: 'black', 
                WebkitTextFillColor: 'black', 
                filter: 'brightness(85%)',
                },
        }}
    />

        <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                size="small"
                autoComplete="username"
                value={updatePass.username}
                disabled={isHovered.username} // Conditionally disable based on hover
                onMouseEnter={() => handleMouseEnter('username')}
                onMouseLeave={() => handleMouseLeave('username')}
                sx={{
                    filter: 'brightness(85%)',
                    backgroundColor: 'white',
                    marginTop: '20px',
                    borderRadius: '5px',
                    width: '90%',
            '& .MuiInputLabel-root': {
                color: 'black', // 
            },
            '.Mui-disabled': {
                color: 'black', 
                WebkitTextFillColor: 'black', 
                filter: 'brightness(85%)',
                },
                }}
            />
        <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                size="small"
                autoComplete="password"
                value={originalPassword}
                disabled={isHovered.username} // Conditionally disable based on hover
                onMouseEnter={() => handleMouseEnter('username')}
                onMouseLeave={() => handleMouseLeave('username')}
                sx={{
                    filter: 'brightness(85%)',
                    backgroundColor: 'white',
                    marginTop: '20px',
                    borderRadius: '5px',
                    width: '90%',
            '& .MuiInputLabel-root': {
                color: 'black', // 
            },
            '.Mui-disabled': {
                    color: 'black', 
                    WebkitTextFillColor: 'black', 
                    filter: 'brightness(85%)',
                    },
                }}
            />

            <Box sx={{
                display: 'flex', justifyContent: 'center' }}>
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
    )
}


export default Openelement;

