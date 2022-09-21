
import express from "express";
import fs from 'fs';
import path from "path";
//import { env } from "process";
const cors = require('cors')
import * as ReactDOMServer from 'react-dom/server'
import React from 'react'

import DynamoDBInstance from "./aws";
import App from "../components/App";

const port = 3080;
const app = express();

app.use(cors())
app.use('/tasks', (req, res, next) => {
    let tasks;
    //let tableName = 'tasklist';
    (async () => {
        tasks = await DynamoDBInstance.getTasks();
        //console.log(tasks, "fetched by the server")
    })()

    fs.readFile(path.resolve('build/index.html'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            // return res
            //     .status(500)
            //     .send('There was an error')
        }

        return res
            .json(tasks)
            .send(
                data.replace(
                    "<div id='root'></div>",
                    `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
                )
            )

    })
})

app.use(express.static(path.resolve(__dirname, '../../', 'build')))

app.listen(port, (console.log(`App launched at port ${port}`)))

