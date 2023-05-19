import * as React from 'react';
import {Box, Grid, Stack, Stepper, Step, StepLabel, Button, Typography, Card, CardActions, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, FormGroup} from '@mui/material';
import { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import noiseAnimation  from "../assets/quiz-animations/noise"
import cleanAnimation  from "../assets/quiz-animations/cleanliness"
import closenessAnimation  from "../assets/quiz-animations/closeness"
import academicsAnimation  from "../assets/quiz-animations/academics"
import inRoomAnimation from "../assets/quiz-animations/inRoom"
import guestsAnimation from "../assets/quiz-animations/guests"
import earlyBirdAnimation from "../assets/quiz-animations/earlyBird"
import Aos from 'aos';
import basicPreferences from "../assets/preferenceList";

const steps = ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5', 'Question 6', 'Question 7'];
//list of animations to be transitioned through during the quiz
const animations = [
  {
    smWidth: 322,
    medWidth: 405,
    anim: noiseAnimation
  },
  {
    smWidth: 280,
    medWidth: 405,
    anim: cleanAnimation
  },
  {
    smWidth: 248,
    medWidth: 405,
    anim: closenessAnimation
  },
  {
    smWidth: 280,
    medWidth: 405,
    anim: academicsAnimation
  },
  {
    smWidth: 420,
    medWidth: 608,
    anim: inRoomAnimation
  },
  {
    smWidth: 280,
    medWidth: 405,
    anim: earlyBirdAnimation
  },
  {
    smWidth: 498,
    medWidth: 720,
    anim: guestsAnimation
  }
]

function QuizStepper() {
  //stores preferences for each question (question 1 answer = index 0)
  const [noise, setNoise] = useState("");
  const [cleanliness, setClean] = useState("");
  const [closeness, setCloseness] = useState("");
  const [academics, setAcademics] = useState("");
  const [timeInRoom, setTimeInRoom] = useState("");
  const [earlyBird, setEarlyBird] = useState("");
  const [guests, setGuests] = useState("");
  const preferences = [
    {selection: noise, change: setNoise},
    {selection: cleanliness, change: setClean},
    {selection: closeness, change: setCloseness},
    {selection: academics, change: setAcademics},
    {selection: timeInRoom, change: setTimeInRoom},
    {selection: earlyBird, change: setEarlyBird},
    {selection: guests, change: setGuests},
  ];
  //tracks which question the user is on 
  const [activeStep, setActiveStep] = useState(0);

  //assign user's previous answers (if the exist) to the current answers
  const existingPreferences = () => {
    const emailJson = null;
    const user = null;
    const response = fetch(process.env.REACT_APP_SERVER_URL + "/users/getUser/", {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      },
      body: simpleStringify(emailJson)
    });
    response.then((res) => {
      if (res.status === 500) {
        console.log("User not found!");
      } else {
          console.log("User found!");
          user = res;
      }
    })

    preferences.forEach = pref => {
      pref.change(user.pref.selection);
    }
  }

  const quizCards = basicPreferences.map((preference) => {
    return (
        <React.Fragment>
            <CardActions>
                <FormControl>
                    <Typography variant='h6' sx={{ color: 'black' }}>{preference.name}</Typography>
                    <RadioGroup row
                    value={preferences[activeStep].selection}
                    >
                        {preference.values.map((value,index) => {
                            return (
                                <FormControlLabel
                                key={value}
                                value={value}
                                control={
                                    <Radio style={{
                                        color: "black",
                                    }}
                                    onClick={(event) => {
                                      preferences[activeStep].change(event.target.value);
                                      if (activeStep !== steps.length-1) {
                                        handleNext();
                                      }
                                    }
                                    } 
                                    />
                                }
                                label={value}
                                />
                            )
                          })}
                    </RadioGroup>
                </FormControl>
            </CardActions>
        </React.Fragment>
    );
  });

  //single step through quiz when next button is clicked
  const handleNext = () => {
    setActiveStep((prevActiveStep) => 
    { 
      return prevActiveStep + 1;
    });
  };
  
  //single step back through quiz when back button is clicked
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //sends user's quiz answers to backend
  const handleSubmit = async () => {
    const preferencesJson = { noise, cleanliness, closeness, academics, timeInRoom, earlyBird, guests }

    const response = fetch(process.env.REACT_APP_SERVER_URL + "/users/updateUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: simpleStringify(preferencesJson)
    })
    response.then((res) => {
      if (res.status === 500) {
        //if user can't be found user will be send back to login screen
        //window.location.href = "/login"

        //send user to profile since user route is unfinished (demo purposes)
        window.location.href = "/profile"
      }
      else {
        //user is sent to their profile once their answers are received by the backend
        window.location.href = "/profile"
      }
    })
  }


  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension(){
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
  }

  //screenSize is updated when the window is resized
  useEffect(() => {
      const updateDimension = () => {
          setScreenSize(getCurrentDimension())
      }
      window.addEventListener('resize', updateDimension);
  
  
      return(() => {
          window.removeEventListener('resize', updateDimension);
      })
  }, [screenSize]);

  //set current answers to existing preferences
  existingPreferences();
  return (
    <Stack
    justifyContent="center"
    alignItems="center"
    marginTop = {7.5}
    sx={{maxWidth: {xs: 225, md: 900},
    }}
    >
      <Box 
      sx={{
      width: {xs: animations[activeStep].smWidth, md: animations[activeStep].medWidth}
      }}
      marginBottom = {4}
      >
        <div><Lottie animationData={animations[activeStep].anim} loop={true}/></div>
      </Box>    
      <Box sx={{ width: "100%"}}>
        <Card
        sx={{backgroundColor: "transparent"}}
        >
          <Box
          justifyContent="center"
          >
          {quizCards[activeStep]}
          </Box>
        </Card>
        {screenSize.width >= 900 ?
        <Stack
        marginTop ={2.5}
        marginBottom = {-0.5}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    {...labelProps}>{label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Stack> : <></>
        }
        <React.Fragment>
          <Box 
          sx={{ display: 'flex', flexDirection: 'row', pt: 2,}}
          justifyContent="center"
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
              width: {md:200},
              color: 'black', 
              mr: {md: 2}  
              }}
            >
              Back
            </Button>
            {activeStep !== steps.length - 1 ?
            <Button onClick={handleNext}
            disabled={preferences[activeStep].selection === ""}
            sx={{
            color: 'black',
            width: {md:200},
            ml: {md: 2}
            }}
            >
              Next
            </Button> :
            <Button onClick={handleSubmit}
            disabled={preferences[activeStep].selection === ""}
            sx={{
              width: {md:200},
              ml: {md: 2}
            }}
            >
              Submit
            </Button>
            }
          </Box>
        </React.Fragment>
      </Box>
    </Stack>
  );
}

function simpleStringify(object) {
  // stringify an object, avoiding circular structures
  // https://stackoverflow.com/a/31557814
  var simpleObject = {};
  for (var prop in object) {
      if (!object.hasOwnProperty(prop)) {
          continue;
      }
      if (typeof (object[prop]) == 'object') {
          continue;
      }
      if (typeof (object[prop]) == 'function') {
          continue;
      }
      simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
};

export default QuizStepper