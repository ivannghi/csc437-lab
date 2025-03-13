import React from "react";
import { useActionState } from "react";

export function UsernamePasswordForm(props) {
    function handleChange(e) {
        // console.log(e.target.value);
    }

    const [result, submitAction, isPending] = useActionState(
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
            // console.log("beforeonsubmit");
            const submitResult = await props.onSubmit(formData);

            return submitResult;
        },
        null
      );

    return (
        <>
          {result && <p 
            className={`message ${result.type}`}
            style={{ color: result.color || "inherit" }}
                    >
                        {result.message}
                    </p>}
          {isPending && <p className="message loading">Loading ...</p>}
            <form action={submitAction}>
                <div>
                    <label for="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        onChange={handleChange}
                        disabled={isPending}
                    />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        onChange={handleChange}
                        disabled={isPending}
                    />
                </div>
                <div>
                    <button disabled={isPending} type="submit">Enter</button>
                </div>
            </form>
        </>
      );
}
