import React from "react";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "../sendPostRequest";
import { useNavigate } from "react-router";

export function RegisterPage(props) {
    const navigate = useNavigate();

    async function handleSubmit(formData){

        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const result = await sendPostRequest("/auth/register", { username: username, password: password });
            console.log(result.token);
            props.onRegister(result.token.signature);
            navigate('/');


            return {
                type: "success",
                message: "Account successfully created!",
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
            <h1>Register a New Account</h1>
            <UsernamePasswordForm onSubmit={handleSubmit}/>
        </div>
    );
}