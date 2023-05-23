import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/chat'>Chat</Link>
        </li>
        <li>
          <Link to='/quiz'>Quiz</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar