import { Form, Field } from 'react-final-form'

function TaskForm(props) {
      const renderInput = ({ input, label }) => {
        //err menagement?
        const className = `field`;
        return (
          <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off" />
          </div>
        );
      };

      const updateParent = () => {
        setTimeout(() => {
          props.hasUpdated([1])
          props.setInitialValues({completed: false, duration: 0})
        }, 500)
        
      }
     
      const onSubmit = async (formValues) => {
        if (!formValues.id) {
          const res = await fetch('http://localhost:3080/', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              formValues
            })
          }).then(updateParent())
        } else {
          const res = await fetch(`http://localhost:3080/update`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              formValues
            })
          }).then(updateParent())
        }
      };
     
      return (
        <Form
          // prep for edit option
          initialValues={props.initialValues}
          onSubmit={onSubmit}
          //validation
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="ui form">
                <div className="ui container">
                    <h3>{props.topic}</h3>
                    <Field name="topic" component={renderInput} label="Enter topic:" />
                    <Field
                        name="results"
                        component={renderInput}
                        label="Expected results:"
                    />
                    <Field 
                        name="duration" 
                        component={renderInput} 
                        label="Duration (days):"
                        defaultValue={1}
                    />
                    <div className="ui toggle checkbox">
                        <Field
                            name="completed"
                            component="input"
                            type="checkbox"
                            defaultValue={false}
                            className=""
                        />
                        <label className="label" htmlFor="completed">
                            Completed?
                        </label> 
                    </div>
                    {/* <Field name="details" component={renderTextArea} label="Detаils:" /> */}
    
                <button className="ui right floated button primary">Submit</button>
                
              </div>
            </form>
          )}
        />
      );
    };
     
export default TaskForm;