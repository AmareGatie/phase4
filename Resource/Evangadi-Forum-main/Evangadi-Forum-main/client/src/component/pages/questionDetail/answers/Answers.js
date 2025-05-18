import React, { useEffect, useState } from "react";
import { useStateValue } from "../../../../context/stateProvider";
import axios from "../../../axios";
import avator from "../../../../asset/2263539.png";

function Answers() {
  const [answers, setAnswers] = useState([]);
//   const [updater, setUpdater] = useState(0);
  const [{ questionData ,postAnswerSuccess}, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  //   console.log(questionData.question_id)
  useEffect(() => {
    const getAnswer = async () => {
      try {
        const question_id = questionData.question_id;
        const token = localStorage.getItem("token");

        const response = await axios.get("/api/ansewrs/get-the-answer", {
          params: {
            question_id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setAnswers(response.data);  
          setIsLoading(false);
        } else {
          console.log("Cannot get answer!!!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAnswer();
  }, [postAnswerSuccess]); // i need this part update when answer change?
//   console.log(updater);

  return (
    <div className="list-container">
     
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          answers.map((item, i) => (
            <div className="border-b-2 my-2 flex items-center" key={i}>
              <div>
                <img className="w-24 " src={avator} />
                <p>{item.username}</p>
              </div>
              <div className="mx-6">
                <p>{item.answer}</p>
              </div>
            </div>
          ))
        )}
     
    </div>
  );
}

export default Answers;
