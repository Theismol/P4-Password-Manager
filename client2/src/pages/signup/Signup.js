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
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { z } from "zod";
import { createKeys } from "../../services/NaclEncryption";
var AES = require("crypto-js/aes");

export default function SignUp() {
    const [error, setError] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const signupSchema = z
        .object({
            email: z.string().email(),
            username: z.string(),
            password: z.string().min(10),
            confirmPassword: z.string().min(10),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match",
        });
    const handleSubmit = async (event) => {
        event.preventDefault();
        const keys = createKeys();
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let validatedForm;
        try {
            validatedForm = signupSchema.parse({
                email: data.get("email"),
                username: data.get("username"),
                password: data.get("password"),
                confirmPassword: data.get("confirmPassword"),
            });
        } catch (error) {
            setAlertMessage(error.issues[0].message);
            setOpen(true);
            setError(true);
            return;
        }
        const password = await hashPassword(validatedForm.password, 1000);
        const passwordToSend = await hashPassword(password, 1)
        const encryptedPrivateKey = AES.encrypt(
            keys.private,
            password
        ).toString();
        axios.post("https://api.accessarmor.server/api/signup", {
                email: validatedForm.email,
                username: validatedForm.username,
                password: passwordToSend,
                publicKey: keys.public,
                privateKey: encryptedPrivateKey,
            })
            .then((response) => {
                setAlertMessage(response.data.message);
                setError(false);
                setOpen(true);
            })
            .catch((error) => {
                setAlertMessage(error.response.data.message);
                setError(true);
                setOpen(true);
            });
    };
    const handleClose = () => {
        setOpen(false);
        if (!error) {
            window.location.href = "/login";
        }
    };

    return (
        <Container
            component="main"
            sx={{
                display: "flex",
            }}
            maxWidth="xl"
        >
            {open ? (
                <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert
                        severity={error ? "error" : "success"}
                        variant="filled"
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar>
            ) : null}
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
