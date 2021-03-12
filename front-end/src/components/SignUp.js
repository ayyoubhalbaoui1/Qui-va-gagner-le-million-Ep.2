import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useForm} from 'react-hook-form';
import axios from 'axios'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

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


export default function SignUp() {
    const classes = useStyles();

    const {register,handleSubmit} = useForm()

    const onSubmit = (data) =>{
        console.log(data);
        axios.post(process.env.REACT_APP_API_URL+'/participant/register',{
            full_name : data.full_name,
            age : data.age,
            email : data.email,
            phone : data.phone,
            password : data.password
        })
        .then(function (response) {
            console.log(response);
            store.addNotification({
                title: "Succes !",
                message: "You have signed up successfully ! You can login",
                type: "success",
                insert: "top",
                container: "top-right",
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
        <div className="single-form-container">
        <h1 className="title">Register form</h1>
        <div className="login-form">
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <TextField name="full_name" label="Full name" variant="outlined" inputRef={register}  InputLabelProps={{
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
                <TextField type="number" name="age" label="Age" variant="outlined" inputRef={register} InputLabelProps={{
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
                <TextField name="phone" label="Phone" variant="outlined"  inputRef={register} InputLabelProps={{
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
                <TextField type="email" name="email" label="Email" variant="outlined"  inputRef={register} InputLabelProps={{
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
                <TextField name="password" label="Password" type="password" variant="outlined"  autoComplete="current-password" inputRef={register} InputLabelProps={{
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
                <Button variant="contained" color="inherit" type="submit">Sign up</Button>
            </form>
        </div>
    </div>
    )
}
