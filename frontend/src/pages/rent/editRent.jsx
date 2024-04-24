import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const EditRentPage = () => {
    const [users, setUsers] = useState([]);
    const [rent, setRent] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseRegister = await axios.get("/register");
                setUsers(responseRegister.data);

                const responseRent = await axios.get(`/rent/${id}`);
                console.log(responseRent);
                setRent(responseRent.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    console.log(rent.user_id);

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
                tenant: users.find((user) => user.id == e.target.user_id.value)
                    .username,
            };
            await axios.put(`/rent/${id}`, payload);
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
                    <Form.Select name="user_id" disabled value={rent.user_id}>
                        {users.map((user) => (
                            <option
                                value={user.id}
                                key={user.id}
                            >
                                {user.username}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>no car</Form.Label>
                    <Form.Control
                        type="text"
                        name="no_car"
                        value={rent.no_car}
                        onChange={(e) => setRent({...rent, no_car: e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>date borrow</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_borrow"
                        value={rent.date_borrow}
                        onChange={(e) => setRent({...rent, date_borrow: e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>date return</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_return"
                        value={rent.date_return}
                        onChange={(e) => setRent({...rent, date_return: e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>down payment</Form.Label>
                    <Form.Control
                        type="number"
                        name="down_payment"
                        value={rent.down_payment}
                        onChange={(e) => setRent({...rent, down_payment: e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>total</Form.Label>
                    <Form.Control
                        type="number"
                        name="total"
                        value={rent.total}
                        onChange={(e) => setRent({...rent, total: e.target.value})}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>status</Form.Label>
                    <Form.Check
                        type="radio"
                        label="on process"
                        name="status"
                        value={'on process'}
                        checked={rent.status === "on process" && "checked"}
                        onChange={(e) => setRent({...rent, status: e.target.value})}
                    />
                    <Form.Check
                        type="radio"
                        label="returned"
                        name="status"
                        value={'returned'}
                        checked={rent.status === "returned" && "checked"}
                        onChange={(e) => setRent({...rent, status: e.target.value})}
                    />
                </Form.Group>
                <Button type="submit">Add Register</Button>
            </Form>
        </div>
    );
};

export default EditRentPage;
