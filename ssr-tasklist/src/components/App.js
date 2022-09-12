import React from 'react';
require('dotenv').config();
var AWS = require('aws-sdk');

//import RenderTasks from './RenderTasks';


class App extends React.Component {
  state = { tasks: [] };

  componentDidMount() {

    const DynamoDBConfig = {
      apiVersion: 'latest',
      accessKeyId: process.env.AWS_ACCESS_KEY,
      accessSecretKey: process.env.AWS_SECRET_KEY,
      region: "eu-west-2"
    }
    
    AWS.config.update(DynamoDBConfig);
    
    //AWS.config.update({region: 'eu-west-2'});
    
    var dynamodb = new AWS.DynamoDB();
    var params = {
      TableName: "tasklist"
    };

    dynamodb.query(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Items);
      }
    });
    // DynamoDB data fetch
    // async function getTasks(){
    //   try {
    //       var params = {
    //           //KeyConditionExpression: 'id = :id',
    //           // ExpressionAttributeValues: {
    //           //     ':topic': {'S': ''}
    //           // },
    //           TableName: 'tasklist'
    //       };
    //       var result = await dynamodb.query(params).promise()
    //       console.log(JSON.stringify(result))
    //   } catch (error) {
    //       console.error(error);
  //   }
  // }
  // getTasks()

    // JSON bin data fetch
    // fetch('https://api.jsonbin.io/v3/b/6304b4b65c146d63ca7bd581', { 
    //     headers: { 
    //       "Content-Type":	"application/json",
    //       "X-Access-Key": "6304b5fda1610e63860b814f"
    //     }
    // }).then((res) => res.json())
    // .then(tasksList => {
    //     console.log(tasksList.record.tasks)
    //     this.setState({ tasks: tasksList.record.tasks });
    // });
  
  }
  render() {
    return (
      <div>
          <h1>FT Onboarding</h1> 
          {/*<RenderTasks tasks={this.state.tasks}/>   */}
        </div>
      )
    }
}

export default App;
