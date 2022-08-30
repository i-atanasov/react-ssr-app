
import express from "express";
import fs from 'fs';
import path from "path";
import React from "react";
import { ReactDOM } from "react";
import * as ReactDOMServer from 'react-dom/server';

import App from "../src/components/App";

const port = 3080;
const app = express();
app.use('^/$', (req, res, next) => {
    fs.readFile(path.resolve('./build/index.html', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('There was and error')
        }  
        return res.send(data.replace("<div id='root'></div>", `<div id='root'>${ReactDOMServer.renderToString(<App />)}</div>`))

    }))
})

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(port, (console.log(`App launched at port ${port}`)))

app.use('^/$', (req, res, next) => {
    
})
