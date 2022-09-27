import express from "express";
//import fs from 'fs';
import path from "path";
//import { env } from "process";
const cors = require('cors')
import * as ReactDOMServer from 'react-dom/server'
import React from 'react'

import DynamoDBInstance from "./aws";
//import App from "../components/App";

const port = 3080;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../', 'build')))
app.use(express.json())
app.use(cors())
app.get('/tasks', (req, res) => {
    //fs.readFile(path.resolve('build/index.html'), 'utf-8', (err, data) => {
        let tasks;
        (async () => {
            tasks = await DynamoDBInstance.getTasks();
            res
                .json(
                    tasks
                    )
                // .send(
                //     data.replace(
                //         "<div id='root'></div>",
                //         `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
                //     ))
            //console.log(tasks, "fetched by the server")
        })()
    })

app.post('/', (req, res) => {
    const formValues = req.body.formValues;
    (async () => {
        await DynamoDBInstance.addTask(formValues);
    })()
    if (!formValues) {
        return res.status(400).send({ request: 'failed' })
    }
    res.status(200).send({ request: 'successful' })
})

app.delete('/task/delete/:id/duration/:duration', (req, res) => {
    let {id, duration} = req.params
    // DynamoDBHandler.createInstance()
    DynamoDBInstance.deleteTask(id, duration);
})

app.post('/update', (req, res) => {
    const formValues = req.body.formValues;
    DynamoDBInstance.updateTask(formValues)
    if (!formValues) {
        return res.status(400).send({ request: 'failed' })
    }
    res.status(200).send({ request: '' })
})

app.listen(port, (console.log(`App launched at port ${port}`)))

