function AddTaskForm(props) {
    return (
        <form>
            <input className="border rounded-md p-2 m-1" placeholder={props.placeholder}/>
            <button className="bg-blue-600 rounded-md py-1 text-white mx-1 px-2">{props.button}</button>
        </form>
    )
}

export default AddTaskForm;