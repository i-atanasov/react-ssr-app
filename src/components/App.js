import React, { useState, useEffect } from "react";

import RenderTasks from "./RenderTasks";

const App = () => {
  const [tasks, setTask] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetch('http://localhost:3080/tasks')
        .then(res => { return res.json() })

      setTask(data.Items)
    }

    getTasks();

  })


  // JSON bin data fetch
  // fetch('https://api.jsonbin.io/v3/b/6304b4b65c146d63ca7bd581', { 
  //     headers: { 
  //       "Content-Type":	"application/json",
  //       "X-Access-Key": "6304b5fda1610e63860b814f"
  //     }
  // }).then((res) => res.json())
  // .then(tasksList => {
  //     console.log(tasksList.record.tasks, "log tasks")
  //     this.setState({ tasks: tasksList.record.tasks });
  // });

  return (
    <div>
      <h1>FT Onboarding</h1>
      <RenderTasks tasks={tasks} />
    </div>
  );
}

export default App;