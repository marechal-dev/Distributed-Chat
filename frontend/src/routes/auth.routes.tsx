import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
        </Routes>
    )
}