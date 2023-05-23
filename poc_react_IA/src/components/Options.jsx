import React from 'react'

import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import "./Options.css"

const Options = ({ option, selectOption }) => {
    const [quizState, dispatch] = useContext(QuizContext)

    return (
        <div onClick={() => selectOption()}
            className={`option ${quizState.answerSelected==option ? "selected" : ""}`}>
        <p>{option}</p>
        </div>
    )
}

export default Options