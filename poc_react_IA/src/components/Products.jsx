import React, { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../context/quiz'
import Loading from './Loading'

import "./Products.css"

const Products = () => {
    const [quizState, dispatch] = useContext(QuizContext)
    const [productList, setProductList] = useState([])

    const token = quizState.token
    const perfil = quizState.perfil

    useEffect(() => {
        console.log(perfil)
        console.log(token)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("access-token", token);

        var raw = JSON.stringify({
            "perfil": perfil
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://app-api-tcc.azurewebsites.net/api/v1/chat", requestOptions)
            .then(response => response.json())
            .then(data => setProductList(data.chatResponse))
            .catch(error => console.log('error', error));

        console.log(productList)

    }, [])

    if (productList.length == 0) {
        return (
            <div className='Chat'>
                <Loading></Loading>
            </div>
        )
    } else {
        return (
            <div className='productList'>
                {productList.map((product, key) => (
                    <div className='product'>
                        <div className='info'>
                            <a>{product.Marca}</a>
                            <h3>{product.Nome}</h3>
                        </div>
                        <h1>GO!</h1>
                    </div>
                ))}
            </div>

        )
    }
}

export default Products