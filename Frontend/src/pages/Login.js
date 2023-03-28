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

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Stack spacing={2}>
                <Typography variant="h3">
                    Login
                </Typography>
                <TextField id="email" label="Email" variant="outlined"
                    onChange={((event) => {
                        setEmail(event.target.value);
                    })} />
                <TextField id="password" label="Password" variant="outlined"
                    onChange={((event) => {
                        setPassword(event.target.value);
                    })} />
                <Button
                    variant="contained"
                    onClick={handleClick}>
                    Login
                </Button>
                <Button variant="contained">Create Account</Button>
            </Stack>
        </Box>
    )
}

export default LoginPage