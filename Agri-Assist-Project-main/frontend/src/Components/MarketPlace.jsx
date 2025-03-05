import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

function MarketPlace() {
    const [userInfo, setUserInfo] = useState(() => JSON.parse(localStorage.getItem("user")));
    const [items, setItems] = useState([]);
    const [foundItems, setFoundItems] = useState([]);

    // ReadMore Component
    const ReadMore = ({ children }) => {
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => setIsReadMore(!isReadMore);

        return (
            <p style={{ fontSize: "1rem" }}>
                {isReadMore ? children.slice(0, 15) : children}
                {children.length > 15 && (
                    <span onClick={toggleReadMore} style={{ color: "blue", cursor: "pointer" }}>
                        {isReadMore ? " ...." : " show less"}
                    </span>
                )}
            </p>
        );
    };

    // Fetch Items
    useEffect(() => {
        axios.get("https://agri-assist-backend.onrender.com/getitem")
            .then((response) => {
                console.log("getitem responses", response.data.postitems);

                const sortedItems = response.data.postitems.reverse();
                const lostItems = [];
                const foundItemsList = [];

                sortedItems.forEach((item) => {
                    const createdDate = new Date(item.createdAt);
                    const formattedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()} ${createdDate.getHours()}:${createdDate.getMinutes()}`;

                    const isUserItem = item.createdBy === userInfo._id;
                    const itemCard = (
                        <Col key={item._id} style={{ marginTop: "20px", paddingRight: "40px" }} md={3}>
                            <a href={`/${item.name}?cid=${item._id}&type=${item.type}/${isUserItem}`}>
                                <Card bsPrefix="item-card">
                                    <Card.Img
                                        variant="top"
                                        src={`https://drive.google.com/uc?export=view&id=${item.itemPictures[0].id}`}
                                    />
                                    <Card.Body>
                                        <Card.Title style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: "bold", color: "blue" }}>
                                            Item: {item.name}
                                        </Card.Title>
                                        {item.description && (
                                            <Card.Text style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: "1rem" }}>
                                                Description: <ReadMore>{item.description}</ReadMore>
                                            </Card.Text>
                                        )}
                                        <Card.Text style={{ fontSize: "1rem" }}>
                                            Created at: {formattedDate}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </a>
                        </Col>
                    );

                    if (item.type === "Lost" && item.status === true) {
                        lostItems.push(itemCard);
                    } else {
                        foundItemsList.push(itemCard);
                    }
                });

                setItems(lostItems);
                setFoundItems(foundItemsList);
            })
            .catch((err) => console.error("Error fetching items:", err));
    }, []);

    return (
        <div>
            <h2 style={{ fontFamily: "'Noto Sans JP', sans-serif", backgroundColor: "#fff", color: "#000" }}>
                Welcome {userInfo.firstname} 👋!
            </h2>

            <div style={{ backgroundColor: "#71C9CE" }}>
                <Container fluid>
                    <h2 style={{ textAlign: "center", color: "#fff" }}>Lost Items</h2>
                    <div className="title-border"></div>
                    <Row>{items}</Row>
                </Container>
            </div>

            {foundItems.length > 0 && (
                <div style={{ backgroundColor: "#71C9CE" }}>
                    <Container fluid>
                        <h2 style={{ textAlign: "center", color: "#fff" }}>Found Items</h2>
                        <div className="title-border"></div>
                        <Row>{foundItems}</Row>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default MarketPlace;
