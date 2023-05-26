import React from 'react'
import { useParams } from 'react-router-dom'
import './ProductInfo.css'

const ProductInfo = () => {
    const { id } = useParams()

    const jsonProduct = JSON.parse(id)

    return (
        <div className='info'>
            <a>{jsonProduct.Nome}</a>
            <a>{jsonProduct.Marca}</a>
            <a>{jsonProduct["Tamanho da Tela"]}</a>
            <a>{jsonProduct["Resolução da Tela"]}</a>
            <a>{jsonProduct["Dimensões do Aparelho"]}</a>
            <a>{jsonProduct["Memória RAM"]}</a>
            <a>{jsonProduct.Armazenamento}</a>
            <a>{jsonProduct.Processador}</a>
            <a>{jsonProduct.Câmera}</a>
        </div>
    )
}

export default ProductInfo