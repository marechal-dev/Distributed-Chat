import { BrowserRouter } from "react-router-dom";


import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useAuthContext } from "../providers/auth";


export function Routes() {
    const {nickname} = useAuthContext()
    
    return (
        <BrowserRouter>
           {nickname ? <AppRoutes /> : <AuthRoutes/>}
        </BrowserRouter>
    )
}