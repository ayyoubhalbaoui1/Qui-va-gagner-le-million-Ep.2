import React from 'react'
import axios from 'axios'
import ParticipantInfo from './participantInfo'

export default function AllParticipant() {
    // console.log(process.env.REACT_APP_URL);
    const token = localStorage.getItem('token')
    const [allParticipant, setParticipant] = React.useState([])
    React.useEffect(() => {
        axios.get(process.env.REACT_APP_URL + 'admin/allPArticipant', { headers: { 'x-auth-token': token } })
            .then(doc => {
                const { data } = doc
                // console.log(data[0]);
                setParticipant(data)

            })
            .catch(err => console.log(err))
        return () => {
            // cleanup
        }
    }, [])

    console.log(typeof (allParticipant))
    if (allParticipant.length > 0) {
        return (
            <div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">full Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Phone</th>
                            <th scope="col">email</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>

                    {allParticipant.map((participant) => (
                        <ParticipantInfo data={participant} key={participant._id} />
                    ))}


                </table>
            </div>
        )
    } else {
        return (
            <div className="alert alert-success m-5">all acounts is valid</div>
        )
    }
}
