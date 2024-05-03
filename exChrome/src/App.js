//add route to the App.js file
import { TextField,  Typography,Box,  Button} from '@mui/material';
import React, { useState } from 'react';
import  Login from './page/Login';
import Dashboard from './page/Dashboard';


//create a new Login component
function App() { 

    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    }
    //create a new Login component
    return (
        <Box sx={{
            height: '450px',
            width: '350px'
        }}>
        
        {loggedIn ? <Dashboard/> : <Login onLogin={handleLogin} />}
        </Box>
    );
}

export default App;
