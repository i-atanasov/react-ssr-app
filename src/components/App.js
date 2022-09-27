import React, { useState, useEffect } from "react";

import RenderTasks from "./RenderTasks";
import TaskForm from "./TaskForm";

const App = () => {
  const [tasks, setTask] = useState([])
  const [initialValues, setInitialValues] = useState([])

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

      setTask(data.Items)
    }

    getTasks()
      .catch(console.error);
  }, []);

  const handleEdit = (id) => {
    const taskEdit = tasks.filter(task => task.id == id)
    return setInitialValues(taskEdit[0])
  }

  return (
      <div className="ui container">
        <h1 >Add Task</h1>
        <TaskForm initialValues={initialValues}/>
        <h1>FT Onboarding</h1>
        <RenderTasks tasks={tasks} handleEdit={handleEdit}/>
      </div>
  );
}

export default App;