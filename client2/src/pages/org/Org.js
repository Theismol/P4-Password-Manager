import PermanentDrawerLeft from "../../components/navbars/sideBar";
import * as react from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

//name, organization id

function Org() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Organization", headerName: "Organization ", width: 150 },
    { field: "Name", headerName: "Name", width: 150 },
  ];

  const rows = [
    { id: 1, Name: "Jon Snow", Organization: "Stark" },
    { id: 2, Name: "Cersei Lannister", Organization: "Lannister" },
    { id: 3, Name: "Jaime Lannister", Organization: "Lannister" },
    { id: 4, Name: "Arya Stark", Organization: "Stark" },
    { id: 5, Name: "Daenerys Targaryen", Organization: "Targaryen" },
    { id: 6, Name: "Melisandre", Organization: "Lord of fire" },
    { id: 7, Name: "Jorah Mormont", Organization: "Mormont" },
    { id: 8, Name: "Robert Baratheon", Organization: "Baratheon" },
    { id: 9, Name: "Margaery Tyrell", Organization: "Harvey" },
  ];

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
