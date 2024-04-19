import React from 'react';
import { useEffect } from 'react';

const Test = () => {
    useEffect(() => {
        fetchData();
    }, []);


    
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'b',
                    password: 'b'
                }),credentials: 'include'
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
        <h1>Test</h1>
        </div>
    );
    }

export default Test;
