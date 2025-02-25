import React, { useState } from "react";
import { useNavigate, Link} from 'react-router'; // Correct import


export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false); // To track error visibility

    const navigate = useNavigate(); // Initialize navigate

    // const handleSignUpButton = () => {
    //     navigate('/signup');  // Navigate to Home page
    // };

    const handleLoginButton = () => {
        navigate("/home"); // Redirect to home page
    }
    


    return (
        <div className= 'centeritems'>
            {/* Center content horizontally and vertically */}
            <h1 className='heading'>
                Welcome to Gyno!
            </h1>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error-message">{message}</p>}
            <button onClick={ handleLoginButton }>
                Login
            </button>
            <button>
                Sign Up
            </button>
        </div>
    );
};

export default LoginPage;
