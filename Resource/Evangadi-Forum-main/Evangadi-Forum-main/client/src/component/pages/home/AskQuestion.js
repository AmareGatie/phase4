import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";

function QuestionForm() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    question: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      
      // Assuming formData contains your form data
      const response = await axios.post("/api/questions/ask-questions", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response);
  
      if (response.status === 200) {
        navigate("/all-questions")
        console.log("Question asking successful");

      } else {
        navigate("/");
        console.log("Question asking failed with status code:", response.status);

      }
    } catch (error) {
      console.error("Error on asking:", error);
      navigate("/");
    }
  };
  

  return (
    <div>
      <div className="w-9/12 m-auto my-10 ">
        <div className="flex justify-around my-10">
          <div>
            <p className="text-2xl font-medium mx-5 my-2">
              Steps to write a good question
            </p>
            <ul>
              <li className="list-disc">
                Summerize your problem in a one-line title.
              </li>
              <li className="list-disc">
                Describe your problem in mode detail.
              </li>
              <li className="list-disc">
                Describe what you tried and what you expected to happen.
              </li>
              <li className="list-disc">
                {" "}
                Review your question and post it to the site.
              </li>
            </ul>
          </div>
        </div>
        <div className=" mx-auto mt-8 p-6 bg-white rounded shadow-md text-center">
          <h1 className="text-2xl font-semibold mb-2">Ask a Question</h1>
          <Link to={"/all-questions"}>
            <p className="mb-2 text-xs font-light">Go to Question page</p>
          </Link>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="question"
                name="question"
                placeholder="Title"
                value={formData.question}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <textarea
                id="description"
                name="description"
                placeholder="Question Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              className="py-2 flex left-0 text-sm cursor-pointer px-10 md:px-20 mx-3 bg-blue-600 rounded text-white"
            >
              Ask Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;
