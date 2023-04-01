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
    

    const handleClick = () => {
        const emailJson = {email}

        const response = fetch('http://localhost:3000/login', {  
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
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        color="secondary"
                    >
                        Login
                    </Button>
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