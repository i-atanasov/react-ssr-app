
import AWS from 'aws-sdk';
import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';

class DynamoDBHangler {
  constructor() {
    this.dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-2' });
    this.tableName = 'tasklist'
  }

  getTasks = async () => {
    var params = {
      TableName: this.tableName
    };

    try {
      let result = await this.dynamodb
        .scan(params)
        .promise();
      return result;
    }
    catch (error) {
      throw new ErrorResponse('Can\'t get data', 500)
    }
  }

  addTask = async (formValues) => {
    const { topic, results, duration, completed } = formValues;
    
    this.dynamodb.put({
      TableName: this.tableName,
      Item: {
        id: Number(Date.now()),
        topic: topic || "no topic",
        results: results || "no expected result",
        duration: Number(duration) || 0,
        completed: completed
      }
    }, (err) => console.log(err))
    this.getTasks()
  }

  deleteTask = async (id) => {
    try {
      await this.dynamodb.send(new DeleteItemCommand({
        TableName: this.tableName,
        Item: {
          id: id
        }
      })
      )
      console.log('deleted')
    } catch (err) {
      console.log("Error", err);
    }
  }

  updateTask = async (formValues) => {
    const { topic, results, duration, completed } = formValues;

    try {
      this.dynamodb.put({
        TableName: this.tableName,
        Item: {
          id: Number(Date.now()),
          topic: topic || "no topic",
          results: results || "no expected result",
          duration: Number(duration) || 0,
          completed: completed
        }
      })
    } catch (err) {
      console.log('Check input', err)
    }
  }
}

const DynamoDBInstance = new DynamoDBHangler();

Object.freeze(DynamoDBInstance);
export default DynamoDBInstance;