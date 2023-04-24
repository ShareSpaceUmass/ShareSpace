import * as React from 'react';
import { Box, Stack, Typography, Button, TextField, Alert, AlertTitle } from '@mui/material';
import logo from '../public/images/ShareSpaceLogo.png'
import { useState } from 'react';
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

    //Verifies input ends with @umass.edu
    const checkEmail = (input) => {
        setEmail(input)
        setUsedEmail(false)
        setValidEmail(input.endsWith("@umass.edu"))
    }

    //Click handler for login button. Sends email as json object to the backend using FETCH api
    const handleClick = async () => {
        const userData = await fetch('http://localhost:3000/users/getAllUsers/')
        const users = await userData.json()
        console.log(users.some(e => e.email === email))
        if (!users.some(e => e.email === email)) {
            setUsedEmail(true)
        }
        else {
            const emailJson = { email }

            const response = fetch('http://localhost:3000/users/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailJson)
            })
            response.then((res) => res.json())
                .then((data) => console.log(data))
        }
    }


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
                <Stack
                    spacing={2}
                    maxWidth="30vw"

                >
                    <Typography sx={{ typography: { md: 'h3', sm: 'body1' } }}>Welcome Back!</Typography>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        onChange={(event) => { checkEmail(event.target.value) }}
                        onKeyDown={setEmail}
                        InputLabelProps={{
                            style: { color: '#B77BF3' },
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        color="secondary"
                    //disabled={!validEmail}
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
        </Box>
    )
}

export default LoginPage