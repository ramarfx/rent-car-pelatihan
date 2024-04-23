import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { AuthContextProvider, useAuth } from "./context/AuthContext";

axios.defaults.headers.common["Accept"] = "application/json";



ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>
);
