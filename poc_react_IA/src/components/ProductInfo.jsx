import React from 'react'
import { useParams } from 'react-router-dom'
import './ProductInfo.css'
import AR from './AR'

const ProductInfo = () => {
    const { id } = useParams()

    const product = JSON.parse(id)

    const styles = {
        container: {
          fontFamily: 'Arial, sans-serif',
          maxWidth: '500px',
          margin: '0 auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        header: {
          fontSize: '24px',
          marginBottom: '10px',
        },
        listItem: {
          marginBottom: '5px',
        },
        subList: {
          listStyleType: 'none',
          paddingLeft: '15px',
          marginBottom: '10px',
        },
      };
    
      return (
        <div style={styles.container}>
          <h1 style={styles.header}>{product.Nome}</h1>
        <p>Marca: {product.Marca}</p>
        <p>Sistema Operacional: {product["Sistema Operacional"]}</p>
        <p>Tela:</p>
        <ul>
          <li>Tamanho: {product.Tela.Tamanho}</li>
          <li>Resolução: {product.Tela.Resolução}</li>
          <li>Tecnologia: {product.Tela.Tecnologia}</li>
        </ul>
        <p>Processador: {product.Processador}</p>
        <p>Memória:</p>
        <ul>
          <li>Ram: {product.Memória.Ram} GB</li>
          <li>Armazenamento: {product.Memória.Armazenamento} GB</li>
        </ul>
        <p>Câmera:</p>
        <ul>
          <li>Quantidade frontal: {product.Câmera["Quantidade frontal"]}</li>
          <li>Megapixel de cada frontal: {product.Câmera["Megapixel de cada frontal"]}</li>
          <li>Quantidade Traseiro: {product.Câmera["Quantidade Traseiro"]}</li>
          <li>Megapixel de cada traseira: {product.Câmera["Megapixel de cada traseira"].join(", ")}</li>
        </ul>
        <p>Bateria: {product["Bateria em MaH"]} mAh</p>
        <p>Conectividade: {product.Conectividade}</p>
        <p>Valor em Real: R${product["Valor em Real"]}</p>
        <p>Dimensões em Metros:</p>
        <ul>
          <li>Altura: {product["Dimensões em Metros"].Altura} m</li>
          <li>Largura: {product["Dimensões em Metros"].Largura} m</li>
          <li>Espessura: {product["Dimensões em Metros"].Espessura} m</li>
        </ul>
      </div>
    );
    
}

export default ProductInfo