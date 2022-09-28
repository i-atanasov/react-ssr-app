import React, { useState, useEffect } from "react";

import RenderTasks from "./RenderTasks";
import TaskForm from "./TaskForm";

const App = () => {
  const [tasks, setTasks] = useState([])
  const [initialValues, setInitialValues] = useState([])
  const [update, hasUpdated] = useState([0])

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetch('http://localhost:3080/tasks', { method: 'GET' })
        .then(res => {
          if (!res.ok) {
            throw Error(res.statusText)
          } else {
            return res.json()
          }
        })
        .catch(error => {
          document.querySelector("#root").parentElement.innerHTML = `Error: ${error}`;
          console.error('There was an error!', error);
        })

      setTasks(data.Items)
    }

    getTasks()
      .catch(console.error);
  }, [update]);

  const handleEdit = (id) => {
    const taskEdit = tasks.filter(task => task.id == id)
    return setInitialValues(taskEdit[0])
  }

  return (
      <div className="ui container">
        <h1 >Add Task</h1>
        <TaskForm hasUpdated={hasUpdated} initialValues={initialValues} setInitialValues={setInitialValues} />
        <h1>FT Onboarding</h1>
        <RenderTasks tasks={tasks} hasUpdated={hasUpdated} handleEdit={handleEdit}/>
      </div>
  );
}

export default App;