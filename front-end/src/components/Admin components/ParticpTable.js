import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

function Table() {
  const [data, setData] = useState([]);

  const columns = [
    { title: "Full name", field: "full_name" },
    { title: "Age", field: "age" },
    { title: "Phone", field: "phone" },
    { title: "Email", field: "email" },
    { title: "IsValid", field: "is_valid" },
  ];

  const validatePArticipant = (id) => {
    const token = localStorage.getItem("token");
    axios
      .patch(process.env.REACT_APP_API_URL+'/participant/validateParticipant/' + id,
        {
            is_valid: true,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((response) =>{
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //featch alla participant
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(process.env.REACT_APP_API_URL+'/participant/getAll', {
      headers: {
        "auth-token": `${token}`,
      },
    }).then((resp) => {
        setData(resp.data);
        console.log(resp);
      });
  }, []);


  return (
    <div className="App">
      <MaterialTable
        title="Parcticipants Table"
        columns={columns}
        data={data}
        actions={[
          {
            icon: "edit",
            tooltip: "Validate User",
            onClick: (event, rowData) => {
              validatePArticipant(rowData._id);
            },
          },
        ]}
      />
    </div>
  );
}

export default Table;