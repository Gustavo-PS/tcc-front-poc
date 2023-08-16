import React, { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../context/quiz'
import { Link } from 'react-router-dom'
import Loading from './Loading'
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

    fetch("https://tcc-ec10-2023.azurewebsites.net/api/v1/mapeamento-perfil", requestOptions)
    //fetch("http://localhost:6003/api/v1/mapeamento-perfil", requestOptions)
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
      <Loading></Loading>
    )
  } else {
    return (
      <div className='profile'>
        <h3>Com base nas respotas, vimos que seu perfil é de um usuário:</h3>
        <h2>{answer.perfil}</h2>
        <a>Separamos aqui alguns modelos que melhor te atenderão:</a>
        <Link to='/products'><button onClick={() => getProducts(answer.perfil)}>Vamos lá!</button></Link>
        <h3>Ou refaça o quiz:</h3>        
        <button onClick={() => dispatch({ type: "NEW_GAME" })}>Refazer</button>
      </div>
    )
  }
}

export default Final