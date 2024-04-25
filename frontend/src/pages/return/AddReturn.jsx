import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddReturnPage = () => {
    const [rents, setRents] = useState([]);
    const [rent, setRent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rentResponse = await axios.get("/rent");
                setRents(rentResponse.data);
                setRent(rentResponse.data[0]);
            } catch (error) {
                throw error;
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // const singleRent = rents.find((_rent) => _rent.id == rent);
        console.log(rent.no_car);
    }, [rent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                rent_id: e.target.rent_id.value,
                penalty_id: e.target.penalty_id.value,
                no_car: e.target.no_car.value,
                date_return: e.target.date_return.value,
                total: e.target.total.value,
            };

            const response = await axios.post("/return", payload);
            console.log(response);
        } catch (error) {
            throw error;
        }
    };
    return (
        <div>
            <h1>Add Return</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Rent</Form.Label>
                    <Form.Select
                        name="rent_id"
                        onChange={(e) =>
                            setRent(
                                rents.find(
                                    (_rent) => _rent.id == e.target.value
                                )
                            )
                        }
                    >
                        {rents.map((rent) => (
                            <option value={rent.id} key={rent.id}>
                                {rent.tenant}
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
                        disabled
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Penalty ID</Form.Label>
                    <Form.Control type="number" name="penalty_id" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>date return</Form.Label>
                    <Form.Control type="date" name="date_return" />
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

export default AddReturnPage;
