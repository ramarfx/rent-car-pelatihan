import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

const TopBar = () => {

    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Latihan react</Navbar.Brand>
                <Nav>
                    <Nav.Item>
                        <Nav.Link>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>About</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>Contact</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
     );
}

export default TopBar;
