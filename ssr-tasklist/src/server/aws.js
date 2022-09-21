
import AWS from 'aws-sdk';

class DynamoDBHangler {
  constructor() {
    this.dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-2' });
  }

  getTasks = async () => {
    try {
      var params = {
        TableName: 'tasklist'
      };

      var result = await this.dynamodb
        .scan(params)
        .promise();
      return result;
    }
    catch (error) {
      //throw new ErrorResponse('Can\'t get data', 500)
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





// const DynamoDBConfig = {
  //     region: "eu-west-2",
  //     credentials: {
  //         accessKeyId: "",
  //         accessSecretKey: "",
  //     },
  // }

  // AWS.config.update({region: 'eu-west-2'});
  // AWS.config.update(DynamoDBConfig);

  // AWS.config = new AWS.Config();
  // AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  // AWS.config.secretAccessKey = process.env.AWS_ACCESS_KEY_ID;

  // var params = { }
  // params.TableName = "tasklist";

  // var key = { id:42, duration: 3 }  ;
  // params.Key = key;
