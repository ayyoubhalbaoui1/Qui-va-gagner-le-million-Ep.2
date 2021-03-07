import React from 'react'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


 function SigninParticipant() {
    const classes =useStyles()
    const {register,handleSubmit} = useForm()
    const token = localStorage.getItem('token')
    const onSubmit = (data)=>{
        console.log(data);
    axios.post(process.env.REACT_APP_URL+'admin/addAdmins',data,{headers:{'x-auth-token':token}})
    .then(response=>{
        toast.configure()
        toast.success('admin added successfully')
        })
    .catch(err=>console.log(err.message))
}
    return (
        <div className>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SupervisorAccountIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add New Admin
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="phone"
                name="phone"
                autoComplete="false"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
            </Grid>

        
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            add Admin
          </Button>
          
        </form>
      </div>
      
    </Container>
    </div>
    )
}


export default SigninParticipant
