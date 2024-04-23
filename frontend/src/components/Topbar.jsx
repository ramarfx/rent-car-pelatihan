import { Link } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const TopBar = () => {
    const { token, setToken } = useAuth();

    const handleLogout = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/a1/auth/logout",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);

            setToken(null);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Latihan react</Navbar.Brand>
                <Nav>
                    <Nav.Item>
                        <Nav.Link as={Link} to={"/"}>
                            Home
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={"/rent"}>
                            Rent
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={"/return"}>
                            Return
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={"/penalties"}>
                            Penalties
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={"/register"}>
                            Register
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        {token ? (
                            <Button variant="warning" onClick={handleLogout}>
                                logout
                            </Button>
                        ) : (
                            <Nav.Link as={Link} to={"/login"}>
                                Login
                            </Nav.Link>
                        )}
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default TopBar;
