import axios from 'axios';
import React from 'react'
import team from '../ff17dd76d1e165313243af9e109d4ab8.png'
import { store } from 'react-notifications-component';
import { useHistory } from "react-router-dom";

export default function CreateGrp() {
  let history = useHistory();
    const onClick = () =>{
        const token = localStorage.getItem('token');
        axios.post(process.env.REACT_APP_API_URL+'/group/add',{},{
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
          history.push('/Lobby?code='+response.data.group_code)
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
            <img src={team} alt=""/>
            <p style={{color : "white", fontSize : "20px", textAlign : "center"}}>
                Create a groupe
            </p>
            <button className="create-btn" onClick={onClick}>
                CREATE !
            </button>
        </div>
    )
}
