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


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const respone = await axios.get('http://localhost:4000/api/organization/getUserInOrganization');
     
      setData(respone.data);

    } catch (error) {
      console.error('errpr fetching data');
    }


  }
    console.log(data);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Organization", headerName: "Organization ", width: 150 },
    { field: "Name", headerName: "Name", width: 150 },
  ];

  const rows = [
    { id: 1, Name: "Jon Snow", email: "Stark" },
    { id: 2, Name: "Cersei Lannister", email: "Lannister" },
    { id: 3, Name: "Jaime Lannister", email: "Lannister" },
    { id: 4, Name: "Arya Stark", email: "Stark" },
    { id: 5, Name: "Daenerys Targaryen", email: "Targaryen" },
    { id: 6, Name: "Melisandre", email: "Lord of fire" },
    { id: 7, Name: "Jorah Mormont", email: "Mormont" },
    { id: 8, Name: "Robert Baratheon", email: "Baratheon" },
    { id: 9, Name: "Margaery Tyrell", email: "Harvey" },
  ];

  const users = data.users;

  /*
  const realRows = users.map(user => ({
    id: user._id,
    Name: user.username,
    email: user.email,
  }));*/

  function handleSubmit(){
    
  }

  return (
    <div>
      <PermanentDrawerLeft />
      {
        <div style={{display: 'flex', justifyContent: 'center', margin: 'auto'}}>
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
