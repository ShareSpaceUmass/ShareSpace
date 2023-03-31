import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/ListItem';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import logo from '../public/images/ShareSpaceLogo.png';
import { useState } from 'react';
import Aos from 'aos';

function SignupPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [birth, setBirth] = useState('')
    const [emailError, setEmailError] = useState(false)


    const years = Array.from(
      { 23: (35-13)/ 1 + 1},
      (value, index) => 13 + index * 1
      );
    
    console.log(years);

    const birthYears = years.forEach(yr => {
      return ( 
        <>
        <MenuItem value={yr}>yr</MenuItem>
        </>
      );
    });
      

    const checkEmail = (event) => {
      let email = event.target.value;
      let validEmail = email.length >= 10 && (email.substring(email.length-10) === "@umass.edu");
      setEmailError(!validEmail)
    }

    Aos.init({ duration: 1800, offset: 0});
    return (
    <Box
    data-aos="fade-up"
    >
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        >
            <Stack
            justifyContent="center"
            alignItems="center"
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
                <Typography sx={{ typography: { md: 'h3', sm: 'body1' } }}>Ready to Find a Roommate?</Typography>
            </Stack>
        </Box>
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        >
            <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            marginLeft={30}
            marginRight={30}
            spacing={6}
            marginTop={5}
            >
                <Grid item xs={3} md={6}>
                    <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    onChange={(event) => { setName(event.target.value) }}
                    onKeyDown={setName}
                    InputLabelProps={{
                    style: { color: '#B77BF3' },
                    }}
                    sx={{
                      width:400,
                      maxHeight: { xs: 100, md: 200 },
                      maxWidth: { xs: 250, md: 491 },
                    }}
                    />
                </Grid>
                <Grid item xs={3} md={6}>
                    <TextField error={emailError}
                    id="email"
                    label="Email"
                    variant="outlined"
                    onChange={checkEmail}
                    helperText={!emailError ? "" : "Email must end in @umass.edu"}
                    InputLabelProps={{
                    style: { color: '#B77BF3' },
                    }}
                    sx={{
                      width:400,
                      maxHeight: { xs: 100, md: 200 },
                      maxWidth: { xs: 250, md: 491 },
                    }}
                    />
                </Grid>
                <Grid item xs={3} md={6}>
                    <FormControl
                    sx={{
                        width:400,
                        maxHeight: { xs: 100, md: 200 },
                        maxWidth: { xs: 250, md: 491 },
                    }}>
                    <InputLabel id="gender" 
                    sx={{
                      color: '#B77BF3',
                    }}
                    >
                    Gender
                    </InputLabel>
                    <Select
                    labelId="Gender"
                    id="gender"
                    value={gender}
                    label="Gender Year"
                    onChange={setGender}
                    >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"non-binary"}>Non-Binary</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} md={6}>
                    <FormControl
                    sx={{
                    width:400,
                    maxHeight: { xs: 100, md: 200 },
                    maxWidth: { xs: 250, md: 491 },
                    }}>
                    <InputLabel id="age" 
                    sx={{
                      color: '#B77BF3',
                    }}
                    >
                    Age
                    </InputLabel>
                    <Select
                    labelId="age"
                    id="age"
                    label="age"
                    >
                    {birthYears}
                    </Select>
                    </FormControl>
                </Grid>
            </Grid>    
        </Box>
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={5}
        >
            <Stack
            spacing={2}
            >
                <Button
                variant="contained"
                //onClick={handleClick}
                //disabled={!validPassword}
                color="secondary"
                sx={{
                  width:250,
                }}
                >
                Register
                </Button>
                <Typography style={{ textAlign: 'center' }}>Already have an account?</Typography>
                <Button
                variant="contained"
                color="secondary"
                href="/login"
                >Login
                </Button> 
            </Stack>
        </Box> 
    </Box>
  )
}

export default SignupPage