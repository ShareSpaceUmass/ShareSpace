import { Box, Typography } from "@mui/material"

function InChat({ message }) {
    return (
        <Box width="100%">
            <Box maxWidth="60%" borderRadius="10px" sx={{backgroundColor:"#D7D3D2", margin:"5px"}}>
                <Typography sx={{margin:"5px"}} >{message}</Typography>
            </Box>
        </Box>
    )
}

function OutChat({ message }) {
    return (
        <Box display="flex" justifyContent="flex-end" width="100%">
            <Box maxWidth="60%" borderRadius="10px" sx={{backgroundColor:"#f4d9ff", margin:"5px"}}>
                <Typography sx={{margin:"5px"}}> {message} </Typography>
            </Box>
        </Box>
    )
}

export { InChat, OutChat }