import React, { useContext, useState, useEffect } from 'react';
import { QuizContext } from '../context/quiz';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import "./Final.css";
import img from '../img/detalhes.png'
import backArrow from '../img/back-arrow.png'

const mock = {
  "chatResponse": [
    {
      "name": "iPhone 11",
      "brand": "Apple",
      "operational_system": "iOS",
      "screen": {
        "size": 6.1,
        "resolution": "828 x 1792",
        "technology": "Liquid Retina IPS LCD"
      },
      "processor": "Apple A13 Bionic",
      "memory": {
        "ram": 4,
        "storage": 64
      },
      "camera": {
        "front_amount": 1,
        "front_megapixel": 12,
        "rear_amount": 2,
        "rear_megapixel": [
          12,
          12
        ]
      },
      "battery": 3110,
      "connectivity": [
        "Wi-Fi",
        "Bluetooth",
        "NFC"
      ],
      "value": 4999,
      "dimensions": {
        "height": 0.15,
        "width": 0.07,
        "thickness": 0.008
      },
      "3dmodel": null
    },
    {
      "name": "Samsung Galaxy S20",
      "brand": "Samsung",
      "operational_system": "Android",
      "screen": {
        "size": 6.2,
        "resolution": "1440 x 3200",
        "technology": "Dynamic AMOLED 2X"
      },
      "processor": "Exynos 990",
      "memory": {
        "ram": 8,
        "storage": 128
      },
      "camera": {
        "front_amount": 1,
        "front_megapixel": 10,
        "rear_amount": 3,
        "rear_megapixel": [
          12,
          64,
          12
        ]
      },
      "battery": 4000,
      "connectivity": [
        "Wi-Fi",
        "Bluetooth",
        "NFC"
      ],
      "value": 4999,
      "dimensions": {
        "height": 0.15,
        "width": 0.07,
        "thickness": 0.008
      },
      "3dmodel": null
    },
    {
      "name": "Google Pixel 4a",
      "brand": "Google",
      "operational_system": "Android",
      "screen": {
        "size": 5.81,
        "resolution": "1080 x 2340",
        "technology": "OLED"
      },
      "processor": "Qualcomm Snapdragon 730G",
      "memory": {
        "ram": 6,
        "storage": 128
      },
      "camera": {
        "front_amount": 1,
        "front_megapixel": 8,
        "rear_amount": 1,
        "rear_megapixel": [
          12.2
        ]
      },
      "battery": 3140,
      "connectivity": [
        "Wi-Fi",
        "Bluetooth",
        "NFC"
      ],
      "value": 3499,
      "dimensions": {
        "height": 0.14,
        "width": 0.07,
        "thickness": 0.008
      },
      "3dmodel": null
    },
    {
      "name": "OnePlus 8 Pro",
      "brand": "OnePlus",
      "operational_system": "Android",
      "screen": {
        "size": 6.78,
        "resolution": "1440 x 3168",
        "technology": "Fluid AMOLED"
      },
      "processor": "Qualcomm Snapdragon 865",
      "memory": {
        "ram": 12,
        "storage": 256
      },
      "camera": {
        "front_amount": 1,
        "front_megapixel": 16,
        "rear_amount": 4,
        "rear_megapixel": [
          48,
          8,
          48,
          5
        ]
      },
      "battery": 4510,
      "connectivity": [
        "Wi-Fi",
        "Bluetooth",
        "NFC"
      ],
      "value": 5499,
      "dimensions": {
        "height": 0.16,
        "width": 0.07,
        "thickness": 0.009
      },
      "3dmodel": null
    },
    {
      "name": "Xiaomi Mi 10 Pro",
      "brand": "Xiaomi",
      "operational_system": "Android",
      "screen": {
        "size": 6.67,
        "resolution": "1080 x 2340",
        "technology": "Super AMOLED"
      },
      "processor": "Qualcomm Snapdragon 865",
      "memory": {
        "ram": 8,
        "storage": 256
      },
      "camera": {
        "front_amount": 1,
        "front_megapixel": 20,
        "rear_amount": 4,
        "rear_megapixel": [
          108,
          8,
          12,
          20
        ]
      },
      "battery": 4500,
      "connectivity": [
        "Wi-Fi",
        "Bluetooth",
        "NFC"
      ],
      "value": 4599,
      "dimensions": {
        "height": 0.16,
        "width": 0.07,
        "thickness": 0.009
      },
      "3dmodel": null
    }
  ],
  "usage": {
    "completion_tokens": 1124,
    "prompt_tokens": 819,
    "total_tokens": 1943
  }
}

const Final = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const token = quizState.token;
  const prompt = quizState.profile;
  const modifiedPrompt = prompt.replaceAll('|', '\n').replaceAll('$', '');
  const [answer, setAnswer] = useState(quizState.devices);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (answer == null) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("access-token", token);

      const raw = JSON.stringify({
        strChat: modifiedPrompt,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      function doRequest() {
        fetch("https://tcc-ec10-2023.azurewebsites.net/api/v1/chat", requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error('A resposta não está OK');
            }
            return response.json();
          })
          .then((data) => {
            setAnswer(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Erro:', error.message);
            // Tente novamente após um atraso
            setTimeout(() => {
              doRequest(); // Tente novamente
            }, 60000); // Aguarde 1 minuto antes de tentar novamente (pode ajustar o valor)
          });
      }

      doRequest();

    }else{
      setLoading(false)
    }
  }, [])


  if (loading) {
    return (
      <Loading></Loading>
    )
  } else {
    return (

      <div className='quizContainer'>
        <div id='question-container'>
          <img id='back-arrow' src={backArrow} onClick={() => {
            dispatch({ type: "NEW_GAME" })
          }}></img>
          <h2 id='question-text'>Analisando suas respostas, trouxemos alguns dispositivos indicados para você</h2>
          <div id='progress-bar'>
          </div>
        </div>
        <div className="product-list">
          {answer.chatResponse.map((product, index) => (
            <Link to={`/product/info/${JSON.stringify(product).replace(product._3dmodel, null)}`} >
              <div key={index} className="product" onClick={() => dispatch({
                type: "SAVE_LIST",
                payload: { answer, product }
              },)}>
                <div id='product-info'>
                  <p id='product-name'>{product.name}</p>
                  <p id='product-brand'>Marca: {product.brand}</p>
                  <p id='product-price'>Preço: R$ {product.value} </p>
                </div>
                <div id='product-arrow'>
                  <img src={img}></img>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div id='btn-container'>
          <button className='btnPrimary' onClick={() => dispatch({ type: "NEW_GAME" })}>Refazer</button>
        </div>
      </div>

    )
  }
}

export default Final;
