import React from 'react'

import { useContext, useState } from 'react'
import { QuizContext } from '../context/quiz'
import img from '../img/back-arrow.png'

import "./Questions.css"
import Options from './Options'

const Questions = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const currentQuestion = quizState.questions[quizState.currentQuestion]
  const [progress, setProgress] = useState(0);




  const onSelectOption = (option, options, question) => {

    console.log(progress)

    const positions = [];
    function findCharacterPositions(inputString, targetChar) {

      for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] === targetChar) {
          positions.push(i);
        }
      }

      return positions;
    }

    console.log(findCharacterPositions(quizState.profile, "$"))
    console.log(positions[quizState.currentQuestion])

    if (quizState.profile.length > quizState.currentQuestion) {
      quizState.profile = quizState.profile.substring(0, positions[quizState.currentQuestion])
    }

    dispatch({
      type: "CHECK_ANSWER",
      payload: { option, options, question }
    })
  }



  return (
    <div className='quizContainer'>
      <div id='question-container'>
        <img id='back-arrow' src={img} onClick={() => {
          dispatch({ type: "PREVIOUS_QUESTION" })
          setProgress(parseFloat((quizState.currentQuestion - 1) / quizState.questions.length) * 100)
        }}></img>
        <h2 id='question-text'>{currentQuestion.question}</h2>
        <p id='question-index'>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</p>
        <div id='progress-bar' style={{ width: `${progress}%` }}>
        </div>
      </div>
      <div id='options-container'>
        <div id='options'>
        {currentQuestion.options.map((option) => (
          <Options
            option={option}
            key={option}
            selectOption={() => onSelectOption(option, currentQuestion.options, currentQuestion.question)}
          ></Options>
        ))}
        </div>
      </div>
      <div id='btn-container'>
        {quizState.answerSelected ? (
          <button className='btnPrimary' onClick={() => {
            dispatch({ type: "CHANGE_QUESTION" })
            setProgress(parseFloat((quizState.currentQuestion + 1) / quizState.questions.length) * 100)
          }}>
            Continuar
          </button>
        ) : (
          <button id='btnDeactivated'>Continuar</button>
        )}
      </div>
    </div>
  )
}

export default Questions