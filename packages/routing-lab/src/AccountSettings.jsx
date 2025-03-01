import { MainLayout } from "./MainLayout.jsx";

export function AccountSettings(props) {


    return (
        <div>
            <h2>Account settings</h2>
            <label>
                Username <input 
                            value= {props.userName} 
                            onChange={(e) => props.onNameChange(e.target.value)}/>
            </label>
            <p><i>Changes are auto-saved.</i></p>
        </div>
    );
}
