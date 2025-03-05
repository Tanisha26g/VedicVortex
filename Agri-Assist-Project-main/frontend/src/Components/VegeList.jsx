import React, { useState, useEffect } from 'react';
import { Table, Dropdown, Form } from 'react-bootstrap';
import axios from 'axios';

function VegeList() {
    const [data, setData] = useState([]);
    const [stateInfo, setStateInfo] = useState('telangana');

    useEffect(() => {
        axios.post('https://agri-assist-backend.onrender.com/get-item', {
            stateInfo: stateInfo
        }).then((res) => { 
            setData(res.data.filter((item) => item.vegetable_names !== '')); 
            console.log(res.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [stateInfo]);

    function handleClick(e) {
        setStateInfo(e.target.getAttribute('data-value'));
    }

    return (
        <>
            <Dropdown style={{ position: 'absolute', right: '75%' }} >
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    Select State
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item data-value="andhraPradesh" onClick={handleClick}>Andhra Pradesh</Dropdown.Item>
                    <Dropdown.Item data-value="arunachalPradesh" onClick={handleClick}>Arunachal Pradesh</Dropdown.Item>
                    <Dropdown.Item data-value="telangana" onClick={handleClick}>Telangana</Dropdown.Item>
                    <Dropdown.Item data-value="maharashtra" onClick={handleClick}>Maharashtra</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Form.Label style={{ position: 'absolute', right: '42%', width: '30%' }}>
                <b>Current State Value</b>
            </Form.Label>
            <Form.Control
                type='text'
                value={stateInfo}
                style={{ position: 'absolute', right: '40%', width: '20%', fontWeight: 'bold' }}
                readOnly
            />
            <br /><br />

            <Table striped bordered hover variant='light'>
                <thead>
                    <tr>
                        <th>Vegetable Names</th>
                        <th>Wholesale Price</th>
                        <th>Retail Price</th>
                        <th>Shopping Mall Price</th>
                        <th>Units</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.vegetable_names}</td>
                                <td>{item.wholesale_price}</td>
                                <td>{item.retail_price}</td>
                                <td>{item.shoppingmall_price}</td>
                                <td>{item.units}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    );
}

export default VegeList;
