import React,{useState, useEffect} from 'react'
import user from '../malecostume-512.webp'
import axios from 'axios'
import {
    useLocation , Redirect
  } from "react-router-dom";


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

export default function Lobby() {
   
    const [data, setData] = useState([])

    let query = useQuery();
    const group_code = parseInt(query.get("code"))

   useEffect(() => {
    async function fetchData() {
        await axios.post(process.env.REACT_APP_API_URL+'/group/getGroup',{
            group_code : group_code
        }).then(res=>{
           setData(res.data)
            }
        ).catch(err=>{
            console.log(err);
        })
    }
    
    setInterval( fetchData,2000)
   }, [group_code,data.length])


   // 4 or two participant

  if (data.length === 2) {
     return <Redirect to={{
        pathname: '/Game',
        state: { code: group_code }
    }}/>
  }

    return (
        <div className="lobby-container">
            <h1 className="title"></h1>
            <h2 className="grp-code-title">Group pin : {group_code}</h2>
            <h3 className="particip-title">Waiting for participants...</h3>
            <div className="participants-container">
            {data.map(particip =>{
                return  <div key={particip._id} className="single-particip-card">
                <img alt="" src={user} />
                <h3>{particip.participant[0].full_name}</h3>
            </div>
            })}
            </div>
        </div>
    )
}
