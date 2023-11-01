import React, { useContext, useState, useEffect } from 'react';
import ReactLoading from "react-loading";
import backArrow from '../img/back-arrow.png'
import Load from '../img/cube.gif'
import { QuizContext } from '../context/quiz';

import "./Loading.css"

const GlbLoading = () => {
    const [quizState, dispatch] = useContext(QuizContext);

    return (

        <div className='quizContainer'>
            <div className='loadContainer'>
                <div className='loadingContainer'>
                    <div className='loading'>
                        <img src={Load}></img>
                        {/* <ReactLoading type="bubbles" color="#47CA3C"
                        height={150} width={100} /> */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default GlbLoading