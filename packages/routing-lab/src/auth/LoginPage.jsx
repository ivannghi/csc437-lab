import React from "react";
import { Link, useNavigate } from "react-router";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "../sendPostRequest";

export function LoginPage(props) {
    const navigate = useNavigate(); // Initialize useNavigate

    async function handleSubmit(formData){

        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const result = await sendPostRequest("/auth/login", { username: username, password: password });
            console.log(result.token);
            props.onLogin(result.token.signature);
            navigate("/");

            return {
                type: "success",
                message: "Logging in.",
            };
        } catch (error) {
            return {
                type: "error",
                message: error.message || "Registration failed, please try again.",
            }
        }

    }
    
    return (
        <div>
            <h1>Login</h1>
            <UsernamePasswordForm onSubmit={handleSubmit}/>
            <p>Don't have an account?</p>
            <Link to="/register">Register Here</Link>
        </div>
    )
}