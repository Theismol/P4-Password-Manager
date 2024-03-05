


export const handleSignUp = (e: SubmitEvent) => {
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email')
    const username = formData.get('username')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    if (password !== confirmPassword) {
        console.log('passwords do not match')
        return
    }
    console.log("username is ", username)
    console.log("email is ", email)

}