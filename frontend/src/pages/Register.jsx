import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const [registers, setRegisters] = useState([]);
    const { token } = useAuth();

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/a1/register",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                setRegisters(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Register</h1>

            <Table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {registers &&
                        registers.map((register) => (
                            <tr key={register.id}>
                                <td>{register.username}</td>
                                <td>{register.phone}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Register;
