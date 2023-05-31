import React from 'react'
import { useParams } from 'react-router-dom'
import './ProductInfo.css'
import AR from './AR'

const ProductInfo = () => {
    const { id } = useParams()

    const jsonProduct = JSON.parse(id)

    return (
        <div className='productContainer'>
            <div className='modelSample'>
                <AR></AR>
            </div>
            <div className='device_info'>
                <div className='spec'>
                    <a>Modelo:</a>
                    <a>{jsonProduct.Nome}</a>
                </div>
                <div className='spec'>
                    <a>Marca:</a>
                    <a>{jsonProduct.Marca}</a>
                </div>
                <div className='spec'>
                    <a>Tamanho da tela:</a>
                    <a> {jsonProduct["Tamanho da Tela"]}</a>
                </div>
                <div className='spec'>
                    <a>Resolução da tela:</a>
                    <a>{jsonProduct["Resolução da Tela"]}</a>
                </div>
                <div className='spec'>
                    <a>Dimensões:</a>
                    <a>{jsonProduct["Dimensões do Aparelho"]}</a>
                </div>
                <div className='spec'>
                    <a>Memória RAM:</a>
                    <a>{jsonProduct["Memória RAM"]}</a>
                </div>
                <div className='spec'>
                    <a>Armazenamento:</a>
                    <a>{jsonProduct.Armazenamento}</a>
                </div>
                <div className='spec'>
                    <a>Processador:</a>
                    <a>{jsonProduct.Processador}</a>
                </div>
                <div className='spec'>
                    <a>Câmera</a>
                    <a>{jsonProduct.Câmera}</a>
                </div>
            </div>
        </div >
    )
}

export default ProductInfo