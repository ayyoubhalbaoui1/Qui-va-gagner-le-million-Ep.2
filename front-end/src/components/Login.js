import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
  cssLabel: {
        color : 'white'
      },
    
      cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `${theme.palette.primary.main} !important`,
        }
      },

      cssFocused: {},

      notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important'
      },
      input : { color : 'white'}
}));

export default function Login() {
  const {register,handleSubmit} = useForm()
  let history = useHistory();

    const onSubmit = (data) =>{
        axios.post(process.env.REACT_APP_API_URL+'/participant/login',{
            phone : data.phone,
            password : data.password
        })
        .then(function (response) {
            localStorage.setItem('token', response.data)
            history.push('/Group')
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

    const classes = useStyles();
    return (
        <div className="single-form-container">
            <h1 className="title">Log in</h1>
            <div className="login-form">
                <form className={classes.root} noValidate autoComplete="on"  onSubmit={handleSubmit(onSubmit)}>
                    <TextField name="phone" label="Phone" inputRef={register} variant="outlined" InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
              input : classes.input
            }
          }}/>
                    <TextField name="password" label="Password" type="password" autoComplete="current-password" variant="outlined" inputRef={register} InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
              input : classes.input
            }
          }}/>
                    <Button variant="contained" color="inherit" type="submit">Log in</Button>
                </form>
            </div>
        </div>
    )
}
