import React from 'react'
import Box from '@mui/material/Box';
import Aos from 'aos';
import QuizStepper from "../components/QuizStepper"

//Quiz for selecting preferences when you first signup
function QuizPage() {
    Aos.init({ duration: 1800, offset: 0, easing: 100 });
    return ( 
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        data-aos="fade-up"
        sx={{maxWdith: {md: 400}}}
        >   
        <QuizStepper/>
        </Box>
    );
}

export default QuizPage