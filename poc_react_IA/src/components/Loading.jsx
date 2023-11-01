import React, { useContext, useState, useEffect } from 'react';
import ReactLoading from "react-loading";
import backArrow from '../img/back-arrow.png'
import Load from '../img/cube.gif'
import { QuizContext } from '../context/quiz';

import "./Loading.css"

const Loading = () => {
    const [quizState, dispatch] = useContext(QuizContext);

    return (
        <div className='quizContainer'>
            <div id='question-container'>
                <img id='back-arrow' src={backArrow} onClick={() => {
                    dispatch({ type: "NEW_GAME" })
                }}></img>
                <h2 id='question-text'>Aguarde por favor, Estamos analisando suas respostas para trazer os melhores resultados</h2>
                <div id='progress-bar'>
                </div>
            </div>
            <div className='loadingContainer'>
                <div className='loading'>
                    <img src={Load}></img>
                    {/* <ReactLoading type="bubbles" color="#47CA3C"
                        height={150} width={100} /> */}
                </div>
            </div>
        </div>

    )
}

export default Loading