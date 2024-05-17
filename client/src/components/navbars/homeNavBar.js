import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HomeNavBar() {
    return (
        <div> 
        <AppBar position='static'>
            
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Home
                </Typography>
                <Button color="inherit" component={Link} to="/home">Home</Button>
                <Button color="inherit" component={Link} to="/signup">sign up</Button>
                <Button color="inherit" component={Link} to="/login">login</Button>
            </Toolbar>
        </AppBar>
        </div>
    );
}

export default HomeNavBar;