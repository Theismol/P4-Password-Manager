export const handleLogin = (e: SubmitEvent) => { 
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username');  
    const password = formData.get('password');  

    console.log("username is ", username)
    console.log("password is ", password)

}