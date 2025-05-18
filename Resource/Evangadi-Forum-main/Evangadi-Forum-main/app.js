//import express 
const express = require("express");
//import db connection
const dbConnection = require("./db/database");
//import user route
const userRoute = require("./api/user/userRoute");
//import question route
const questionRoute = require('./api/question/questionRoute');
//import answer route
const ansewrRoute = require('./api/answer/answer')
//import cors
const cors = require("cors");
//import http-status-codes
const { StatusCodes } = require("http-status-codes");
//create a port
const port = process.env.PORT;

//create an app
const app = express();
app.use(cors({ origin: true })); // allow all origins
app.use(express.json()); // parse json

app.use("/api/user", userRoute); // user route
app.use("/api/questions", questionRoute); // question route
app.use("/api/ansewrs", ansewrRoute); // answer route

// create a function to start the server
async function start() {
  try {
    //check db connection
    const result = await dbConnection.execute("select 'test'");
    //listen to the port
    app.listen(port);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}
//start the server
start();
