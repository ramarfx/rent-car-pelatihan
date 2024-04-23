import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Return = () => {
    const [returns, setReturns] = useState([]);
    const { token } = useAuth();

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/return");

                setReturns(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <h1>Return</h1>

            <Table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Penalties</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {returns &&
                        returns.map((item) => (
                            <tr key={item.id}>
                                <td>fulan</td>
                                <td>{item.penalty_id}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Return;
