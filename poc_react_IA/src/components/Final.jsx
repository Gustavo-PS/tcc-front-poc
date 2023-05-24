import React, { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../context/quiz'
import { Link } from 'react-router-dom'
import "./Final.css"

const Final = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const token = quizState.token

  const str = quizState.profile;
  const prompt = str.split('');

  const [answer, setAnswer] = useState([])

  useEffect(() => {
    console.log(token)

    //reqPerfil
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("access-token", token);

    var raw = JSON.stringify({
      "respostas": prompt
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://app-api-tcc.azurewebsites.net/api/v1/mapeamento-perfil", requestOptions)
      .then(response => response.json())
      .then(data => setAnswer(data))
      .catch(error => console.log('error', error));

  }, [answer])

  function getProducts(perfil){
    dispatch({ type: "GET_PRODUCTS",
      payload: { perfil }})

    dispatch({ type: "NEW_GAME" })
  }

  if (answer.perfil == null) {
    return (
      <div className='Chat'>
        <h2>loading...</h2>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Fim</h2>
        <h2>Com base nas respotas, vimos que seu perfil é de um usuário {answer.perfil}</h2>
        <h2>Separamos aqui alguns modelos que melhor te atenderão:</h2>
        <Link to='/products'><button onClick={() => getProducts(answer.perfil)}>Vamos lá!</button></Link>
        <h2>Ou refaça o quiz:</h2>        
        <button onClick={() => dispatch({ type: "NEW_GAME" })}>Refazer</button>
      </div>
    )
  }
}

export default Final