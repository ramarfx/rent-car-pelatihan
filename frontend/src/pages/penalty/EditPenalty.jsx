import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const EditPenaltyPage = () => {
    const [users, setUsers] = useState([]);
    const [penalties, setPenalties] = useState([]);
    const {id} = useParams()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/register");
                setUsers(response.data);

                const responsePenalties = await axios.get(`penalties/${id}`)
                setPenalties(responsePenalties.data)
            } catch (error) {
                throw error;
            }
        };
        fetchUser();
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
            const response = await axios.put(`/penalties/${id}`, payload);
            console.log(response);
        } catch (error) {
            throw error;
        }
    };
    return (
        <div>
            <h1>Edit Penalty</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Tenant</Form.Label>
                    <Form.Select name="user_id" disabled value={penalties.user_id}>
                        {users.map((user) => (
                            <option value={user.id} key={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>no car</Form.Label>
                    <Form.Control type="text" name="no_car" value={penalties.no_car || ''} onChange={(e) => setPenalties({...penalties, no_car: e.target.value})} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>keterangan</Form.Label>
                    <Form.Control type="text" name="keterangan" value={penalties.keterangan || ''} onChange={(e) => setPenalties({...penalties, keterangan: e.target.value})} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>total</Form.Label>
                    <Form.Control type="number" name="total" value={penalties.total || ''} onChange={(e) => setPenalties({...penalties, total: e.target.value})} />
                </Form.Group>
                <Button type="submit">Add Register</Button>
            </Form>
        </div>
    );
};

export default EditPenaltyPage;
