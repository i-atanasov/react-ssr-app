
import AWS from 'aws-sdk';

class DynamoDBHangler {
  constructor() {
    this.dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-2' });
  }

  getTasks = async () => {
    var params = {
      TableName: 'tasklist'
    };
   
    try {  
      let result = await this.dynamodb
        .scan(params)
        .promise();
      //console.log(result)  
      return result;
    }
    catch (error) {
      throw new ErrorResponse('Can\'t get data', 500)
    }
  }

  // addTask = async () => {
    // dynamodb.put({
    //   TableName: tableName,
    //   Item: {
    //     id: id,
    //     topic: topic,
    //     duration: days,
    //     completed: false
    //   }
    // }, (err, data) => console.log("Success"))
  // }
  
  }

const DynamoDBInstance = new DynamoDBHangler();

Object.freeze(DynamoDBInstance);
export default DynamoDBInstance;