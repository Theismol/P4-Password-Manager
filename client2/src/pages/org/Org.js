import PermanentDrawerLeft from "../../components/navbars/sideBar";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
<<<<<<< HEAD
import axios from 'axios';
=======
import axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
>>>>>>> orgData

//name, organization id

function Org() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
<<<<<<< HEAD
  const [openModal, setOpenModal] = useState(false);
  const [csrftoken, setCsrftoken] = useState("");
=======
  const [open, setOpen] = React.useState(false);
>>>>>>> orgData
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

<<<<<<< HEAD

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
      axios.get("http.//localhost:4000/api/auth/getCSRF").then((response) => {
        setCsrftoken(response.data.csrftoken);
      }).catch((error) => {
        console.log(error);
      })
      }
      catch(error) {
        console.log(error);
      }
      
    }
    
  , []);


  function handleSubmit() {

  }
=======
  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
    console.log("clicked");
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/organization/getUserInOrganization", {
          withCredentials: true,
        })
        .then((response) => {
          const modifiedArray = response.data.users.map((users) => {
            return {
              ...users,
              id: users._id,
              Name: users.username,
              email: users.email,
            };
          });
          setRows(modifiedArray);
        })
        .catch((error) => {
          console.error("errpr fetching data", error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
 

  function handleSubmit() {}
>>>>>>> orgData

  return (
    <div>
      {console.log(rows)}
      <PermanentDrawerLeft />
      {
<<<<<<< HEAD
        <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
=======
        <div
          style={{ display: "flex", justifyContent: "center", margin: "auto" }}
        >
>>>>>>> orgData
          <div style={{ height: 400, width: "40%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
<<<<<<< HEAD
              initialState={{

              }}

=======
              initialState={{}}
>>>>>>> orgData
              checkboxSelection
            />
          </div>

          <Box
            component="form"
<<<<<<< HEAD
            onSubmit={handleSubmit}
=======
            
>>>>>>> orgData
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
<<<<<<< HEAD

          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
=======
          </Box>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleClickOpen}>
>>>>>>> orgData
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
<<<<<<< HEAD
              Add/Remove
            </Button>

          </Box>


        </div>





=======
              Add
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: "form",
                onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  const email = formJson.email;
                  const organization = formJson.organization;
                  console.log(email);
                  console.log(organization);  
                  handleClose();
                },
              }}
            >
              <DialogTitle>Add user</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To Add a user to the organization, please enter the email.
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add user</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </div>
>>>>>>> orgData
      }
    </div>
  );
}

export default Org;
