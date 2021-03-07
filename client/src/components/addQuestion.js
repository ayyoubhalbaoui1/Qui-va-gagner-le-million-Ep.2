import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import '../style/addQuestion.css'
import  { Redirect } from 'react-router-dom'

function AddQuestion() {
    const token = localStorage.getItem('token')
    console.log(token);
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        // console.log(data);
        const false_choise = []
        false_choise.push(data.false_choise1, data.false_choise2, data.false_choise3)
        console.log(data, false_choise);
        axios.post(process.env.REACT_APP_URL+'admin/addQuestion', {
        //   const info = {
               quest: data.quest,
            answer: data.answer,
            false_choise: false_choise,
            points: data.points,
            // console.log(info);
        },{headers :{
            'x-auth-token': token,
          }},)
            .then(response => {
                toast.configure()
                toast.error(response.data)
                console.log(response)
                localStorage.setItem('token', response.data.token)
            })
            .catch(err => console.log(err))
    }

    if(!token){
        // return(<div>login</div>)
        return <Redirect to='/login'  />
    }
    else{

        return (
            <Container component="main" maxWidth="md" className="ff" >
                <CssBaseline />
                <div >
    
                    <Typography component="h1" variant="h5">
                        Add question
            </Typography>
                    <br />
                    <form  noValidate onSubmit={handleSubmit(onSubmit)} lg={12}>
                        <Grid container spacing={2} >
    
    
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="quest"
                                    label="question"
                                    name="quest"
                                    autoComplete="quest"
                                    inputRef={register}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="answer"
                                    label="answer"
                                    type="answer"
                                    id="answer"
                                    autoComplete="answer"
                                    inputRef={register}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="false_choise1"
                                    label="false_choise"
                                    type="false_choise"
                                    id="false_choise"
                                    autoComplete="false_choise1"
                                    inputRef={register}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="false_choise2"
                                    label="false_choise"
                                    type="false_choise"
                                    id="false_choise"
                                    autoComplete="false_choise2"
                                    inputRef={register}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="false_choise3"
                                    label="false_choise"
                                    type="false_choise"
                                    id="false_choise"
                                    autoComplete="false_choise3"
                                    inputRef={register}
                                />
                            </Grid>
    
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="points"
                                    label="points"
                                    type="number"
                                    id="points"
                                    autoComplete="points"
                                    inputRef={register}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            
                        >
                            add Question
              </Button>
    
                    </form>
                </div>
    
            </Container>
    
        )
    }
}


export default AddQuestion
