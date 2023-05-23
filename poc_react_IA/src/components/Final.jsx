import React, { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import "./Final.css"

const Final = () => {
    const[quizState, dispatch] = useContext(QuizContext)
  return (
    <div>
        <h2>Fim</h2>
        <h2>{quizState.profile}</h2>
        <button onClick={() => dispatch({ type: "NEW_GAME"})}>Reiniciar</button>
    </div>
  )
}

export default Final