import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '../public/images/ShareSpaceLogo.png'
import { useState } from 'react';
import Aos from 'aos';



function LoginPage() {
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    

    const handleClick = () => {
        let jsonData = {}
        jsonData.email = email
        //jsonData.password = password
        console.log(JSON.stringify(jsonData))
        /*
        fetch('http://------------:8080/', {  // Enter correct address here
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(jsonData)
        })
        */
    }

    const checkPassword = (event) => {
        let tempPassword = event.target.value
        let correctLength = tempPassword.length >= 8 && tempPassword.length <= 25;
        let hasUppercase = /[A-Z]/.test(tempPassword);
        let hasNumber = /\d/.test(tempPassword);
        setPassword(tempPassword);
        setValidPassword(correctLength && hasNumber && hasUppercase)
        setPasswordError(!(correctLength && hasNumber && hasUppercase))
    }
    
    Aos.init({ duration: 1800, offset: 0});
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
                        onChange={(event) => { setEmail(event.target.value) }}
                        onKeyDown={setEmail}
                        InputLabelProps={{
                            style: { color: '#B77BF3' },
                        }}
                    />


                    <TextField error={passwordError}
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        helperText={!passwordError ? "" : "Invalid password"}
                        onChange={checkPassword}
                        InputLabelProps={{
                            style: { color: '#B77BF3' },
                        }}
                    /> 
                    <Stack maxWidth={300}>
                        <Typography style={{ fontSize: '10px' }}>Password must be between 8-25 characters</Typography>
                        <Typography style={{ fontSize: '10px' }}>Password must have 1 capital letter</Typography>
                        <Typography style={{ fontSize: '10px' }}>Password must have 1 number</Typography>
                    </Stack>

                    <Button
                        variant="contained"
                        onClick={handleClick}
                        disabled={!validPassword}
                        color="secondary"
                    >
                        Login
                    </Button>
                    <Typography style={{ textAlign: 'center' }}>Don't have an account?</Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                    >Register</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default LoginPage