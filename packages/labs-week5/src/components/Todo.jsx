import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TodoItem(props) {


    function handleChange() {
        props.onChecked(props.id);
      }

    function handleDelete() {
        props.onDelete(props.id);
    }

    return (
        <li className="my-2">
            <label>
                <input 
                    id={props.id} 
                    type="checkbox" 
                    defaultChecked={props.completed}
                    onChange={handleChange}
                /> {props.name}
            </label>
            <FontAwesomeIcon 
                onClick={handleDelete}
                title="Delete" 
                icon="trash-can" 
                className="text-gray-500 ml-8" 
            />
        </li>
    );
}

export default TodoItem;
