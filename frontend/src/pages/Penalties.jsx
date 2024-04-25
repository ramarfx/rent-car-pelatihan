import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Penalties = () => {
    const [penalties, setPenalties] = useState([]);
    const { token } = useAuth();

    if (!token) {
        return <Navigate to={"/login"} />;
    }
    const fetchData = async () => {
        try {
            const response = await axios.get("/penalties");
            setPenalties(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/penalties/${id}`);
            console.log(response);
            fetchData();
        } catch (error) {
            throw error;
        }
    };
    return (
        <div>
            <h1>Penalties</h1>

            <Button variant="success">Add Penalty</Button>
            <Table>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>Keterangan</th>
                        <th>Total</th>
                        <td>action</td>
                    </tr>
                </thead>
                <tbody>
                    {penalties &&
                        penalties.map((penalty) => (
                            <tr key={penalty.id}>
                                <td>fulan</td>
                                <td>{penalty.keterangan}</td>
                                <td>{penalty.total}</td>
                                <td className="d-flex gap-2">
                                    <Link
                                        to={`/penalties/${penalty.id}/update`}
                                    >
                                        <Button>Update</Button>
                                    </Link>

                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(penalty.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Penalties;
