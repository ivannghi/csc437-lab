import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TodoItem from "./components/Todo";
import AddTaskForm from './components/AddTaskForm';
// import addTask from './components/AddTask';
import { useState } from 'react';
import { nanoid } from "nanoid";


library.add(fas)

function App(props) {
    const [taskList, setTaskList] = useState(props.tasks); 

    const taskComponents = taskList.map((task) => (
        <TodoItem 
            onChecked={toggleTaskCompleted}
            onDelete={toggleDeleteTask}
            id={task.id} 
            name={task.name} 
            completed={task.completed} 
            key={task.id} 
            />
        ));
    console.log(taskComponents);

    function addTask(name) {
        const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
        setTaskList([...taskList, newTask]);
        // alert(name);
    }

    function toggleTaskCompleted(id) {
        const updatedTasks = taskList.map((task) => {
          // if this task has the same ID as the edited task
          if (id === task.id) {
            // use object spread to make a new object
            // whose `completed` prop has been inverted
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        setTaskList(updatedTasks);
      }
      
    function toggleDeleteTask(id) {
        const updatedTasks = taskList.filter(task => task.id !== id); // Remove task by filtering
        setTaskList(updatedTasks);
    }

    return (
        <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
            <AddTaskForm onNewTask={addTask} placeholder="New task here" button="Add task"/>
            <section>
                <h1 className="text-xl font-bold my-2">To do</h1>
                <ul>
                    {taskComponents}
                </ul>
            </section>
        </main>
    );
}

export default App;
