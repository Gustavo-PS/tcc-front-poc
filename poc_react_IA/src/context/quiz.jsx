import { createContext, useReducer } from "react";
import questions from '../data/questions'

const STAGES = ["Start", "Playing", "End"]

const initialState = {
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0,
    profile: [],
    answerSelected: false,
    token: "",
    perfil: "",
}

const quizReducer = (state, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            const token = action.payload.token
            console.log(token)

            return {
                ...state,
                token: token,
            }
        case "CHANGE_STATE":
            return {
                ...state,
                gameStage: STAGES[1]
            }

        case "CHANGE_QUESTION":
            const nextQuestion = state.currentQuestion + 1

            let endQuiz = false

            if (!questions[nextQuestion]) {
                endQuiz = true
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endQuiz ? STAGES[2] : state.gameStage,
                answerSelected: false
            }

        case "NEW_GAME":
            return {
                gameStage: STAGES[0],
                questions,
                currentQuestion: 0,
                profile: state.profile,
                answerSelected: false,
                token: state.token,
                perfil: state.perfil,
            }

        case "CHECK_ANSWER":
            const option = "|User:" + action.payload.option;
            const question = "$|Chatbot:" + action.payload.question;
            console.log(question)
            console.log(option)
            

            const questionOptions = action.payload.options
            const index = questionOptions.indexOf(option) + 1
            

            return {
                ...state,
                answerSelected: action.payload.option,
                profile: state.profile + question + option 
            }

        case "GET_PRODUCTS":
            const perfil = action.payload.perfil

            return {
                ...state,
                perfil: perfil
            }

        default:
            return state
    }
}

export const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
    const value = useReducer(quizReducer, initialState)

    return <QuizContext.Provider value={value}>
        {children}
    </QuizContext.Provider>
}