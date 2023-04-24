import { Grid, Container, Box, Stack, IconButton, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import Nav from "../components/Nav";
import ChatWidget from "../components/chatbox-components/ChatWidget";
import { InChat, OutChat } from "../components/chatbox-components/ChatBoxes";
import Aos from "aos";


function ChatPage() {
    Aos.init({ duration: 1000, offset: 0 });
    return (
        <Stack>
            <Nav />
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
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "0"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
                                <ChatWidget image="https://www.ischool.berkeley.edu/sites/default/files/styles/profile_photo/public/profile_pictures/minea.jpg?itok=X4-9bYu2&c=342e574f8f7bcede7cf1baf1c545c123" name="Marius" noti = "2"/>
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
                                    <InChat message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae volutpat metus, cursus aliquet ligula. Pellentesque et metus nunc. In ut libero id sem ultricies tempor id a leo. Phasellus dapibus tellus at nibh fringilla finibus. Quisque dictum congue ligula nec ornare. Aenean tincidunt eros id aliquam fringilla. In id pulvinar erat, eget efficitur odio. Aliquam erat volutpat. Morbi non enim condimentum, laoreet ligula et, faucibus quam. Aenean bibendum ex sapien, eu gravida tellus aliquet non. Phasellus sit amet condimentum turpis. Morbi cursus, turpis at imperdiet tincidunt, lacus massa imperdiet arcu, at mollis elit nisl vel justo. Suspendisse potenti."/>
                                    <OutChat message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae volutpat metus, cursus aliquet ligula. Pellentesque et metus nunc. In ut libero id sem ultricies tempor id a leo. Phasellus dapibus tellus at nibh fringilla finibus. Quisque dictum congue ligula nec ornare. Aenean tincidunt eros id aliquam fringilla. In id pulvinar erat, eget efficitur odio. Aliquam erat volutpat. Morbi non enim condimentum, laoreet ligula et, faucibus quam. Aenean bibendum ex sapien, eu gravida tellus aliquet non. Phasellus sit amet condimentum turpis. Morbi cursus, turpis at imperdiet tincidunt, lacus massa imperdiet arcu, at mollis elit nisl vel justo. "></OutChat>
                                    <InChat message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae volutpat metus, cursus aliquet ligula. Pellentesque et metus nunc. In ut libero id sem ultricies tempor id a leo. Phasellus dapibus tellus at nibh fringilla finibus. Quisque dictum congue ligula nec ornare. Aenean tincidunt eros id aliquam fringilla. In id pulvinar erat, eget efficitur odio. Aliquam erat volutpat. Morbi non enim condimentum, laoreet ligula et, faucibus quam. Aenean bibendum ex sapien, eu gravida tellus aliquet non. Phasellus sit amet condimentum turpis. Morbi cursus, turpis at imperdiet tincidunt, lacus massa imperdiet arcu, at mollis elit nisl vel justo. Suspendisse potenti."/>
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