import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TodoItem(props) {
    return (
        <li className="my-2">
            <label>
                <input id={props.id} type="checkbox" defaultChecked={props.completed}/> {props.name}
            </label>
            <FontAwesomeIcon title="Delete" icon="trash-can" className="text-gray-500 ml-8" />
        </li>
    );
}

export default TodoItem;
