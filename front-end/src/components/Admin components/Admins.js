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
export default function Admins() {
    const classes = useStyles();
    const {register,handleSubmit} = useForm()
    const onSubmit = (data) =>{
        const token = localStorage.getItem('token');
        axios.post(process.env.REACT_APP_API_URL+'/admin/add',{
            full_name : data.full_name,
            phone : data.phone,
            password : data.password
        },{
            headers:{
                "auth-token": token
              }
        })
        .then(function (response) {
            console.log(response);
            store.addNotification({
                title: "Success !",
                message: "Admin Added",
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
        <div className="admin-container">
            <h1>Add Admin</h1>
            <div className="add-admin-form">
                <form className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
                    <TextField name="full_name" label="Full Name" inputRef={register} />
                    <TextField name="phone" label="Phone" inputRef={register}/>
                    <TextField name="password" label="Password" type="password" inputRef={register}/>
                    <Button variant="contained" color="primary" type="submit">Add</Button>
                </form>
            </div>
        </div>
    )
}
