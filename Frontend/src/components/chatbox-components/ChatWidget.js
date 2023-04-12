import { Box, Button, Grid, Typography, Avatar } from "@mui/material"

export default function ChatWidget({ image, name, noti }) {
    if (noti == 0) {
        return (
            <Button variant="outlined" display="flex" justifyContent="center" alignItems="center">
                <Grid container display="flex" alignItems="center">
                    <Grid md="3">
                        <Avatar alt={name} src={image} />
                    </Grid>
                    <Grid md="7">
                        <Typography>{name}</Typography>
                    </Grid>
                    <Grid md="2">
                    </Grid>
                </Grid>
            </Button>
        )
    }
    else {
        return (
            <Button variant="outlined" display="flex" justifyContent="center" alignItems="center">
                <Grid container display="flex" alignItems="center">
                    <Grid md="3">
                        <Avatar alt={name} src={image} />
                    </Grid>
                    <Grid md="7">
                        <Typography>{name}</Typography>
                    </Grid>
                    <Grid md="2">
                        <Box
                            sx={{
                                borderRadius: '50%',
                                backgroundColor: "purple",
                            }}
                        >
                            <Typography color="white">{noti}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Button>
        )
    }
}