import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [registers, setRegisters] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response  = await axios.get('http://localhost:8000/a1/register');
            console.log(response);

        } catch (error) {
              if (error.response.status == 401) {
                  navigate('/login');
              }
          }
        }

        fetchData()
    },[])

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
                    <tr>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default Register;
