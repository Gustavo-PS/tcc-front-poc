import React from 'react'
import { useContext } from 'react'
import { QuizContext } from '../context/quiz'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './SaibaMais.css'
import img from '../img/back-arrow-white.png'
import saibaMais1 from '../img/saibaMais/SaibaMais1.png'
import saibaMais2 from '../img/saibaMais/SaibaMais2.png'
import saibaMais3 from '../img/saibaMais/SaibaMais3.png'
import saibaMais4 from '../img/saibaMais/SaibaMais4.png'

const data = [
    {
        "description": "É só responder algumas perguntas sobre o que você precisa num celular...",
        "image": saibaMais1,
    },
    {
        "description": "Com base nas respostas, nossa IA encontrará os modelos que melhorar te antenderão",
        "image": saibaMais2,
    },
    {
        "description": "Ao selecionar um modelo, você pode ver suas especificações e interagir com seu modelo 3D",
        "image": saibaMais3,
    },
    {
        "description": "Por fim, você pode comparar o modelo 3D em tamanho real com objetos como cartão de crédito, moeda ou caneta",
        "image": saibaMais4,
    }
]

const SaibaMais = () => {

    const [progress, setProgress] = useState(0);

    return (
        <div className='home'>
            <div>
            {progress > 0 ? (
                    <img id='back-arrow' onClick={() => setProgress(progress - 1)} src={img}></img>
                ) : (
                    <Link to={'/quiz'}>
                        <img id='back-arrow' onClick={() => setProgress(progress - 1)} src={img}></img>
                    </Link>
                )}
                
                <h4 id='description'>{data[progress].description}</h4>
            </div>
            <div className='img_saibamais'>
                <img className='img_description' src={data[progress].image}></img>
            </div>

            <div id='btn'>
                {progress < data.length - 1 ? (
                    <button className='btnSecondary' onClick={() => setProgress(progress + 1)}> Entendi </button>
                ) : (
                    <Link to={'/quiz'}>
                        <button className='btnSecondary' onClick={() => setProgress(progress + 1)}> Entendi </button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default SaibaMais
