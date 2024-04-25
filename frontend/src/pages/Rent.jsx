import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

const Rent = () => {
    const [rents, setRents] = useState([]);
    const { token } = useAuth();

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    const fetchData = async () => {
        try {
            const response = await axios.get("/rent");

            setRents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/rent/${id}`)
            console.log(response);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1>Rent</h1>

            <Link to={"/rent/add"}>
                <Button variant="success">Add</Button>
            </Link>
            <Table>
                <thead>
                    <tr>
                        <th>Tenant</th>
                        <th>No car</th>
                        <th>Date Borrow</th>
                        <th>Date Return</th>
                        <th>Down Payment</th>
                        <th>Total</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {rents &&
                        rents.map((rent) => (
                            <tr key={rent.id}>
                                <td>{rent.tenant}</td>
                                <td>{rent.no_car}</td>
                                <td>{rent.date_borrow}</td>
                                <td>{rent.date_return}</td>
                                <td>{rent.down_payment}</td>
                                <td>{rent.total}</td>
                                <td className="d-flex gap-2">
                                    <Link to={`/rent/${rent.id}/update`}>
                                        <Button>update</Button>
                                    </Link>

                                    <Button variant="danger" onClick={() => handleDelete(rent.id)}>delete</Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Rent;
