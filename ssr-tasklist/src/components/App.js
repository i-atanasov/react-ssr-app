import React from 'react';
//import ReactDOM from 'react-dom';

import RenderTasks from './RenderTasks';



class App extends React.Component {
  state = { tasks: [] };
  
  componentDidMount() {
    fetch('https://api.jsonbin.io/v3/b/6304b4b65c146d63ca7bd581', { 
        headers: { 
          "Content-Type":	"application/json",
          "X-Access-Key": "6304b5fda1610e63860b814f"
        }
    }).then((res) => res.json())
    .then(tasksList => {
        console.log(tasksList.record.tasks)
        this.setState({ tasks: tasksList.record.tasks });
    });
  
  }
  render() {
    return (
      <div>
          <h1>FT Onboarding</h1> 
          <RenderTasks tasks={this.state.tasks}/>     
        </div>
      )
    }
}

export default App;
