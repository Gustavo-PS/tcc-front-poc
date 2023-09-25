import React from 'react'
import { useParams } from 'react-router-dom'
import './ProductInfo.css'
import { Link } from 'react-router-dom';
import AR from './AR'
import backArrow from '../img/back-arrow.png'
import expand from '../img/expand.png'

const ProductInfo = () => {
  const { id } = useParams()

  const product = JSON.parse(id)

  return (
    <div className='productContainer'>
      <Link to={'/quiz'} >
        <img id='back-arrow' src={backArrow}></img>
      </Link>

      <h2 className='phone-name'>{product.name}</h2>

      <div className='model'>
        <AR></AR>
        <Link to={'/ar'} >
          <img id='expand' src={expand}></img>
        </Link>
      </div>

      <div className='productSpecs'>
        <p className='key'>Marca</p> <p className='value'>{product.brand}</p>
        <p className='key'>Sistema Operacional</p> <p className='value'>{product.operational_system}</p>
        <p className='key'>Tela</p>
        <ul>
          <li className='key'>Tamanho</li> <li className='value'>{product.screen.size}</li>
          <li className='key'>Resolução</li> <li className='value'>{product.screen.resolution}</li>
          <li className='key'>Tecnologia</li> <li className='value'>{product.screen.technology}</li>
        </ul>
        <p className='key'>Processador</p> <p className='value'>{product.processor}</p>
        <p className='key'>Memória</p>
        <ul>
          <li className='key'>Ram:</li> <li className='value'>{product.memory.ram} GB</li>
          <li className='key'>Armazenamento</li> <li className='value'>{product.memory.storage} GB</li>
        </ul>
        <p className='key'>Câmera:</p>
        <ul>
          <li className='key'>Quantidade frontal</li> <li className='value'>{product.camera.front_amount}</li>
          <li className='key'>Megapixel de cada frontal</li> <li className='value'>{product.camera.front_megapixel}</li>
          <li className='key'>Quantidade Traseiro</li> <li className='value'>{product.camera.rear_amount}</li>
          <li className='key'>Megapixel de cada traseira</li> <li className='value'>{product.camera.rear_megapixel.join(", ")}</li>
        </ul>
        <p className='key'>Bateria</p> <p className='value'>{product.battery} mAh</p>
        <p className='key'>Conectividade</p> <p className='value'>{product.connectivity.join(", ")}</p>
        <p className='key'>Valor em Real</p> <p className='value'>R${product.value}</p>
        <p className='key'>Dimensões em Metros</p>
        <ul>
          <li className='key'>Altura</li> <li className='value'>{product.dimensions.height} m</li>
          <li className='key'>Largura</li> <li className='value'>{product.dimensions.width} m</li>
          <li className='key'>Espessura</li> <li className='value'>{product.dimensions.thickness} m</li>
        </ul>
      </div>
    </div>


  );

}

export default ProductInfo