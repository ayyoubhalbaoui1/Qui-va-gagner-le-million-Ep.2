import React,{useState,useEffect} from 'react'
import user from '../malecostume-512.webp'
import {
    useLocation
  } from "react-router-dom";
import axios from 'axios'
import { Link } from 'react-router-dom'

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

export default function Winner() {

    const[winner , setWinner] = useState({})

    let query = useQuery();
    const group_code = parseInt(query.get("code"))
    console.log(group_code);



    useEffect(() => {
        async function getWinner(){
            await axios.post(process.env.REACT_APP_API_URL+'/group/finalWinner',{
                group_code : group_code
            }).then(response => {
                setWinner(response.data)
            }).catch(error => {
                console.log(error);
            })
        }
        getWinner()
    }, [group_code])


    return (
        <Link to='/Group' style={{textDecoration: 'none', color : 'black'}}>
        <div className="winner-container">
            <h1>Congratulations !</h1>
            <div className="winner-cards">
                <img alt="" src={user} />
                <h3>{winner.full_name}</h3>
            </div>

            <h3>Click anywhere to return to home</h3>
        </div>
        </Link>
    )
}
