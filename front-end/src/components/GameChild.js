import React,{ useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { store } from 'react-notifications-component';
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(9),
        height : 50,
        width : 600
      },
    },
  }));

export default function GameChild(props) {
    const classes = useStyles();
    const [currentQuestion , setCurrentQuestion] = useState(0)
    const token = localStorage.getItem('token');
    let history = useHistory();

    const displayQuestions = (props) => {
        const {questions,code} = props

        if(questions.length>0){
            const handelAnswerButtonClick = (e) =>{
                const nextQuestion = currentQuestion + 1

                if(nextQuestion<questions.length){
                setCurrentQuestion(nextQuestion)
                console.log(nextQuestion);
                console.log(currentQuestion);
                var particip_answer = e.target.textContent
                axios.post(process.env.REACT_APP_API_URL+'/questionToken/add',{
                    id_question : questions[currentQuestion]._id,
                    participant_answer : particip_answer,
                    group_code : code
                },{
                    headers:{
                        "auth-token": token
                      }
                }).then(response => {
                    console.log(response);
                }).catch(error =>{
                    store.addNotification({
                        title: "Error !",
                        message: error.response.data,
                        type: "danger",
                        insert: "top",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 5000,
                          onScreen: true
                        }
                      });
                })
            }else{
                axios.post(process.env.REACT_APP_API_URL+'/questionToken/add',{
                    id_question : questions[currentQuestion]._id,
                    participant_answer : particip_answer,
                    group_code : code
                },{
                    headers:{
                        "auth-token": token
                      }
                }).then(response => {
                    console.log(response);
                }).catch(error =>{
                    store.addNotification({
                        title: "Error !",
                        message: error.response.data,
                        type: "danger",
                        insert: "top",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 5000,
                          onScreen: true
                        }
                      });
                })
                history.push('/Winner?code='+code)
            }
            }

            return (
                <div className="game-container">
                    <h1>Question {currentQuestion + 1}/{questions.length}</h1>
                    <p>{questions[currentQuestion].quest} </p>
                    <div>
                        <div className={classes.root}>
                            <Button onClick={handelAnswerButtonClick} key={questions[currentQuestion].answer} variant="outlined" size="large" color="inherit">{questions[currentQuestion].answer}</Button>
                            {questions[currentQuestion].false_choices.map(choice => {
                                return <Button onClick={(e)=>{handelAnswerButtonClick(e)}} key={choice} variant="outlined" size="large" color="inherit">{choice}</Button>
                            })}
                        </div>
                    </div>
                </div>
            )} else{
                return (<h1>No questions</h1>)
            }

    }

    return (
        <>
            {displayQuestions(props)}
        </>
    )
    
}

