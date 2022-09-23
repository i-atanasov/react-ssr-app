import { Form, Field } from 'react-final-form'

function TaskForm(props) {
    const renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? "error" : ""}`;
        return (
          <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off" />
          </div>
        );
      };
    
     
      const onSubmit = (formValues) => {
        console.log(formValues)
      };
     
      return (
        <Form
          // prep for edit option
          //initialValues={props.initialValues}
          onSubmit={onSubmit}
          validate={(formValues) => {
            const errors = {};
     
            if (!formValues.topic) {
              errors.title = "You must enter a topic";
            }
     
            return errors;
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="ui form error">
                <div className="ui container">
                    {/* <h3>{props.topic}</h3> */}
                    <Field name="topic" component={renderInput} label="Enter topic:" />
                    <Field
                        name="results"
                        component={renderInput}
                        label="Expected results:"
                    />
                    <Field name="duration" component={renderInput} label="Duration (days):" />
                    <div className="ui toggle checkbox">
                        <Field
                            name="completed"
                            component="input"
                            type="checkbox"
                            defaultValue={false}
                            className=""
                        />
                        <label className="label" htmlFor="completed">
                            Completed
                        </label> 
                    </div>
                    {/* <Field name="details" component={renderTextArea} label="Deteils:" /> */}
    
                <button className="ui right floated button primary">Submit</button>
              </div>
            </form>
          )}
        />
      );
    };
     
export default TaskForm;