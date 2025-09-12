import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    return <div>
        <h2>Login Page</h2>
        <p>This is a placeholder for the login component.</p>
        <button onClick={() => {
            login("User");
           navigate("/", { replace: true });
        }

        }>Login</button>
    </div>
}

export default Login;