import React from 'react';
import { Link } from "react-router-dom";

const RenderTasks = (props) => {
    let tasks = props.tasks;

    const renderAdminButtons = (id) => {
        return (
            <div className="right floated content" style={{ "marginTop": "10px" }}>
                <Link className="ui inverted secondary button" to={`/books/edit/${id}`}>
                    <i className="ui edit icon"></i>Edit
                </Link>
                <Link className="ui inverted red button" to={`/books/delete/${id}`}>
                    <i className="ui delete icon"></i>Delete
                </Link>
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