import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './Chat.css'
import Loading from './Loading'

const Chat = () => {

    const [token, setToken] = useState([])
    const [answer, setAnswer] = useState([])
    const [prompt, setPrompt] = useState([])

    useEffect(() => {
        //authToken
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("access-token", "");

        var raw = JSON.stringify({
            "password": "poc-tcc-api"
        });

        fetch("https://app-api-tcc.azurewebsites.net/api/v1/login", {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(data => setToken(data))
            .catch(error => console.log('error', error));
    }, [])

    function submitQuestion() {
        //chat
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("access-token", token.token);

        var raw = JSON.stringify({
            "perfil": prompt
        });

        fetch("https://app-api-tcc.azurewebsites.net/api/v1/chat", {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(data => setAnswer(JSON.stringify(data.chatResponse)))
            .catch(error => console.log('error', error));
    }

    if (token.token != null) {
        return (
            <div className='Chat'>
                <Loading></Loading>
            </div>
        )
    } else {
        return (
            <div className='Chat'>
                <h3>Alguma dúvida?</h3>
                <h2>Pergunte para a nossa IA!</h2>
                <input name='inputPrompt' value={prompt} onChange={e => setPrompt(e.target.value)}></input>
                <button name='submit' onClick={submitQuestion}>Submit</button>
                <a>{answer}</a>
            </div>
        )
    }
}

export default Chat