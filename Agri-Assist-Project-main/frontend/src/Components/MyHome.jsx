import React from "react";
import { Typography, Box, Button, Grid, Paper, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavbarFinal from "./NavbarFinal";

const defaultTheme = createTheme();

function MyHome() {
    const navigate = useNavigate();

    return (
        <>
            <NavbarFinal />
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ backgroundColor: "#D2F6C5", height: "80vh" }}>
                    <CssBaseline />
                    
                    {/* Left Section - Text and Buttons */}
                    <Grid 
                        item xs={12} sm={8} md={6} 
                        component={Paper} elevation={10} square
                        sx={{ backgroundColor: "#D2F6C5", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <Box textAlign="center">
                            <Typography sx={{ fontFamily: "Libre Baskerville", fontWeight: "bold", fontSize: "45px" }}>
                                Empowering Farmers
                            </Typography>
                            <Typography sx={{ fontFamily: "Libre Baskerville", fontWeight: "bold", fontSize: "45px", mt: 3 }}>
                                Through Innovation
                            </Typography>

                            {/* Buttons Container */}
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 5 }}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => navigate("/sign-up")}
                                    sx={{
                                        ":hover": { bgcolor: "#AF5", color: "black" },
                                        width: "120px",
                                        height: "50px",
                                        borderRadius: "10px",
                                        fontFamily: "Open Sans",
                                        fontWeight: "bold",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    SignUp <HowToRegIcon sx={{ ml: 1 }} />
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => navigate("/login")}
                                    sx={{
                                        ":hover": { bgcolor: "#AF5", color: "black" },
                                        width: "120px",
                                        height: "50px",
                                        borderRadius: "10px",
                                        fontFamily: "Open Sans",
                                        fontWeight: "bold",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    Login <LoginIcon sx={{ ml: 1 }} />
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right Section - Image */}
                    <Grid
                        item xs={false} sm={4} md={6}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?agriculture&wallpapers)',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                </Grid>
            </ThemeProvider>
        </>
    );
}

export default MyHome;
