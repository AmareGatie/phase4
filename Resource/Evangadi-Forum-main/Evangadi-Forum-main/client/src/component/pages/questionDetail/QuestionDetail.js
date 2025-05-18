import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useStateValue } from "../../../context/stateProvider";
import Answers from "./answers/Answers";
import PostAnswer from "./postAnswer/PostAnswer";

function QuestionDetail() {
  const [{ username, questionData,postAnswerSuccess }, dispatch] = useStateValue();
  const [detail, setDetail] = useState();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const questionDetail = async () => {
      try {
        const question_id = questionData.question_id;
        // console.log(question_id);
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/questions/question-detail", {
          params: {
            question_id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setDetail(response.data);
          setIsLoading(false); // Data is fetched, set loading to false
        } else {
          console.log("Cannot get data!!!");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    questionDetail();
  }, [postAnswerSuccess]); 

  console.log(detail);
  return (
    <div className=" w-full flex justify-center">
      <div className="  w-9/12  my-10">
      <div className="  w-full mx-auto">
        <p className=" text-xl font-bold my-1">Question</p>
        {isLoading ? (
            <p>Loading...</p>
          ) : (
            detail.map((items, i) => (
              <div className="border-b-2 my-2 " key={i}>
                <p className="text-lg font-medium">{items.question}</p>
                <p className="mb-2">{items.description}</p>
              </div>
            ))
          )}
      </div>
      <div>
        <Answers/>
        <PostAnswer/>
      </div>
      
      </div>
    </div>
  );
}

export default QuestionDetail;
