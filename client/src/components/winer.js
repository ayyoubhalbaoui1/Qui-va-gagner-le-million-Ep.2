import React from 'react'
import axios from 'axios'

export default function Winer(props) {
    const group = localStorage.getItem('group')
    const [winner,setWinner] = React.useState({})
    React.useEffect(() => {
        axios.get(process.env.REACT_APP_URL+'participant/getwinner/'+group)
        .then(responce=>{
            const {data} = responce;
            const {full_name,points} =responce.data.winner[0].win[0]
            console.log(full_name);
            setWinner({
                full_name:full_name,
                points :points
            })
        })
        .catch(err=>{console.log(err)})
        // return () => {
        //     // cleanup
        // }
    },[])
    return (
        <div>
            {winner && <div>the winner is : {winner.full_name+'('+winner.points+')'}
                </div>}
        </div>
    )
}
