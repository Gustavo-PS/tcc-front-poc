import { createContext, useReducer } from "react";
import questions from '../data/questions'

const STAGES = ["Start", "Playing", "End"]

const initialState = {
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0,
    profile: "",
    answerSelected: false,
}

const quizReducer = (state, action) => {
    switch (action.type) {
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
            return initialState

        case "CHECK_ANSWER":
            const option = action.payload.option;
            //console.log(option)

            const questionOptions = action.payload.options
            const index = questionOptions.indexOf(option) + 1
            //console.log(index)

            return {
                ...state,
                answerSelected: option,
                profile: state.profile + index
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