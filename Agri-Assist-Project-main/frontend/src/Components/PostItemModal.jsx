import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize toast notifications
toast.configure();

function PostItemModal() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [itemname, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [itemquestion, setItemQuestion] = useState("");
    const [itemimage, setItemImage] = useState([]);
    const [type, setType] = useState("");

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = () => {
        if (!itemname || !description || !type) {
            toast.warning("Please fill in all required fields 🙄.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("name", itemname);
        formData.append("description", description);
        formData.append("question", itemquestion);
        formData.append("type", type);

        itemimage.forEach((image) => {
            formData.append("itemPictures", image, image.name);
        });

        axios
            .post("https://agri-assist-backend.onrender.com/postitem", formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    console.log(`Upload progress: ${percentCompleted}%`);
                },
            })
            .then(() => {
                toast.success("🎉 Item listed successfully!");
                setItemName("");
                setDescription("");
                setType("");
                setItemQuestion("");
                setItemImage([]);
                handleClose();
            })
            .catch((err) => {
                console.error("Error:", err);
                toast.error("Oops! Something went wrong. Try again later.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Post Item
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Post Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Item Name <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter item name"
                                value={itemname}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Description <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Enter a Question (Optional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Example: What is the color of the phone?"
                                value={itemquestion}
                                onChange={(e) => setItemQuestion(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Item Type <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Choose...</option>
                                <option value="Lost">Lost It</option>
                                <option value="Found">Found It</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Upload Images</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(e) => {
                                    const files = Array.from(e.target.files);
                                    setItemImage(files);
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" role="status" className="me-2" />
                                Submitting...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PostItemModal;
