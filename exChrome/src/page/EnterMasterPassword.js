import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button, Typography, Box, Alert} from "@mui/material";
import axios from "axios";
import hashPassword from "../util/passwordHash";
import  getCSRF  from "./getCSRF";

export let enterMasterPassword = "";
 
export default function EnterMasterPassword({onClose, onCansel}) {
    const [csrfToken, setCsrfToken] = useState(null);
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    const callBackend = useCallback(async () => { 
        const hashedPassword = await hashPassword(password, 600000);
        const sendPassword = await hashPassword(hashedPassword, 1);
        try {
            
            const response = await axios.post("http://localhost:4000/api/auth/checkMasterPassword", {
            password: sendPassword,
            csrftoken: csrfToken // Use the fetched CSRF token
            }, {
                withCredentials: true,
            });
            if (response.status === 200) {
                enterMasterPassword = hashedPassword;
                onClose();
            }
        } catch (error) {
            setIsError(true);
        }
    }, [csrfToken, password, onClose]);

    useEffect(() => {
        getCSRF().then((token) => {
            setCsrfToken(token);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        callBackend();
    };

    return  (
         <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    overflow: 'auto', // Enable scrolling if content exceeds viewport dimensions
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
                textAlign: 'center',
                borderRadius: '10px',
                padding: '20px',
            }}
        >
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>Enter Master Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
            label="Enter Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
         onChange={(e) => {
                    setPassword(e.target.value);
                    setIsError(false); // Reset isError state when password changes
                }}

        sx={{
                mb: 2,
                borderRadius: '5px',
                backgroundColor: 'white',
            }}
        />
        {isError ? <Alert severity="error" sx={{ mb: 2 }}
            >Incorrect password</Alert> : null}

            <Button variant="contained" type="submit" sx={{ bgcolor: '#5ca85c',
                    color: 'black', width: '100%', mb: 1 }}>Submit</Button>
            </form>
        </Box>
    </Box>
    );
}

