import React from 'react'

const RenderTasks = (props) => {
    const tasks = props.tasks;
    const renderList = () => {
        return tasks.map(currentTask=> {
         let done = currentTask.completed ? 'lightgreen' : 'tomato';
      
        return (
            <div key={currentTask.id} className="listItem" style={{ "borderRight": `5px solid ${done}` }}>
                <div className="">
                    <div className="">
                        {currentTask.type}
                    </div> 
                    <div className="">
                        Topic {currentTask.topic}  <br/>
                        Apr. duration: {currentTask.duration}<br/>
                    </div>
                    <div className="">
                        Resourses: To be rendered  <br/>
                    </div>
                    <div className="">
                        Goal: {currentTask.results}  <br/>
                    </div>
                    <br/>
                    <hr></hr>
                    </div>
                </div>
        );
    });
};

return (
      <div>{renderList()}</div>
    )
}

export default RenderTasks;