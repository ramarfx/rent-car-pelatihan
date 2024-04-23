import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Penalties = () => {
    const [penalties, setPenalties] = useState([]);
    const { token } = useAuth();

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/penalties");
                setPenalties(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();


    }, []);

    useEffect(() => {
        console.log("penalties", penalties);
    },[penalties])
    return (
        <div>
            <h1>Penalties</h1>

            <Table>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>Keterangan</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {penalties &&
                        penalties.map((penalty) => (
                            <tr key={penalty.id}>
                                <td>fulan</td>
                                <td>{penalty.keterangan}</td>
                                <td>{penalty.total}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Penalties;
