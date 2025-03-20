import React from "react";
import { Link, useNavigate } from "react-router";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest";

type FormResult = {
    type: "success" | "error";
    message: string;
    color?: string;
};

type LoginResponse = { token: { signature: string } };

interface LoginPageProps {
    onLogin: (token: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
    const navigate = useNavigate();

    async function handleSubmit(formData: FormData): Promise<FormResult> {
        const username = formData.get("username") as string | null;
        const password = formData.get("password") as string | null;

        if (!username || !password) {
            return {
                type: "error",
                message: "Please fill in both fields.",
                color: "red",
            };
        }

        try {
            const result = await sendPostRequest<LoginResponse>("/auth/login", { username, password });
            onLogin(result.token.signature); // Pass token to parent component if needed
            navigate("/"); // Redirect to home page

            return {
                type: "success",
                message: "Login successful! Redirecting...",
                color: "green",
            };
        } catch (error) {
            return {
                type: "error",
                message: (error as Error).message || "Login failed, please try again.",
                color: "red",
            };
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <UsernamePasswordForm onSubmit={handleSubmit} />
            <p>Don't have an account?</p>
            <Link to="/register">Register Here</Link>
        </div>
    );
}

export default LoginPage;
