import React from 'react'

import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import "./Questions.css"
import Options from './Options'

const Questions = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const currentQuestion = quizState.questions[quizState.currentQuestion]

  const onSelectOption = (option, options, question) => {

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
    <div id='question'>
      <p id='question-index'>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</p>
      <h2 id='question-text'>{currentQuestion.question}</h2>
      <div id='options-container'>
        {currentQuestion.options.map((option) => (
          <Options
            option={option}
            key={option}
            selectOption={() => onSelectOption(option, currentQuestion.options, currentQuestion.question)}
          ></Options>
        ))}
      </div>
      {quizState.answerSelected && (
        <button onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>Continuar</button>
      )}
    </div>
  )
}

export default Questions