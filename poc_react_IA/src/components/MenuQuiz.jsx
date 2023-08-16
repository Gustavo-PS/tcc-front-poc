
import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import { useState, useEffect } from "react";

import './MenuQuiz.css';

import StartQuiz from "./StartQuiz";
import Questions from "./Questions";
import Final from "./Final";

const MenuQuiz = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const [token, setToken] = useState([])

  useEffect(() => {
    //authToken
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("access-token", "");

    var raw = JSON.stringify({
      "password": "poc-tcc-api"
    });

    fetch("https://tcc-ec10-2023.azurewebsites.net/api/v1/login", {
    //fetch("http://localhost:6003/api/v1/login", {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(data => setToken(data.token))
      .catch(error => console.log('error', error));

    console.log(token)

    dispatch({
      type: "SET_TOKEN",
      payload: { token }
    })
  }, [token])


  if (token == null) {
    return (
      <div className='Chat'>
        <h2>loading...</h2>
      </div>
    )
  } else {
    return (
      <div className="menuQuiz">
        {quizState.gameStage === "Start" && <StartQuiz />}
        {quizState.gameStage === "Playing" && <Questions />}
        {quizState.gameStage === "End" && <Final />}
      </div>
    )

  }
}

export default MenuQuiz