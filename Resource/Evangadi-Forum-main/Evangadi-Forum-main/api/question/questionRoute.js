// import express router
const express = require('express');
// Initilize express router
const router = express.Router();
// Import the auth middleware
const auth = require('../../middleware/auth.js')
//import question controllers
const {askQuestion,getAllQuestions,questionDetail} = require('../../controller/questionController.js');


// Define the route to handle asking questions
router.post("/ask-questions",auth,askQuestion); //
router.get("/all-questions",auth, getAllQuestions)
router.get("/question-detail",auth,questionDetail) 

// Export the router
module.exports = router;  