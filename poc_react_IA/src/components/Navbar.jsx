import React from 'react'
import './Navbar.css'


const Navbar = () => {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/chat">Chat</a>
        </li>
        <li>
          <a href="/quiz">Quiz</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar