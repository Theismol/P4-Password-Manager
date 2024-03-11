import axios from "axios";

export const handleLogin = (e: SubmitEvent) => { 
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    console.log("username is ", username)
    console.log("password is ", password)
    fetchData(username, password);

}

const fetchData = async (username: string, password: string) => {
    try {
        const response = await axios.post(
            'http://localhost:4000/login',
            {
                username: username,
                password: password
            }
        , {headers: {'Content-Type': 'application/json'}});

        console.log(response);
        } catch (error) {
        console.error('Error fetching data:', error);
    }
}
