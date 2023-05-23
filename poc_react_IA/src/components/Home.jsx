import React from 'react'

import "./Home.css"

import img from '../img/lady_shopping.png'

const Home = () => {
  return (
    <div className='home'>
      <img src = {img}></img>
      <h1>Bem vindo!</h1>
    </div>
  )
}

export default Home