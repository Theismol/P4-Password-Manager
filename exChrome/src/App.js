//add route to the App.js file
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
        <div>
        {loggedIn ? <Dashboard/> : <Login onLogin={handleLogin} />}
        </div>
    );
}

export default App;
