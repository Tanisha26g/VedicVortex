import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Card,
  Form,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import lodash from "lodash";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/open-sans";

function Feed() {
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [formData, setFormData] = useState({
    itemType: "",
    itemName: "",
    price: "",
    quantity: "",
  });
  const [orderData, setOrderData] = useState({
    name: "",
    orderQuantity: 0,
    state: "",
    city: "",
    orderPin: "",
  });

  const token = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("user");
  const _id = window.localStorage.getItem("_id");

  useEffect(() => {
    axios
      .get("https://agri-assist-backend.onrender.com/getitem")
      .then((response) => {
        const items = response.data.response.reverse().map((item) => {
          const createdAt = new Date(item.createdAt);
          const formattedDate = `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}`;
          const isOwner = _id === item.createdBy;

          return (
            <Col key={item._id} md={3} style={{ marginTop: "2%", paddingBottom: "30px" }}>
              <Card style={{ backgroundColor: "#99F3BD", borderRadius: "25px" }}>
                <Card.Img
                  style={{ borderRadius: "25px", width: "100%", height: "100%" }}
                  variant="top"
                  src={`https://drive.google.com/thumbnail?id=${item.itemPictures[0]?.id}`}
                />
                <Card.Body style={{ textAlign: "center" }}>
                  <Card.Title style={{ color: "blue" }}>Item: {item.itemname}</Card.Title>
                  <Card.Text>Type: {item.itemtype}</Card.Text>
                  <Card.Text>Price: {item.price}</Card.Text>
                  <Card.Text>Stock: {item.availableQuantity} KG</Card.Text>
                  <Card.Text>Created: {formattedDate}</Card.Text>

                  {isOwner ? (
                    <Button variant="danger" id={item._id} onClick={handleDelete}>
                      Delete
                    </Button>
                  ) : (
                    <Button style={{ backgroundColor: "#32FF6A", borderColor: "black" }} onClick={() => setOrder(true)}>
                      Add to Cart
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        });

        setItemList(items);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  const handleDelete = (e) => {
    axios
      .post("https://agri-assist-backend.onrender.com/deleteitem", { id: e.target.id })
      .then(() => toast.success("Item deleted successfully.", { position: toast.POSITION.BOTTOM_RIGHT }))
      .catch(() => toast.error("Something went wrong.", { position: toast.POSITION.BOTTOM_RIGHT }));
  };

  const handleOrderClose = () => {
    setOrder(false);
    if (Object.values(orderData).every((val) => val)) {
      toast.success("Order placed successfully!", { position: toast.POSITION.BOTTOM_RIGHT });
    } else {
      toast.error("Please fill in all details!", { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  const handlePostItem = () => {
    if (Object.values(formData).some((val) => !val)) {
      return toast.warning("All fields are required!", { position: toast.POSITION.BOTTOM_RIGHT });
    }

    const info = new FormData();
    Object.entries(formData).forEach(([key, value]) => info.append(key, value));
    imageList.forEach((file) => info.append("itemPictures", file, file.name));

    axios
      .post("https://agri-assist-backend.onrender.com/postitem", info, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      })
      .then(() => toast.success("Item listed successfully!", { position: toast.POSITION.BOTTOM_RIGHT }))
      .catch(() => toast.error("Check your connection and try again.", { position: toast.POSITION.BOTTOM_RIGHT }));

    setShow(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageList((prev) => [...prev, ...files]);
  };

  return (
    <>
      {/* Add Item Modal */}
      <Modal backdrop="static" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              {["itemType", "itemName", "price", "quantity"].map((field) => (
                <Form.Group key={field}>
                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Label>{field.replace(/([A-Z])/g, " $1")}:</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        type={field === "price" || field === "quantity" ? "number" : "text"}
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              ))}
              <Form.Group>
                <Row>
                  <Col md={4}>
                    <Form.Label>Item Images</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="file" multiple onChange={handleImageUpload} />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlePostItem}>Post Item</Button>
        </Modal.Footer>
      </Modal>

      {/* Main Container */}
      <Container fluid>
        <Row>{itemList}</Row>
        {user === "farmer" && (
          <Box sx={{ m: 3, width: "15rem", height: "20rem", bgcolor: "#D2F6C5", border: 4, borderRadius: "25px", borderColor: "black" }}>
            <IconButton onClick={() => setShow(true)}>
              <AddIcon sx={{ fontSize: "100px", border: 4, borderColor: "black", borderStyle: "dashed", borderRadius: "25px" }} />
            </IconButton>
            <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>Add New Item</Typography>
          </Box>
        )}
      </Container>

      {/* Order Modal */}
      <Modal backdrop="static" show={order} onHide={handleOrderClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {Object.keys(orderData).map((field) => (
              <Form.Group key={field}>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Label>{field.replace(/([A-Z])/g, " $1")}:</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="text" value={orderData[field]} onChange={(e) => setOrderData({ ...orderData, [field]: e.target.value })} />
                  </Col>
                </Row>
              </Form.Group>
            ))}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOrderClose}>Place Order</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default Feed;
