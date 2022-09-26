import React, { useState, useEffect } from "react";

import RenderTasks from "./RenderTasks";
import TaskForm from "./TaskForm";

const App = () => {
  const [tasks, setTask] = useState([])

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

  return (
    <div className="ui container">
      <h1 >Add Task</h1>
      <TaskForm />
      <h1>FT Onboarding</h1>
      <RenderTasks tasks={tasks} />
    </div>
  );
}

export default App;