import { Grid, Container, Box, Stack, Typography, IconButton, TextField, Divider } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import Aos from "aos";

const borderStyles = {
    borderRadius: '10px',
    border: 1,
    borderColor: 'primary.main',
    m: 1,
    borderWidth: '5px',
    padding: '16px'
};

function ChatPage() {
    Aos.init({ duration: 1000, offset: 0 });
    return (
        <Box minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Container maxWidth="md">
                <Grid container spacing={1}>
                    <Grid md={3} data-aos="fade-up">
                        <Stack minHeight="75vh" sx={borderStyles}>
                            <Typography>Test</Typography>
                        </Stack>
                    </Grid>
                    <Grid md={9} data-aos="fade-down">
                        <Box minHeight="75vh" maxHeight="75vh" sx={borderStyles} display= "flex"
      alignItems= "end" >
                            <Box></Box>
                            <Grid container>
                                <Grid md={11}>
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        variant="outlined"
                                        multiline
                                    />
                                </Grid>
                                <Grid md={1}>
                                    <IconButton sx={{margin:"10px"}}>
                                        <SendIcon></SendIcon>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default ChatPage