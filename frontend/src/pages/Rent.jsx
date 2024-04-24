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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/rent");

                setRents(response.data);
                
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
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
                                <td><Link to={`/rent/${rent.id}/update`}>update</Link></td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Rent;
