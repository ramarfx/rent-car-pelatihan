import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddPenaltyPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/register");
                setUsers(response.data);
            } catch (error) {
                throw error;
            }
        };
        fetchUser()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                user_id: e.target.user_id.value,
                no_car: e.target.no_car.value,
                keterangan: e.target.keterangan.value,
                total: e.target.total.value,
            };
            const response = await axios.post("/penalties", payload);
            console.log(response);
        } catch (error) {
            throw error;
        }
    };

    return (
        <div>
            <h1>Add Penalty</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Tenant</Form.Label>
                    <Form.Select name="user_id">
                        {users.map((user) => (
                            <option value={user.id} key={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>no car</Form.Label>
                    <Form.Control type="text" name="no_car" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>keterangan</Form.Label>
                    <Form.Control type="text" name="keterangan" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>total</Form.Label>
                    <Form.Control type="number" name="total" />
                </Form.Group>
                <Button type="submit">Add Register</Button>
            </Form>
        </div>
    );
};

export default AddPenaltyPage;
