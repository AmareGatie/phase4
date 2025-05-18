import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../../../context/stateProvider";
import axios from "../../../axios";

function PostAnswer() {
  const [{ questionData }, dispatch] = useStateValue();
  const [answer, setAnswer] = useState("");
  const question_id = questionData.question_id;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswer(value);
  };
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/api/ansewrs/answer-the-question",
        { question_id, answer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.status === 201) {
        dispatch({
          type: "POST_ANSWER_SUCCESS",
        });
        console.log("Posting answer successful");
        setAnswer(""); // Clear the input field
      } else {
        console.error("Posting answer failed with status code:", response.status);
      }
    } catch (error) {
      console.error("Error on posting:", error);
    }
  };

  return (
    <div>
      <div className="m-auto my-10">
        <div className="mx-auto mt-4 p-4 bg-white rounded shadow-lg text-center shadow-slate-400">
          <h1 className="text-2xl font-semibold my-4">Answer The Top Question</h1>
          <Link to="/all-questions">
            <p className="mb-2 text-xs font-light">Go to Question page</p>
          </Link>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <textarea
                id="description"
                name="description"
                placeholder="Your Answer ..."
                value={answer}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline h-48"
              />
            </div>

            <button
              type="submit"
              className="py-2 flex left-0 text-sm cursor-pointer px-10 md:px-20 mx-3 bg-blue-600 rounded text-white"
            >
              Post your Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostAnswer;

