import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import hashPassword from "../../services/passwordHash";

export default function LoginForExtension() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const hashedPassword = hashPassword(data.get("password"));
        hashedPassword.then((result) => {
            axios.post("http://localhost:4000/api/auth/login", {
                username: data.get("username"),
                password: result,
            }, {
                withCredentials: true,
            }).then((response) => {
                window.location.href = "/mfa";
            }).catch((error) => {
                console.log(error);
            });
        })
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


