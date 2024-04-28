import PermanentDrawerLeft from "../../components/navbars/sideBar";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';

//name, organization id

function Org() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState([
    { id: 1, Name: "Jon Snow", email: "Stark" },
    { id: 2, Name: "Cersei Lannister", email: "Lannister" },
    { id: 3, Name: "Jaime Lannister", email: "Lannister" },
    { id: 4, Name: "Arya Stark", email: "Stark" },
    { id: 5, Name: "Daenerys Targaryen", email: "Targaryen" },
    { id: 6, Name: "Melisandre", email: "Lord of fire" },
    { id: 7, Name: "Jorah Mormont", email: "Mormont" },
    { id: 8, Name: "Robert Baratheon", email: "Baratheon" },
    { id: 9, Name: "Margaery Tyrell", email: "Harvey" },
  ]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Email ", width: 150 },
    { field: "Name", headerName: "Name", width: 150 },
  ];


  useEffect(() => {
    try {
      axios.get("http://localhost:4000/api/organization/getUserInOrganization", {
          withCredentials: true,
      }).then((response) => {
        const modifiedArray = response.data.users.map(users => {
          return {...users, id: users._id, Name: users.username, email: users.email  }
        })
        setRows(modifiedArray)


      }).catch((error) => {
        console.error('errpr fetching data', error);

      });
      }
      catch(error) {
        console.log(error);
      }
      
    }
    
  , []);


  function handleSubmit() {

  }

  return (
    <div>
      {console.log(rows)}
      <PermanentDrawerLeft />
      {
        <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
          <div style={{ height: 400, width: "40%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{

              }}

              checkboxSelection
            />
          </div>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Create org
            </Button>

          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Add/Remove
            </Button>

          </Box>


        </div>





      }
    </div>
  );
}

export default Org;
