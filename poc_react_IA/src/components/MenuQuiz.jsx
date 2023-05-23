
import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import './MenuQuiz.css';

import StartQuiz from "./StartQuiz";
import Questions from "./Questions";
import Final from "./Final";

const MenuQuiz = () => {
    const [quizState, dispatch] = useContext(QuizContext)

    return (
        <div className="menuQuiz">
          {quizState.gameStage === "Start" && <StartQuiz />}
          {quizState.gameStage === "Playing" && <Questions />}
          {quizState.gameStage === "End" && <Final />}
        </div>
      )
  
}

export default MenuQuiz