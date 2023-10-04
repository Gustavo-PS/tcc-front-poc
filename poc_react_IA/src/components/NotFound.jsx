import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import './MenuQuiz.css';

import StartQuiz from "./StartQuiz";
import Questions from "./Questions";
import Final from "./Final";

const NotFound = () => {


    useEffect(() => {

    }, [])


    return (
        <div className='quizContainer'>
            <div id='question-container'>
                <h2 id='question-text'>Ops, algo deu errado</h2>
            </div>
            <div className="product-list">
            </div>
            <div id='btn-container'>
                <Link to={'/quiz'}>
                    <button className='btnPrimary'>Recarregar</button>
                </Link>
            </div>
        </div>

    )

}


export default NotFound