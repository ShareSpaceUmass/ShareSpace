import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';



const prefrences = [
    {
        key: "noise",
        type: "",
        name: "Noise Level",
        values: ["Quiet", "Loud"]
    },
    {
        key: "cleanliness",
        type: "",
        name: "Cleanliness",
        values: ["Clean", "Messy", "Semi-clean"]
    }
]

const prefrenceList = prefrences.map((prefrence) => {
    return (
        <Box key={prefrence.key}>
            <Typography variant='h6' sx={{ color: 'white' }}>{prefrence.name}</Typography>
            <FormControl>
                <RadioGroup row >
                    {prefrence.values.map((value) => {
                        return (
                            <FormControlLabel
                                key={value}
                                value={value}
                                control={
                                    <Radio style={{
                                        color: "white",
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




function PrefrencePage() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            minHeight="100vh"
            padding="100px"
        >
            <Stack>
                <Typography variant="h2">Prefrence Selection</Typography>
                <Stack>
                    {prefrenceList}
                </Stack>
            </Stack>
        </Box>
    )
}

export default PrefrencePage