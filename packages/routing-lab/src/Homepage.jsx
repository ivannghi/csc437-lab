import { ImageEditForm } from "./images/ImageEditForm.jsx";
import { MainLayout } from "./MainLayout.jsx";

export function Homepage(props) {
    return (
        <div>
            <h1>Welcome, {props.userName}</h1>
            <p>This is the content of the home page.</p>
            <ImageEditForm/>
        </div>
    );
}
