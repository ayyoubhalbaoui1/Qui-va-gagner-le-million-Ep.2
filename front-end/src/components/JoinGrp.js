import React,{useState} from 'react'
import join from '../179de69e5fce42f868416c099d5c8ac2.png'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

export default function JoinGrp() {
  let history = useHistory();
    const classes = useStyles();
    const [name, setName] = useState("")
    const onClick = () =>{
      console.log(name);
      const token = localStorage.getItem('token');
      axios.post(process.env.REACT_APP_API_URL+'/group/join',{
        group_code: name
      },{
          headers:{
              "auth-token": token
            }
      })
    .then((response) => {
      if (response.data.message) {
          store.addNotification({
              title: "Error !",
              message: response.data.message ,
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
      }else {
        console.log(response.data);
        history.push('/Lobby?code='+response.data[0].group_code)
      }

    })
    .catch((error) => {
      store.addNotification({
          title: "Error !",
          message: error.response.data ,
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
      console.log(error.response);

    })


  }
    return (
        <div className="create-grp">
            <img src={join} alt=""/>
            <p style={{color : "white", fontSize : "20px"}}>
                Join a groupe
            </p>
            <TextField name="group_code" label="Pin" variant="outlined" onChange={e=> setName(e.target.value)} InputLabelProps={{
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
          }} />
            <button className="create-btn" onClick={onClick}>
                JOIN !
            </button>
        </div>
    )
}
