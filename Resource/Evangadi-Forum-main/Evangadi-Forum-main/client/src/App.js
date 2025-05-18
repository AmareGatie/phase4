import React from "react";
import Header from "./component/pages/shared/Header";
import LoginPage from "./component/pages/login/LoginPage";
import { Routes, Route } from "react-router-dom";
import Shared from "./component/pages/shared/shared";
import QuestionPage from "./component/pages/home/Questionpage"
import AskQuestion from "./component/pages/home/AskQuestion"
import QuestionDetail from "./component/pages/questionDetail/QuestionDetail";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Shared />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="all-questions" element={<QuestionPage/>}/>
          <Route path="ask-question" element={<AskQuestion/>}/>
          <Route path="question-detail" element={<QuestionDetail/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
