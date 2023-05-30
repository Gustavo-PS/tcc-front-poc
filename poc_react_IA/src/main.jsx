import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Chat from './components/Chat.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider} from "react-router-dom"

import { QuizProvider } from './context/quiz.jsx'
import MenuQuiz from './components/MenuQuiz.jsx'
import Home from './components/Home.jsx'
import Products from './components/Products.jsx'
import ProductInfo from './components/ProductInfo.jsx'
import AR from './components/AR.jsx'


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
      {
        path: "products",
        element: <Products></Products>
      },
      {
        path: "product/info/:id",
        element: <ProductInfo></ProductInfo>
      },
      {
        path: "ar",
        element: <AR></AR>
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
