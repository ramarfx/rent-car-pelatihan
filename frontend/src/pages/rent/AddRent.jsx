import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddRentPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/register');
                setUsers(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                user_id: e.target.user_id.value,
                no_car: e.target.no_car.value,
                date_borrow: e.target.date_borrow.value,
                date_return: e.target.date_return.value,
                down_payment: e.target.down_payment.value,
                total: e.target.total.value,
                status: e.target.status.value,
                tenant: users.find((user) => user.id == e.target.user_id.value).username
            };
            // console.log(payload);
            const response = await axios.post("/rent", payload);

            console.log(response);
            navigate('/rent')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>add rent</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Tenant</Form.Label>
                    <Form.Select name="user_id">
                        {users.map((user) => (
                            <option value={user.id} key={user.id}>{user.username}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>no car</Form.Label>
                    <Form.Control type="text" name="no_car" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>date borrow</Form.Label>
                    <Form.Control type="date" name="date_borrow" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>date return</Form.Label>
                    <Form.Control type="date" name="date_return" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>down payment</Form.Label>
                    <Form.Control type="number" name="down_payment" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>total</Form.Label>
                    <Form.Control type="number" name="total" />

                    <Form.Control type="hidden" value={"on process"} name="status" />
                </Form.Group>
                <Button type="submit">Add Register</Button>
            </Form>
        </div>
    );
};

export default AddRentPage;
