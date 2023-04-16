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
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button';


const basicPreferences = [
    {
        key: "noise",
        name: "Noise Level",
        values: ["Quiet", "Some Noise", "Loud"],
        chosen: ""
    },
    {
        key: "cleanliness",
        name: "Cleanliness",
        values: ["Messy", "Somewhat Organized", "Organized", "Spotless"],
        chosen: ""
    },
    {
        key: "closeness",
        name: "How close would you like to be with your roommate?",
        values: ["Not Close", "Acquaintances", "Friendly", "Good Friends"],
        chosen: ""
    },
    {
        key: "academics",
        name: "How important are academics to you?",
        values: ["Not Important", "Somewhat Important", "Very Important"],
        chosen: ""
    },
    {
        key: "inRoom",
        name: "How frequently will you be in your room?",
        values: ["Rarely", "Somewhat Frequently", "Frequently", "All the Time"],
        chosen: ""
    },
    {
        key: "guests",
        name: "How often can your roommate have guests over?",
        values: ["Never", "Once in a While", "Only on Weekends", "All the Time"],
        chosen: ""
    },
]

const interests = [
    {
        key: "sports",
        name: "What sports do you like?",
        values: ["Basketball", "Football", "Soccer", "Rugby", "Hockey", "Baseball", "Cross Country", "Track/Field", "Lacrosse",
        "Field Hockey", "Swimming", "Golf", "Ultimate Frisbee", "Climbing", "Cheer", "Gymnastics"],
        chosen: []
    },
    {
        key: "hobbies",
        name: "What hobbies do you like?",
        values: ["Music", "Reading", "Drawing", "Lifting", "Gardening", "Knitting", "Pottery", "Biking", "Hiking"],
        chosen: []
    }
]

const preferenceList = basicPreferences.map((preference) => {
    return (
        <Box key={preference.key}>
            <Typography variant='h6' sx={{ color: 'black' }}>{preference.name}</Typography>
            <FormControl>
                <RadioGroup row
                >
                    {preference.values.map((value) => {
                        return (
                            <FormControlLabel
                                key={value}
                                value={value}
                                control={
                                    <Radio style={{
                                        color: "black",
                                    }}
                                    onClick={(event) => { preference.chosen = event.target.value }
                                    } 
                                    />
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

const interestList = interests.map((interest) => { 
    return (
        <Box 
        key={interest.key}
        sx={{maxWidth: 650
        }}
        >
            <Typography variant='h6' sx={{ color: 'black' }}>{interest.name}</Typography>
            <FormGroup row>
                {interest.values.map((value) => {
                    return (
                        <FormControlLabel
                        key={value}
                        value={value}
                        control={<Checkbox
                        />}
                        label={value}
                        onChange={(event) => {
                            if (event.target.checked) {
                                interest.chosen.push(event.target.value);
                            }
                            else {
                                let i = interest.chosen.indexOf(event.target.value);
                                interest.chosen.splice(i, 1)
                            }
                        }}
                        />
                    )
                })}
            </FormGroup>
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
                }}
                >
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
                <Stack
                sx={{
                    marginTop: 2.5
                }}
                >
                    <Accordion>
                        <AccordionSummary
                        sx={{
                            backgroundColor: '#B77BF3'
                        }}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography>Interests</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {interestList}
                        </AccordionDetails>
                    </Accordion>
                </Stack>
                <Stack
                sx={{
                    marginTop: 2.5
                }}
                justifyContent="center"
                alignItems="center"
                >
                    <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                    width:250
                    }}
                    onClick={() => {
                        basicPreferences.forEach(p => console.log(p.chosen));
                        console.log(interests[0].chosen);
                        console.log(interests[1].chosen);
                    }}
                    >
                    Submit
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default PreferencePage