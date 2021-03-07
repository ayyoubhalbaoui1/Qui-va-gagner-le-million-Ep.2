import React from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function participantInfo(props) {
    const {data} = props
    const token = localStorage.getItem('token')
    function validAccount (id){
        axios.patch(process.env.REACT_APP_URL+'admin/validate/'+id,{},{headers:{'x-auth-token':token}})
        .then(doc=>{
            console.log(doc);
            toast.configure()
            toast.success('acount validate')
        })
        .catch(err=>{console.log(err)})
    }
    return (
        <tbody>
            <tr>
                        <td scope="row">{data.full_name}</td>
                        <td>{data.age}</td>
                        <td>{data.phone}</td>
                        <td>{data.email}</td>
                        <td><button className="btn btn-success" onClick={()=>validAccount(data._id)}>validate</button></td>
                    </tr>
        </tbody>
    )
}
