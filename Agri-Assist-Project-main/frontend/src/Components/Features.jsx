import { React, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Typography } from '@mui/material';
import "@fontsource/libre-baskerville/400-italic.css";
import "@fontsource/open-sans";
import cropRelatedIssues from '../Images/cropRelatedIssues.jpg';
import cropMarketing from '../Images/cropMarketing.jpg';
import NavbarFinal from './NavbarFinal';

const defaultTheme = createTheme();

function Features() {
    const user = window.localStorage.getItem("user");
    const token = window.localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    if (!token) return null; // Prevents rendering if token is missing

    return (
        <>
            <NavbarFinal />
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100%' }}>
                    <CssBaseline />
                    <Typography 
                        sx={{ marginLeft: "120px", position: 'absolute', fontFamily: "Libre Baskerville", fontWeight: "bold", fontSize: "50px" }}
                    >
                        Feature Section
                    </Typography>
                    <Grid item xs={12} md={12} sx={{ overflow: 'visible' }}>
                        <Container sx={{ paddingLeft: "40px", paddingTop: "150px", textAlign: "center" }}>
                            <Row>
                                {user === 'farmer' && (
                                    <Col>
                                        <FeatureBox 
                                            imgSrc={cropRelatedIssues} 
                                            link="/crop-related-issues" 
                                            text="Crop Related Issues" 
                                        />
                                    </Col>
                                )}
                                <Col>
                                    <FeatureBox 
                                        imgSrc={cropMarketing} 
                                        link="/marketplace" 
                                        text="Yield Marketing" 
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
}

const FeatureBox = ({ imgSrc, link, text }) => (
    <Box 
        sx={{ display: "grid", width: "300px", height: "300px", backgroundColor: '#99F3BD', textAlign: "center", padding: "20px" }}
    >
        <img src={imgSrc} alt={text} width="180px" height="180px" />
        <a href={link} style={{ textDecoration: 'none', fontFamily: 'Open Sans', fontWeight: 'bold', color: 'black' }}>
            {text}
        </a>
    </Box>
);

export default Features;
