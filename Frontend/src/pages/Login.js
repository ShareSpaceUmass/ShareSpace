import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';



function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    const handleClick = () => {
        let jsonData = {}
        jsonData.email = email
        jsonData.password = password

        fetch('http://------------:8080/', {  // Enter correct address here
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(jsonData)
        })
    }

    const checkPassword = (event) => {
        setPassword(event.target.value);
        let correctLength = password.length >= 8 && password.length <= 25;
        let hasUppercase = /[A-Z]/.test(password);
        let hasNumber = /\d/.test(password);
        setValidPassword(correctLength && hasNumber && hasUppercase)
        setPasswordError(!validPassword)
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
                <Stack
                    spacing={2}
                    minWidth="30vh"
                >
                    <Typography variant='h2'>Welcome Back!</Typography>
                    <TextField id="email" label="Email" variant="outlined"
                        onChange={((event) => {
                            setEmail(event.target.value);
                        })} />
                    <TextField error={passwordError}
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        helperText={!passwordError ? "" : "Invalid password"}
                        onChange={checkPassword} />
                    <Stack maxWidth={300}>
                        <Typography style={{ fontSize: '10px' }}>Password must be between 8-25 characters</Typography>
                        <Typography style={{ fontSize: '10px' }}>Password must have 1 capital letter</Typography>
                        <Typography style={{ fontSize: '10px' }}>Password must have 1 number</Typography>
                    </Stack>
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={!validPassword}
                    >
                        Login
                    </Button>
                    <Typography style={{ textAlign: 'center' }}>Don't have an account?</Typography>
                    <Button variant="contained">Register</Button>
                </Stack>
        </Box>
    )
}

export default LoginPage