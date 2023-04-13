import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


const basicPreferences = [
    {
        key: "noise",
        type: "",
        name: "Noise Level",
        values: ["Quiet", "Some Noise", "Loud"]
    },
    {
        key: "cleanliness",
        type: "",
        name: "Cleanliness",
        values: ["Messy", "Semi-Clean", "Messy"]
    },
    {
        key: "closeness",
        type: "",
        name: "How close would you like to be with your roommate?",
        values: ["Not Close", "Acquantinces", "Friendly", "Good Friends"]
    },
    {
        key: "academics",
        type: "",
        name: "How important are academics to you?",
        values: ["Not Important", "Somewhat Important", "Very Important"]
    },
    {
        key: "inRoom",
        type: "",
        name: "How frequently will you be in your room?",
        values: ["Rarely", "Somewhat Frequently", "Frequently", "All the Time"]
    },
    {
        key: "guests",
        type: "",
        name: "How often can your roommate have guests over?",
        values: ["Never", "Sometimes", "Only on Weekends", "All of the Time"]
    },
]

const preferenceList = basicPreferences.map((preference) => {
    return (
        <Box key={preference.key}>
            <Typography variant='h6' sx={{ color: 'black' }}>{preference.name}</Typography>
            <FormControl>
                <RadioGroup row >
                    {preference.values.map((value) => {
                        return (
                            <FormControlLabel
                                key={value}
                                value={value}
                                control={
                                    <Radio style={{
                                        color: "black",
                                    }} />
                                }
                                label={value}
                            />
                        )
                    })}
                </RadioGroup>
            </FormControl>
        </Box>
    )
}
)




function PreferencePage() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            minHeight="100vh"
            padding="100px"
        >
            <Stack>
                <Typography variant="h2">Preference Selection</Typography>
                <Stack
                sx={{
                    marginTop: 2.5
                }}>
                    <Accordion>
                        <AccordionSummary
                        sx={{
                            backgroundColor: '#B77BF3'
                        }}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography>General Preferences</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {preferenceList}
                        </AccordionDetails>
                    </Accordion>
                </Stack>
            </Stack>
        </Box>
    )
}

export default PreferencePage