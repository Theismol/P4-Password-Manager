import axios from "axios";

export default function CsrfToken() {
    return axios.get("http://localhost:4000/api/auth/getCSRF", {
        withCredentials: true,
    }).then((response) => {
        return response.data.csrftoken;
    }).catch((error) => {
        throw new Error("Failed to fetch CSRF token");
    });
}

