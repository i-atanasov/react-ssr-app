import AWS from 'aws-sdk';
//require('dotenv').config();

class DynamoDBHandler {
  
  constructor() {
    this.dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-2' });
    this.tableName = 'tasklist'
  }

  // static createInstance() {
  //   if (!this.#hasInstance()) {
  //     this.dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-2' });
  //   } 
  // }

  // #hasInstance() {
  //   return !!this.dynamodb
  // }

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
    
    await this.dynamodb.put({
      TableName: this.tableName,
      Item: {
        id: Number(Date.now()),
        topic: topic || "no topic",
        results: results || "no expected result",
        duration: Number(duration) || 0,
        completed: completed
      }
    }, (err) => console.log(err)).promise();
  }

  deleteTask = (id) => {
      const params = {
        TableName: this.tableName,
        Key: {
          id: Number(id)
        }
      }

      this.dynamodb.delete(params, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
      });
  }

  updateTask = async (formValues) => {
    const { id, topic, results, duration, completed } = formValues;
    const params = {
      TableName: this.tableName,
      Item: {
        id: id,
        topic: topic || "no topic",
        results: results || "no expected result",
        duration: Number(duration) || 0,
        completed: completed
      },
    }
  
     await this.dynamodb.put(params, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
      }).promise();
    }
  }

const DynamoDBInstance = new DynamoDBHandler();

Object.freeze(DynamoDBInstance);
export default DynamoDBInstance;