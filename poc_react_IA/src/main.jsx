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
import NotFound from './components/NotFound.jsx'; // Import your "not found" component
import SaibaMais from './components/SaibaMais.jsx'
import ARCam from './components/ARCam.jsx'


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
        path: "saiba_mais",
        element: <SaibaMais></SaibaMais>
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
        path: "ar/:id",
        element: <ARComparison></ARComparison>
      },
      {
        path: "arcam/:id",
        element: <ARCam></ARCam>
      },
      {
        path: '*', // "Not Found" route
        element: <NotFound></NotFound>, // Replace with your "not found" component
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
