import { Grid, Container, Box, Stack, IconButton, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import Nav from "../components/Nav";
import ChatWidget from "../components/chatbox-components/ChatWidget";
import { InChat, OutChat } from "../components/chatbox-components/ChatBoxes";
import Aos from "aos";
import Header2 from "../components/Header2";

//Function that renders chat-ui layout
function ChatPage() {
    Aos.init({ duration: 1000, offset: 0 });
    return (
        <Stack>
            <Header2 />
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
                                spacing
                                sx={{
                                    padding: '16px',
                                    boxShadow: 3,
                                    borderRadius: "4px",
                                    backgroundColor: "#FFFFFF",
                                    overflow: 'auto'
                                }}
                            >
                            </Stack>
                        </Grid>
                        <Grid md={9} data-aos="fade-down">
                            <Box
                                height="75vh"
                                sx={{ paddingLeft: '16px' }}
                                display="flex"
                                flexDirection="column"
                            >
                                <Stack
                                    direction="column-reverse"
                                    sx={{
                                        borderRadius: "4px",
                                        boxShadow: 3,
                                        backgroundColor: "#FFFFFF",
                                        marginRight: "52px",
                                        height: "100%",
                                        marginBottom: "16px",
                                        overflow: 'auto'
                                    }}
                                >
                                </Stack>
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