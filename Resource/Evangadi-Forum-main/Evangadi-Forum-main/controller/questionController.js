//import db-connection
const dbConnection = require("../db/database.js");
const { StatusCodes } = require("http-status-codes"); // status code

//ask question controller
async function askQuestion(req, res) {
  //get user_id and username from req.user
  const { username, user_id } = req.user;
  //get question and description from req.body
  const { question, description } = req.body;

  //check if question and description is empty
  if (!question || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide full information" });
  }
  //insert question into question table
  try {
    await dbConnection.query(
      "INSERT INTO question(user_id,question,description) VALUES (?,?,?)",
      [user_id, question, description]
    );
    //send success message
    return res
      .status(StatusCodes.OK)
      .json({ success: "ask question successful.", username });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong on the server." });
  }
}

//get all-questions controller
async function getAllQuestions(req, res) {
  //get all questions from question table
  try {
    const query =
      "SELECT question.*, users.username, users.user_id FROM question INNER JOIN users ON question.user_id = users.user_id ORDER BY question.question DESC";
    const [results] = await dbConnection.query(query);
    // Process the results here, e.g., send them as a JSON response
    return res.status(StatusCodes.OK).json(results);
  } catch (error) {
    // Handle any errors that may occur during the query
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//question detail controller
async function questionDetail(req, res) {

  try {
     //get question_id from req.query
    const { question_id } = req.query;
    //get question details from question table
    const query =
      "SELECT question_id,question, description FROM question WHERE question_id = ?";
    const [results] = await dbConnection.query(query, [question_id]);

    // Check if there are any results
    if (results.length > 0) {
      return res.status(StatusCodes.OK).json(results); 
    } else {
      return res.status(404).json({ error: "Question not found" });
    }
  } catch (error) {
    // Handle any errors that may occur during the query
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
//export controllers
module.exports = { askQuestion, getAllQuestions, questionDetail };
