import React from 'react';
import { Card, CardContent, CardMedia, CardActionArea, CardActions, Button, Typography, Grid } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavbarFinal from './NavbarFinal';
import maleAvatar from '../Images/male-profile.jpg';
import femaleAvatar from '../Images/female-profile.jpg';

const teamMembers = [
    { name: 'Ch Likitha', role: 'Flask Backend Developer', img: femaleAvatar },
    { name: 'RRohithh Redhie', role: 'Frontend Developer', img: maleAvatar },
    { name: 'Mohammed Basheer', role: 'Deep Learning Model Developer', img: maleAvatar },
    { name: 'Mohd Saif', role: 'Backend Developer', img: maleAvatar },
];

function AboutUs() {
    const theme = createTheme();
    return (
        <>
            <NavbarFinal />
            <ThemeProvider theme={theme}>
                <Grid container justifyContent="center" sx={{ paddingTop: '40px', marginX: '20px' }}>
                    {teamMembers.map((member, index) => (
                        <Card key={index} sx={{ maxWidth: 300, margin: '15px' }}>
                            <CardActionArea>
                                <CardMedia component="img" height="300" image={member.img} alt={member.name} />
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="body1" color="textPrimary">
                                        {member.role}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    variant="outlined"
                                    endIcon={<GitHubIcon />}
                                    href="https://github.com/MohdSaif-1807"
                                    target="_blank"
                                    sx={{ borderColor: 'white', color: 'black', textDecoration: 'none' }}
                                >
                                    CONNECT
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            </ThemeProvider>
        </>
    );
}

export default AboutUs;
