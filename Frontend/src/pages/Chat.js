import { Grid, Container, Box, Stack, Typography, IconButton, TextField, Divider, Paper } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import Header from "../components/Header";
import Aos from "aos";



function ChatPage() {
    Aos.init({ duration: 1000, offset: 0 });
    return (
        <Stack>
            <Header />
            <Box
                minHeight="80vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Container maxWidth="md">
                    <Grid container spacing={1}>
                        <Grid md={3} data-aos="fade-up">
                            <Stack
                                height="74.5vh"
                                sx={{
                                    padding: '16px',
                                    boxShadow: 3,
                                    borderRadius: "4px",
                                    backgroundColor: "#FFFFFF"
                                }}
                            >
                                <Typography>Test</Typography>
                            </Stack>
                        </Grid>
                        <Grid md={9} data-aos="fade-down">
                            <Box
                                height="75vh"
                                sx={{ paddingLeft: '16px' }}
                                display="flex"
                                flexDirection="column"
                                justifyContent='flex-end'
                            >
                                <Box
                                    sx={{
                                        borderRadius: "4px",
                                        boxShadow: 3,
                                        backgroundColor: "#FFFFFF",
                                        marginRight: "52px",
                                        height: "100%",
                                        marginBottom: "16px"
                                    }}
                                >
                                    Test
                                </Box>
                                <Grid container>
                                    <Grid md={11}>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            variant="outlined"
                                            multiline
                                            maxRows="3"
                                            sx={{ boxShadow: 3, backgroundColor: "#FFFFFF" }}
                                        />
                                    </Grid>
                                    <Grid md={1}>
                                        <IconButton sx={{ margin: "10px" }}>
                                            <SendIcon></SendIcon>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Stack >
    )
}

export default ChatPage