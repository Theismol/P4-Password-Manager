import React, { useEffect } from "react";
import { Container, TextField, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
var QRCode = require("qrcode");

export default function MFAPage() {
    const [secret, setSecret] = React.useState("");
    const [qrCode, setQrCode] = React.useState("");
    const [MFAEnabled, setMFAEnabled] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const [csrftoken, setCsrftoken] = React.useState("");
    useEffect(() => {
        (async function () {
            try {
                axios
                    .get("http://localhost:4000/api/auth/checkMFA", {
                        withCredentials: true,
                    })
                    .then(async (response) => {
                        setCsrftoken(response.data.csrftoken);
                        if (response.data.mfa === false) {
                            setSecret(response.data.secret.base32);
                            try {
                                const qrCodeURL = await generateQRCode(
                                    response.data.secret.otpauth_url
                                );
                                setQrCode(qrCodeURL);
                                setIsLoading(false);
                            } catch (err) {
                                console.error(err);
                            }
                            setMFAEnabled(false);
                        } else {
                            setMFAEnabled(true);
                            setIsLoading(false);
                        }
                    })
                    .catch(async (error) => {
                        setAlertMessage(error.response.data.message);
                        setOpen(true);
                    });
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);
    const handleClose = () => {
        setOpen(false);
        if (alertMessage !== "Token is invalid") {
            window.location.href = "/login";
        }
    };
    const handleCreateTOTP = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios
            .post(
                "http://localhost:4000/api/auth/verifyTOTPFirstTime",
                {
                    totp: data.get("TOTP"),
                    secret: secret,
                    csrftoken: csrftoken,
                },
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                window.location.href = "/PasswordBank";
            })
            .catch((error) => {
                setAlertMessage(error.response.data.message);
                setOpen(true);
            });

        return;
    };
    const handleVerifyTOTP = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios
            .post(
                "http://localhost:4000/api/auth/verifyTOTP",
                {
                    totp: data.get("TOTP"),
                    csrftoken: csrftoken,
                },
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                window.location.href = "/PasswordBank";
            })
            .catch((error) => {
                console.log(error);
                setAlertMessage(error.response.data.message);
                setOpen(true);
            });
        return;
    };
    const generateQRCode = (url) => {
        return new Promise((resolve, reject) => {
            QRCode.toDataURL(url)
                .then((dataURL) => {
                    resolve(dataURL);
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                });
        });
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!MFAEnabled) {
        return (
            <Container
                component="main"
                sx={{
                    display: "flex",
                    justifyContent: "center", // Horizontally center the content
                    alignItems: "center", // Vertically center the content
                    minHeight: "100vh", // Ensure the container covers the full viewport height
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
                        <Alert severity="error" variant="filled">
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                ) : null}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "auto",
                        gap: 1,
                    }}
                >
                    <Typography component="h1" variant="h4">
                        Scan the QR code below with your authenticator app or
                        enter the secret
                    </Typography>
                    <Typography component="h1" variant="h5">
                        {secret}
                    </Typography>
                    <Box component="img" alt="TOTP QR Code" src={qrCode} />
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleCreateTOTP}
                        sx={{ mt: 3 }}
                    >
                        <TextField
                            name="TOTP"
                            required
                            fullWidth
                            id="TOTP"
                            label="Enter your code here"
                            autoFocus
                        ></TextField>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Verify
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    } else {
        return (
            <Container
                component="main"
                sx={{
                    display: "flex",
                    justifyContent: "center", // Horizontally center the content
                    alignItems: "center", // Vertically center the content
                    minHeight: "100vh", // Ensure the container covers the full viewport height
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
                        <Alert severity="error" variant="filled">
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                ) : null}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "auto",
                        gap: 1,
                    }}
                >
                    <Typography component="h1" variant="h4">
                        Enter the code from your authenticator app
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleVerifyTOTP}
                        sx={{ mt: 3 }}
                    >
                        <TextField
                            name="TOTP"
                            required
                            fullWidth
                            id="TOTP"
                            label="Enter your code here"
                            autoFocus
                        ></TextField>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Verify
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }
}
