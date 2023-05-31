import { Routes, Route } from "react-router-dom";

import GlobalChat from "../pages/GlobalChat";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<GlobalChat />} />
        </Routes>
    )
}