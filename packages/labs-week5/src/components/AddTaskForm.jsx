import { useState } from "react";

function AddTaskForm(props) {
    const [name, setName] = useState("");

    function handleChange(event) {
        setName(event.target.value);
      }

    function handleSubmit(event) {
        event.preventDefault();
        if (name) props.onNewTask(name);
        setName("");
      }
      
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                id="new-todo-input"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
                className="border rounded-md p-2 m-1" 
                placeholder={props.placeholder}
            />
            <button className="bg-blue-600 rounded-md py-1 text-white mx-1 px-2">{props.button}</button>

        </form>
    )
}

export default AddTaskForm;