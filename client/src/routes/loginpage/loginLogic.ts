export const handleLogin = (e: SubmitEvent) => { 
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username')as string;  
    const password = formData.get('password')as string;


    console.log("username is ", username)
    console.log("password is ", password)

    fetchUser(username,password)
}

const fetchUser = async (username: string,password:string) => {
    try {
        const response = await fetch('http://172.20.10.3:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();

        // Assuming the JWT token is received in the response data
        const jwtToken = data.token;

        // Set the JWT token in an HTTP-only cookie with the secure flag
        document.cookie = `jwtToken=${jwtToken}; HttpOnly; Secure; SameSite=Strict`;

        console.log('Login successful');
        console.log('JWT token:', jwtToken);
    } catch (error:any) {
        console.error('Error logging in:', error.message);
    }

}