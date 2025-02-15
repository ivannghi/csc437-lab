import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TodoItem from "./components/Todo";
import AddTaskForm from './components/AddTaskForm';


library.add(fas)
function App(props) {
  const taskList = props.tasks?.map((task) => (
    <TodoItem 
        id={task.id} 
        name={task.name} 
        completed={task.completed} 
        key={task.id} 
        />
    ));

  return (
      <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
          <AddTaskForm placeholder="New task here" button="Add task"/>

          <section>
              <h1 className="text-xl font-bold my-2">To do</h1>
              <ul>
                  {taskList}
              </ul>
          </section>
      </main>
  );
}

export default App;
