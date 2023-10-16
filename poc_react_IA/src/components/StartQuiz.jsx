import React from 'react'
import { useContext } from 'react'
import { QuizContext } from '../context/quiz'
import img from '../img/Celulares_Home.png'
import { useEffect, useState } from "react";
import './StartQuiz.css'

const StartQuiz = () => {
    const [quizState, dispatch] = useContext(QuizContext)

    return (
        <div className='home'>
            <h1>Bem vindo!</h1>
            {/* <h4>Caso queira aprender a usar o assistente, clique em saiba mais</h4> */}
            <div>
                <img className='macbook_guy' src={img}></img>
            </div>
            <div id='btn'>
                {/* <button className='btnSecondary'> Saiba mais </button> */}
                <button className='btnPrimary' onClick={() => dispatch({ type: "CHANGE_STATE" })}> Iniciar </button>
            </div>
        </div>
    )
}

export default StartQuiz

