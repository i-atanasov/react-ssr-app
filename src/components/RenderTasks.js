import React from 'react';

const RenderTasks = (props) => {
    let tasks = props.tasks;

    const editTask = (id) => {
        props.handleEdit(id)
    }
    
    const deleteTask = async (id) => {
        await fetch(`http://localhost:3080/task/delete/${id}`, { method: 'DELETE' })
            .then(response => {response.json();   
            })
            .then(props.hasUpdated([1]));
    }

    const renderAdminButtons = (id) => {
        return (
            <div className="right floated content" style={{ "marginTop": "10px" }}>
                <button className="ui inverted green button" onClick={() => editTask(id)}>
                    <i className="ui edit icon"></i>Edit
                </button>
                <button className="ui inverted red button" onClick={() => deleteTask(id)}>
                    <i className="ui delete icon"></i>Delete
                </button>
            </div>
        )
    }


    const renderList = () => {
        return tasks.map(currentTask => {
            let done = currentTask.completed ? 'lightgreen' : 'grey';
            let days = (currentTask.duration === 1)? 'day' : 'days';
            return (
                <div key={currentTask.id} className="ui relaxed container raised list segment" style={{ "borderRight": `5px solid ${done}` }}>
                    <div className="item">
                        <div>{renderAdminButtons(currentTask.id)}</div>
                        <div className="content">
                            <div>
                                {currentTask.type}
                            </div>

                            <div className="content" style={{ "margin": "20px" }}>
                                <h3>Topic: {currentTask.topic}</h3>  <br />
                                Apr. duration: {currentTask.duration} {days}<br />
                            </div>
                            <div className="content">
                                Results: {currentTask.results}  <br />
                            </div>
                            <br />  
                            <hr></hr>
                        </div>
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