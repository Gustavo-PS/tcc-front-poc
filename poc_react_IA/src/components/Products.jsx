import React, { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../context/quiz'
import Loading from './Loading'

import "./Products.css"
import { Link } from 'react-router-dom'

const mock = [
    {
        "Nome": "OnePlus 9",
        "Marca": "OnePlus",
        "Tamanho da Tela": "6.55 polegadas",
        "Resolução da Tela": "FHD+ (2400 x 1080 pixels)",
        "Dimensões do Aparelho": "160 x 74.2 x 8.7 mm",
        "Memória RAM": "8 GB",
        "Armazenamento": "128 GB",
        "Processador": "Qualcomm Snapdragon 888",
        "Câmera": "Câmera tripla de 48 MP + 50 MP + 2 MP"
    },
    {
        "Nome": "Samsung Galaxy A72",
        "Marca": "Samsung",
        "Tamanho da Tela": "6.7 polegadas",
        "Resolução da Tela": "FHD+ (2400 x 1080 pixels)",
        "Dimensões do Aparelho": "165 x 77.4 x 8.4 mm",
        "Memória RAM": "6 GB",
        "Armazenamento": "128 GB",
        "Processador": "Qualcomm Snapdragon 720G",
        "Câmera": "Câmera quádrupla de 64 MP + 12 MP + 8 MP + 5 MP"
    },
    {
        "Nome": "Google Pixel 5",
        "Marca": "Google",
        "Tamanho da Tela": "6.0 polegadas",
        "Resolução da Tela": "FHD+ (2340 x 1080 pixels)",
        "Dimensões do Aparelho": "144.7 x 70.4 x 8.0 mm",
        "Memória RAM": "8 GB",
        "Armazenamento": "128 GB",
        "Processador": "Qualcomm Snapdragon 765G",
        "Câmera": "Câmera dupla de 12.2 MP + 16 MP"
    },
    {
        "Nome": "Motorola Moto G Power (2021)",
        "Marca": "Motorola",
        "Tamanho da Tela": "6.6 polegadas",
        "Resolução da Tela": "HD+ (1600 x 720 pixels)",
        "Dimensões do Aparelho": "165.3 x 75.9 x 9.5 mm",
        "Memória RAM": "4 GB",
        "Armazenamento": "64 GB",
        "Processador": "Qualcomm Snapdragon 662",
        "Câmera": "Câmera tripla de 48 MP + 2 MP + 2 MP"
    },
    {
        "Nome": "Xiaomi Redmi Note 10 Pro",
        "Marca": "Xiaomi",
        "Tamanho da Tela": "6.67 polegadas",
        "Resolução da Tela": "FHD+ (2400 x 1080 pixels)",
        "Dimensões do Aparelho": "164 x 76.5 x 8.1 mm",
        "Memória RAM": "6 GB",
        "Armazenamento": "128 GB",
        "Processador": "Qualcomm Snapdragon 732G",
        "Câmera": "Câmera quádrupla de 64 MP + 8 MP + 5 MP + 2 MP"
    }
]

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
            //.then(data => setProductList(data.chatResponse))
            .then(data => setProductList(mock))
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
                    <Link to={`/product/info/${JSON.stringify(product)}`} >
                        <div className='product'>
                            <div className='info'>
                                <a>{product.Marca}</a>
                                <h3>{product.Nome}</h3>
                            </div>
                            <a>Detalhes</a>
                        </div>
                    </Link>
                ))}
            </div>

        )
    }
}

export default Products