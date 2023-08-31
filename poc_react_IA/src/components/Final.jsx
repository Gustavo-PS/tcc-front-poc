import React, { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../context/quiz'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import "./Final.css"

const Final = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const token = quizState.token

  const prompt = quizState.profile;

  const [answer, setAnswer] = useState([])

  const modifiedPrompt = prompt.replaceAll('|', '\n').replaceAll('$', '');
  console.log(modifiedPrompt)

  function getProducts(perfil){
    dispatch({ type: "GET_PRODUCTS",
      payload: { perfil }})

    dispatch({ type: "NEW_GAME" })
  }

  if (prompt == null) {
    return (
      <Loading></Loading>
    )
  } else {
    return (
      <div className='profile'>
        <h3>Com base nas respotas, vimos que seu perfil é de um usuário:</h3>
        <h2>{modifiedPrompt}</h2>
        <a>Separamos aqui alguns modelos que melhor te atenderão:</a>
        <Link to='/products'><button onClick={() => getProducts(answer.perfil)}>Vamos lá!</button></Link>
        <h3>Ou refaça o quiz:</h3>        
        <button onClick={() => dispatch({ type: "NEW_GAME" })}>Refazer</button>
      </div>
    )
  }
}

export default Final