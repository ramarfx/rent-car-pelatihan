import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ForbiddenPage from "../components/forbidden";

const Register = () => {
    const [registers, setRegisters] = useState([]);
    const [isForbidden, setIsForbidden] = useState(false);
    const { token } = useAuth();

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/register");
                setRegisters(response.data);
            } catch (error) {
                if (error.response.status === 403) {
                    setIsForbidden(true);
                }
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
            
            {isForbidden && <ForbiddenPage />}
        </div>
    );
};

export default Register;
