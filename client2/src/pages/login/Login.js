import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../../assets/images/logo.png";
import hashPassword from "../../services/passwordHash";
import axios from "axios";

export default function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get("username"),
            password: data.get("password"),
        });
        const hashedPassword = hashPassword(data.get("password"));
        console.log("Hashed password: ", hashedPassword);
        
        axios
            .post("http://localhost:5000/login", {
                username: data.get("username"),
                password: hashedPassword,
            })
            .then((response) => {
                console.log("Response: ", response);
            })
            .catch((error) => {
                console.error("Error: ", error);
                this.setState({
                    errorText: "An error occurred"
                  })
            });


    };



    return (
        <Container component="main" sx={{
            display: "flex",
        }} maxWidth="xl">
            <Box
                component="img"
                sx={{
                    height: 2 / 4,
                    width: 2 / 4,
                }}
                alt="AccessArmor Logo"
                src={logo}
            />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "auto",
                }}
            >
                <Typography component="h1" variant="h4">
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
