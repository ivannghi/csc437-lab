import React from "react";
import { useActionState } from "react";
import "./UsernameUI.css";

type FormResult = {
    type: "success" | "error";
    message: string;
    color?: string;
};

type UsernamePasswordFormProps = {
    onSubmit: (formData: FormData) => Promise<FormResult>;
};

export function UsernamePasswordForm({ onSubmit }: UsernamePasswordFormProps) {
    const [result, submitAction, isPending] = useActionState<FormResult | null, FormData>(
        async (previousState, formData) => {
            const username = formData.get("username");
            const password = formData.get("password");

            if (!username || !password) {
                return {
                    type: "error",
                    message: `Please fill in your username and password.`,
                    color: "red",
                };
            }

            const submitResult = await onSubmit(formData);
            return submitResult;
        },
        null
    );

    return (
        <div className="form-container">
            {result && (
                <p className="error-message" style={{ color: result.color || "red" }}>
                    {result.message}
                </p>
            )}

            {isPending && <p className="loading-message">Loading...</p>}

            <form action={submitAction} className="form">
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Enter your username" 
                    disabled={isPending} 
                    className="input-field"
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    disabled={isPending} 
                    className="input-field"
                />
                <button type="submit" disabled={isPending} className="submit-btn">Enter</button>
            </form>
        </div>
    );
}
