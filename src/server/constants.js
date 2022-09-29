require('dotenv').config();

//console.log(process.env)

export const DYNAMO_config = {
    AWS_DYNAMO_ACCESS_KEY_ID: process.env.AWS_DYNAMO_ACCESS_KEY_ID,
    AWS_DYNAMO_SECRET_ACCESS_KEY: process.env.AWS_DYNAMO_SECRET_ACCESS_KEY,
    AWS_DYNAMO_REGION: process.env.AWS_DYNAMO_REGION,
}