import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); //ketika di submit tidak direfresh

        try {
            const response = await axios.post("http://localhost:8000/a1/auth/login", {
                username,
                password,
            });

            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <div>
            <h1>Form</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default Login;
