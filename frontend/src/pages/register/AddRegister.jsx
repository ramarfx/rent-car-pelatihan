import axios from "axios";
import { Button, Form } from "react-bootstrap";

const AddRegisterPage = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                username: e.target.username.value,
                password: e.target.password.value,
                phone: e.target.phone.value,
            };
            console.log(payload);
            const response = await axios.post("/register", payload);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Add register</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control type="text" name="password" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number" name="phone" />
                </Form.Group>

                <Button type="submit">Add Register</Button>
            </Form>
        </div>
    );
};

export default AddRegisterPage;
