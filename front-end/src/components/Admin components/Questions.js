import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { store } from 'react-notifications-component';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '35ch',
      },
    },
  }));

export default function Questions() {
    const classes = useStyles();
    const {register,handleSubmit} = useForm()
    const onSubmit = (data) =>{
        let answers = []
        answers.push(data.choice1)
        answers.push(data.choice2)
        answers.push(data.choice3)
        answers.push(data.answer)
        const token = localStorage.getItem('token');
        axios.post(process.env.REACT_APP_API_URL+'/question/add',{
            quest : data.question ,
            answer : data.answer,
            false_choices : answers,
            points : data.score
        },{
            headers:{
                "auth-token": token
              }
        })
        .then(function (response) {
            console.log(response);
            store.addNotification({
                title: "Success !",
                message: "Question Added",
                type: "success",
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
          .catch(function (error) {
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
            console.log(error.response.data);
          });
    }
    return (
        <div className="questions-container">
            <h1>Add Question</h1>
            <div className="add-question-form">
                <form className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
                    <TextField name="question" label="Question" inputRef={register} />
                    <TextField name="answer" label="Answer" inputRef={register}/>
                    <TextField name="choice1" label="Choices"  inputRef={register}/>
                    <TextField name="choice2" label="Choices"  inputRef={register}/>
                    <TextField name="choice3" label="Choices"  inputRef={register}/>
                    <TextField name="score" label="Score" type="number" inputRef={register}/>
                    <Button variant="contained" color="primary" type="submit">Add</Button>
                </form>
            </div>
        </div>
    )
}
