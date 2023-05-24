import React from 'react'
import { useContext } from 'react'
import { QuizContext } from '../context/quiz'
import img from '../img/macbook_guy.png'
import { useEffect, useState } from "react";

import './StartQuiz.css'

const StartQuiz = () => {
    const [quizState, dispatch] = useContext(QuizContext)

    return (
        <div>
            <img className='macbook_guy' src={img}></img>
            <h1>Vamos achar seu aparelho ideal!</h1>
            <button onClick={() => dispatch({ type: "CHANGE_STATE" })}> Iniciar </button>
        </div>
    )
}

export default StartQuiz

