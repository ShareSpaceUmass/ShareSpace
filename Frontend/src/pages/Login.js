import * as React from 'react';
import { Box, Stack, Typography, Button, TextField, Alert, AlertTitle, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import logo from '../public/images/ShareSpaceLogo.png'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSignIn } from 'react-auth-kit'

import Aos from 'aos';

function emailError(error) {
    if (error) {
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This email is not registered — <strong>Double check your email!</strong>
            </Alert>
        )
    }
    else {
        return (
            <Box></Box>
        )
    }
}


function LoginPage() {
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [usedEmail, setUsedEmail] = useState(false)
    const [open, setOpen] = useState(false)
    const signIn = useSignIn()

    //Verifies input ends with @umass.edu
    const checkEmail = (input) => {
        setEmail(input)
        setUsedEmail(false)
        setValidEmail(!input.endsWith("@umass.edu"))
    }

    //Click handler for login button. Sends email as json object to the backend using FETCH api
    const handleClick = async () => {
        const emailJson = { email }

        //Checks if email is a registered email
        /*
        const response = fetch(process.env.REACT_APP_SERVER_URL + "/users/getUser/", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: simpleStringify(emailJson)
        })
        response.then((res) => {
            if (res.status === 500) {
                setUsedEmail(true)
            } else {
                console.log("Email is registered")
                setOpen(true)
            }
        })
        */

        //if (usedEmail === false) {
            const sendEmail = fetch(process.env.REACT_APP_SERVER_URL + "/users/login/", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: simpleStringify(emailJson)
            })
            sendEmail.then((res) => {
                if (res.status === 200) {
                    if (signIn(
                        {
                            token: "1234556",
                            expiresIn: "24",
                            tokenType: "Bearer",
                        }
                    )) {
                        window.location.href = "/profile"
                    } else {
                        setUsedEmail(true)
                    }
                }
            })
        //}
    }

    const handleClose = () => {
        setOpen(false);
    };

    Aos.init({ duration: 1800, offset: 0 });
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            data-aos="fade-up"
        >
            <Stack
                justifyContent="center"
                alignItems="center"
                marginTop={-10}
            >
                <Link to="/">
                    <Box
                        component="img"
                        sx={{
                            height: 500,
                            width: 700,
                            maxHeight: { xs: 100, md: 200 },
                            maxWidth: { xs: 250, md: 491 },
                        }}
                        alt="ShareSpaceLogo"
                        src={logo}
                    />
                </Link>
                <Stack
                    spacing={2}
                    maxWidth="30vw"

                >
                    <TextField
                        error={validEmail}
                        id="email"
                        label="Email"
                        variant="outlined"
                        onChange={(event) => { checkEmail(event.target.value) }}
                        helperText={!validEmail ? "" : "Email must end in @umass.edu"}
                        InputLabelProps={{
                            style: { color: '#B77BF3' },
                        }}
                        onKeyDown={setEmail}
                    />
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        color="secondary"
                        disabled={validEmail}
                    >
                        Login
                    </Button>
                    {emailError(usedEmail)}
                    <Typography style={{ textAlign: 'center' }}>Don't have an account?</Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        href="/signup"
                    >Register</Button>
                </Stack>
            </Stack>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {"In order to complete your sign in, we just need you to verify your email address."}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        We've sent a verification email to the email address you provided. Please check your inbox (and spam folder, just in case) and click on the verification link to confirm your email address.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

function simpleStringify (object){
    // stringify an object, avoiding circular structures
    // https://stackoverflow.com/a/31557814
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};


export default LoginPage