export const handleLogin = (e: SubmitEvent) => { 
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;  
    const password = formData.get('password') as string;


    console.log("username is ", username)
    console.log("password is ", password)

    fetchUser(username,password)
}

const fetchUser = async (username: string,password:string) => {
    const response = await fetch('http://172.20.10.3:4000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
    const data = await response.json()
    console.log(data)
    
}