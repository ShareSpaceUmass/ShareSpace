import * as React from 'react';
import { InputLabel, MenuItem, FormControl, Box, Stack, Typography, Button, TextField, Grid, Select, Alert, AlertTitle } from '@mui/material';
import logo from '../public/images/ShareSpaceLogo.png';
import { useState } from 'react';
import Aos from 'aos';

function SignupPage() {
  const [fName, setFirstName] = useState('')
  const [lName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [usedEmail, setUsedEmail] = useState(false)

  function emailError(error) {
    if (error) {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This email is already registered — <strong>Please try a new email or login!</strong>
        </Alert>
      )
    }
    else {
      return (
        <Box></Box>
      )
    }
  }

  const checkEmail = async (input) => {
    setEmail(input)
    setUsedEmail(false)
    setValidEmail(!input.endsWith("@umass.edu"))
  }


  const missingInfo = () => {
    return (fName === '') || (lName === '') || (email === '') || (gender === '')
  }

  const register = async() => {
    const user = { fName, lName, email, gender }
    const userData = await fetch(process.env.REACT_APP_SERVER_URL+"/users/getAllUsers/")
    const users = await userData.json()
    if (users.some(e => e.email === email)) {
      setUsedEmail(true)
    }
    else {
      const response = fetch(process.env.REACT_APP_SERVER_URL+"/users/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      response.then((res) => res.json())
        .then((data) => console.log(data))
      window.location.href = "/preferences"
    }
  }

  Aos.init({ duration: 1800, offset: 0 });
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
          spacing={{ xs: 3, md: 6 }}
          marginTop={{ xs: 0, md: 0 }}
          sx={{
            maxHeight: { xs: 900, md: 200 },
            maxWidth: { xs: 324, md: 895 },
          }}
        >
          <Grid item xs={12} md={6}>
            <TextField
              id="fName"
              label="First Name"
              variant="outlined"
              onChange={(event) => setFirstName(event.target.value)}
              InputLabelProps={{
                style: { color: '#B77BF3' },
              }}
              sx={{
                width: 400,
                maxHeight: { xs: 200, md: 200 },
                maxWidth: { xs: 300, md: 400 },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="lName"
              label="Last Name"
              variant="outlined"
              onChange={(event) => setLastName(event.target.value)}
              InputLabelProps={{
                style: { color: '#B77BF3' },
              }}
              sx={{
                width: 400,
                maxHeight: { xs: 200, md: 200 },
                maxWidth: { xs: 300, md: 400 },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField error={validEmail}
              id="email"
              label="Email"
              variant="outlined"
              onChange={
                (event) => {
                  checkEmail(event.target.value)
                }
              }
              helperText={!validEmail ? "" : "Email must end in @umass.edu"}
              InputLabelProps={{
                style: { color: '#B77BF3' },
              }}
              sx={{
                width: 400,
                maxHeight: { xs: 200, md: 200 },
                maxWidth: { xs: 300, md: 400 },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl
              sx={{
                width: 400,
                maxHeight: { xs: 200, md: 200 },
                maxWidth: { xs: 300, md: 400 },
              }}>
              <InputLabel selected id="gender"
                sx={{
                  color: '#B77BF3',
                }}
              >
                Gender
              </InputLabel>
              <Select
                id="gender"
                value={gender}
                label="Gender"
                onChange={(event) => setGender(event.target.value)}
              >
                <MenuItem
                  value={"male"}
                >
                  Male
                </MenuItem>
                <MenuItem
                  value={"female"}
                >
                  Female
                </MenuItem>
                <MenuItem
                  value={"non-binary"}
                >
                  Non-Binary
                </MenuItem>
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
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            disabled={missingInfo() || validEmail}
            onClick={register}
            color="secondary"
            sx={{
              width: 250,
            }}
          >
            Register
          </Button>
          {emailError(usedEmail)}
          <Typography style={{ textAlign: 'center' }}>Already have an account?</Typography>
          <Button
            variant="contained"
            color="secondary"
            href="/login"
            sx={{width:250}}
          >Login
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default SignupPage