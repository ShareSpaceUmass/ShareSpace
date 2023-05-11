import * as React from 'react';
import {Box, Stack, Stepper, Step, StepLabel, Button, Typography, Card, CardActions, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, FormGroup} from '@mui/material';
import { useState } from 'react';
import Lottie from "lottie-react";
import noiseAnimation  from "../assets/quiz-animations/noise"
import cleanAnimation  from "../assets/quiz-animations/cleanliness"
import closenessAnimation  from "../assets/quiz-animations/closeness"
import academicsAnimation  from "../assets/quiz-animations/academics"
import inRoomAnimation from "../assets/quiz-animations/inRoom"
import guestsAnimation from "../assets/quiz-animations/guests"
import roomGuestsAnimation from "../assets/quiz-animations/roommateGuests"
import Aos from 'aos';
import basicPreferences from "../assets/preferenceList";

const steps = ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5', 'Question 6', 'Question 7'];
//list of animations to be transitioned through during the quiz
const animations = [
  {
    width: 405,
    anim: noiseAnimation
  },
  {
    width: 405,
    anim: cleanAnimation
  },
  {
    width: 405,
    anim: closenessAnimation
  },
  {
    width: 405,
    anim: academicsAnimation
  },
  {
    width: 608,
    anim: inRoomAnimation
  },
  {
    width: 720,
    anim: guestsAnimation
  },
  {
    width: 405,
    anim: roomGuestsAnimation
  }
]

export default function QuizStepper() {
  //stores preferences for each question (question 1 answer = index 0)
  const [noise, setNoise] = useState("");
  const [cleanliness, setClean] = useState("");
  const [closeness, setCloseness] = useState("");
  const [academics, setAcademics] = useState("");
  const [inRoom, setinRoom] = useState("");
  const [guests, setGuests] = useState("");
  const [roomGuests, setRoomGuests] = useState("");
  const preferences = [
    {selection: noise, change: setNoise},
    {selection: cleanliness, change: setClean},
    {selection: closeness, change: setCloseness},
    {selection: academics, change: setAcademics},
    {selection: inRoom, change: setinRoom},
    {selection: guests, change: setGuests},
    {selection: roomGuests, change: setRoomGuests},
  ];
  //tracks which question the user is on 
  const [activeStep, setActiveStep] = useState(0);

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

  const handleSubmit = () => {
    //submit preferences to backend
  }

  return (
    <Stack
    justifyContent="center"
    alignItems="center"
    marginTop = {7.5}
    sx={{maxWidth: {md: 900},
    }}
    >
      <Box 
      sx={{
      width: animations[activeStep].width,
      }}
      marginBottom = {4}
      >
        <div><Lottie animationData={animations[activeStep].anim} loop={true}/></div>
      </Box>    
      <Box sx={{ width: '100%' }}>
        <Card
        justifyContent="center"
        sx={{backgroundColor: "transparent"}}
        >
          {quizCards[activeStep]}
        </Card>
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
        </Stack>
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
            href="/profile"
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