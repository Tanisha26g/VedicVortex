import React, { useState } from 'react';
import axios from 'axios';
import NavbarFinal from './NavbarFinal';
import "@fontsource/open-sans";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Grid, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        issue: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("https://agri-assist-backend.onrender.com/sendEmail", formData);
            setFormData({ name: '', email: '', phone: '', subject: '', issue: '' });
            toast.success(response.data, { position: toast.POSITION.BOTTOM_RIGHT });
        } catch (error) {
            toast.error(error.response?.data || "An error occurred", { position: toast.POSITION.BOTTOM_RIGHT });
        }
    };

    const formFields = [
        { label: "Name", type: "text", name: "name", placeholder: "Enter Name" },
        { label: "Email", type: "email", name: "email", placeholder: "Enter Email" },
        { label: "Phone Number", type: "number", name: "phone", placeholder: "Enter Phone Number" },
        { label: "Subject", type: "text", name: "subject", placeholder: "Subject" },
    ];

    return (
        <>
            <NavbarFinal />
            <Grid container justifyContent="center" sx={{ paddingTop: "20px" }}>
                <Typography sx={{ fontWeight: "bold", fontFamily: "Open Sans", fontSize: "30px", textAlign: "center" }}>Contact Us</Typography>
                <Box sx={{ backgroundColor: "#99F3BD", padding: "20px", minHeight: "70vh", borderRadius: "10px" }}>
                    {formFields.map(({ label, type, name, placeholder }) => (
                        <Row key={name} className="mb-3">
                            <Col>
                                <Form.Label style={{ fontWeight: "bold" }}>{label}</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type={type} name={name} value={formData[name]} placeholder={placeholder} onChange={handleChange} />
                            </Col>
                        </Row>
                    ))}
                    <Row>
                        <Col>
                            <Form.Label style={{ fontWeight: "bold" }}>Issues</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control as="textarea" name="issue" rows={5} placeholder="Describe your issue..." value={formData.issue} onChange={handleChange} />
                        </Col>
                    </Row>
                    <Row className="mt-3 text-center">
                        <Col>
                            <Button onClick={handleSubmit}>Submit</Button>
                        </Col>
                    </Row>
                </Box>
            </Grid>
            <ToastContainer />
        </>
    );
}

export default ContactUs;
