import { useEffect, useState } from "react";
import { useContext } from "react";
import { QuizContext } from "./context/quiz";

import './App.css';

import StartQuiz from "./components/StartQuiz";
import Questions from "./components/Questions";
import Chat from "./components/Chat";
import Final from "./components/Final";
import MenuQuiz from "./components/MenuQuiz";

import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import NotFound from './components/NotFound.jsx'

function App() {

  const [quizState, dispatch] = useContext(QuizContext)
  const [token, setToken] = useState([])

  return (
    <ErrorBoundary FallbackComponent={NotFound}>
      <div className="App">
        <Outlet></Outlet>
      </div>
    </ErrorBoundary>
  )
}


export default App


