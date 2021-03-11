import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GameChild from './GameChild'


export default function Game(props) {
    const [questions, setQuestions] = useState('')
    const code = props.location.state.code
            useEffect(() => {
                fetchData()
            }, [])

            function fetchData() {
                axios.get(process.env.REACT_APP_API_URL+'/question/getQuestions')
               .then(response =>{
                   const allQuestions = response.data
                   setQuestions(allQuestions)
               }).catch(error =>{
                   console.log(error);
               })
           }

    return (
        <GameChild questions={questions} code={code}/>
    )
}
