import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderSection from "./HeaderSection";

function NavbarFinal() {
    const token = window.localStorage.getItem("token");
    const location = useLocation();
    const navigate = useNavigate();

    const [activeColor, setActiveColor] = useState({
        home: "none",
        features: "none",
        about: "none",
        contact: "none",
    });

    // Update active tab color based on current route
    useEffect(() => {
        const path = location.pathname;
        setActiveColor({
            home: path === "/" ? "aqua" : "none",
            features: path === "/features" ? "aqua" : "none",
            about: path === "/aboutus" ? "aqua" : "none",
            contact: path === "/contactus" ? "aqua" : "none",
        });
    }, [location.pathname]);

    const handleSignout = () => {
        localStorage.clear();
        axios
            .post("https://agri-assist-backend.onrender.com/signout")
            .then(() => {
                console.log("Successfully Logged Out");
                navigate("/"); // Redirect to home after logout
            })
            .catch((err) => console.log("Something went wrong: " + err));
    };

    return (
        <>
            <HeaderSection />
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container-fluid text-center">
                    <Link className="navbar-brand" to="/" style={{ marginLeft: "50px", color: "black" }}>
                        Agri-Assist
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mynavbar"
                        style={{ backgroundColor: "black" }}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item" style={{ backgroundColor: activeColor.home }}>
                                <Link className="nav-link" to="/" style={{ color: "black" }}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item" style={{ backgroundColor: activeColor.features }}>
                                <Link className="nav-link" to="/features" style={{ color: "black" }}>
                                    Features
                                </Link>
                            </li>
                            <li className="nav-item" style={{ backgroundColor: activeColor.about }}>
                                <Link className="nav-link" to="/aboutus" style={{ color: "black" }}>
                                    About Us
                                </Link>
                            </li>
                            <li className="nav-item" style={{ backgroundColor: activeColor.contact }}>
                                <Link className="nav-link" to="/contactus" style={{ color: "black" }}>
                                    Contact Us
                                </Link>
                            </li>
                            {token && (
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link text-black" onClick={handleSignout}>
                                        Sign-out
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavbarFinal;
