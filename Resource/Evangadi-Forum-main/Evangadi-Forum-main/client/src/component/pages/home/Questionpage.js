// import axios 
import axios from "../../axios";
// import react and other necessary modules
import React, { useEffect, useState } from "react";
// import Link and useNavigate 
import { Link, useNavigate } from "react-router-dom";
// import useStateValue
import { useStateValue } from "../../../context/stateProvider";
// import ChevronRightIcon
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import avator image
import avator from "../../../asset/2263539.png";

// create a function Homepage
function Homepage() {
  const [{ username,  questionData }, dispatch] = useStateValue(); // Destructure the username from the state
  const [questions, setQuestions] = useState([]); // Create a state to store the questions

  const navigate = useNavigate(); // Create a navigate function to navigate to another page
  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage 
        const response = await axios({
          method: "get",
          url: "/api/questions/all-questions",
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        });

        if (response.status === 200) {
          setQuestions(response.data);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching all questions:", error);
        navigate("/");
      }
    };

    getAllQuestions();
  }, []);
// return the jsx
  return (
    <div>
      <div className="w-9/12 m-auto my-10">
        <div className="flex justify-between py-4">
          <Link to={"/ask-question"}>
            <button className=" text-sm cursor-pointer px-5 md:px-12 mx-2 py-2 bg-blue-600 rounded text-white">
              Ask Question
            </button>
          </Link>
          <p className=" text-2xl font-medium">Welcome: {username}</p>
        </div>
        <div>
          <p className=" py-2 text-lg font-medium border-b-2">Questions</p>
          {questions.map((items, i) => {
            return (
              <Link to={"/question-detail"}>
                <div
                  className=" flex justify-between border-b-2 font-medium"
                  onClick={() =>
                    dispatch({
                      type: "SET_QUESTION_DATA",
                      item: {
                        user_id: items.user_id,
                        question_id: items.question_id,
                      },
                    })
                  }
                >
                  <div className=" flex items-center">
                    <div className="text-center">
                      <img className="w-24 mx-auto" src={avator} />

                      <p className=" -mt-4 mb-6">{items.username}</p>
                    </div>
                    <div className="mx-6 items-center">
                      <p>{items.question}</p>
                    </div>
                  </div>
                  <div className="flex items-center "><ChevronRightIcon/></div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
// export Homepage
export default Homepage;
