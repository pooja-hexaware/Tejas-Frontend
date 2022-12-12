//import React from 'react'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import Menu from '../menu/Menu';
import { Link } from "react-router-dom";
import foodimg from "../images/food.png"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Stores() {
    const [stores, setStores] = React.useState([])
    // const navigate = useNavigate();

    // function GoTOStore(_id){
    //     Menu(_id)
    //     //navigate('/menu');
    // }

    useEffect(() => {
        fetch("http://localhost:3000/api/store")
            .then((response) => response.json())

            .then((data) => {
                setStores(data);
            }
            )
    }, []);
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home"><h4>WiWi Food App (Capstone)</h4></Navbar.Brand>
                    <Nav className="me-auto">

                    
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Brand size="small" variant="outline-success">
                           
                        </Navbar.Brand>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br></br>
            <br></br>
            <h3>Stores</h3>
            <Card sx={{ ml: 55, maxWidth: 500 }}>
                <CardContent>
                    {stores.map((store) => (
                        <Card sx={{ ml: 1, maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={foodimg}
                                alt=" WiWi Store"

                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {store.storeName}
                                </Typography>

                                <Typography variant='body2' color="text.secondary">
                                    The food is Wating for You!
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {/* <Button size="small" onClick={() => Menu(store._id) } >Visit</Button> */}
                                <Link to={"/store/" + store._id} className="btn btn-sm btn-outline-primary" > Visit</Link>
                            </CardActions>

                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

export default Stores