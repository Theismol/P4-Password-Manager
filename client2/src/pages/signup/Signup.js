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

export default function SignUp() {
    const [error, setError] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = hashPassword(data.get("password"));

        axios.post('http://localhost:4000/api/signup', {
            email: data.get("email"),
            username: data.get("username"),
            password: hashPassword(data.get("password")),
        }).then((response) => {
            setMessage = response.data.message;
            setError(false);
        }).catch((error) => {
            setMessage = error.response.data.message;
            setError(true);
        });
    };

    return (
        <Container component="main" sx={{
            display: "flex",
        
        }} maxWidth="xl">
            <Box
                component="img"
                sx={{
                    height: 2/4,
                    width: 2/4,
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
                }}
            >
                <Typography component="h1" variant="h4">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
