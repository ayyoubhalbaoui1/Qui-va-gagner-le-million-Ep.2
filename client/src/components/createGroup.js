import React from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'
import {useHistory} from "react-router-dom";

export default function CreateGroup() {
    let history = useHistory();
    const token = localStorage.getItem('token')
    const [code, setCode] = React.useState()
    const [member, setMember] = React.useState()
    function create() {
        axios.post(process.env.REACT_APP_URL + 'participant/creatGroup', {}, { headers: { 'x-auth-token': token } })
            .then(doc => {
                console.log(doc.data);
                setCode(doc.data.group.code)
                localStorage.setItem('group', doc.data.group.code)
                toast.configure()
                toast.success('group created code goup is :'+doc.data.group.code)
            })
            .catch(err => { console.log(err) })
    }
    setInterval(()=>{if(localStorage.getItem('group')){
        axios.get(process.env.REACT_APP_URL+'participant/getNumber/'+localStorage.getItem('group'))
        .then(doc=>{
            setMember(doc.data.number)
            if(member===4){
                history.push('/')
            }
        })
        .catch(err=>{console.log(err)})
    }},2000)
    return (
        <div>
            <button className="btn btn-warning" onClick={() => create()}>Create Group</button>
            {code && <div>your code : {code}</div>}
            {member && <div>member in team:{member}</div>}
        </div>
    )
}
