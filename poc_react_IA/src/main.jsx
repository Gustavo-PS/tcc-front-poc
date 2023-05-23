import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Chat from './components/Chat.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider} from "react-router-dom"

import { QuizProvider } from './context/quiz.jsx'
import MenuQuiz from './components/MenuQuiz.jsx'
import Home from './components/Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "chat",
        element: <Chat></Chat>
      },
      {
        path: "quiz",
        element: <MenuQuiz></MenuQuiz>
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizProvider>
      <RouterProvider router={router}></RouterProvider>
    </QuizProvider>
  </React.StrictMode>,
)
