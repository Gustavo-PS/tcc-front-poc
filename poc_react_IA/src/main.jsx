import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Chat from './components/Chat.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider} from "react-router-dom"

import { QuizProvider } from './context/quiz.jsx'
import MenuQuiz from './components/MenuQuiz.jsx'
import Products from './components/Products.jsx'
import ProductInfo from './components/ProductInfo.jsx'
import ARComparison from './components/ARComparison.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path: "/",
        element: <MenuQuiz></MenuQuiz>
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
        element: <ARComparison></ARComparison>
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
