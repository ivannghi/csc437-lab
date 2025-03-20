import React from "react";
import { useNavigate, Link } from "react-router";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest"; // Import the sendPostRequest utility

type FormResult = {
    type: "success" | "error";
    message: string;
    color?: string;
};

interface RegisterPageProps {
    onRegister: (token: string) => void; // Accept the onRegister prop
}

export function RegisterPage({ onRegister }: RegisterPageProps) {
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
        console.log(`Registering: ${username} and ${password}`);

        try {
            const result = await sendPostRequest<{ token: string }>("/auth/register", {
                username,
                password,
            });
            
            onRegister(result.token); // Call onRegister with the token
            navigate("/"); // Redirect after successful registration

            return {
                type: "success",
                message: "Registration successful! Redirecting...",
                color: "green",
            };
        } catch (error) {
            return {
                type: "error",
                message: (error as Error).message || "An error occurred",
                color: "red",
            };
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <UsernamePasswordForm onSubmit={handleSubmit} />
            <p>Already have an account?</p>
            <Link to="/login">Login Here</Link>
        </div>
    );
}

export default RegisterPage;
