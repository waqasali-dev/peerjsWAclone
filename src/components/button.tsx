import React, { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { Navigate } from "react-router-dom";

interface ButtonProps {
    onClick?: () => void;
    label: string;
}


const Button: React.FC<ButtonProps> = (props) => {
    const { user, login, logout } = useContext(AuthContext);
    return <div>
        {user ? (
            <div>
                <p>Welcome, {user}!</p>
                <button onClick={logout}>{props.label}</button>
            </div>
        ) : (
            <Navigate to="/login" replace={true} />
        )
        }
    </div>
}

export default Button;