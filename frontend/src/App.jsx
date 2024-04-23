import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import TopBar from "./components/Topbar";
import Rent from "./pages/Rent";
import Return from "./pages/Return";
import Penalties from "./pages/Penalties";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Container } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

const App = () => {
    const { token } = useAuth();
    useEffect(() => {
        console.log('global', token);
    }, [token]);

    return (
        <div>
            <BrowserRouter>
                <TopBar />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/rent" element={<Rent />} />
                        <Route path="/return" element={<Return />} />
                        <Route path="/penalties" element={<Penalties />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </div>
    );
};

export default App;
