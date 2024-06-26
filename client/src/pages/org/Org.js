import PermanentDrawerLeft from "../../components/navbars/sideBar";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//name, organization id

function Org() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [csrftoken, setCsrftoken] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [inOrg, setinOrg] = useState(false);
  const [rows, setRows] = useState([
  ]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Email ", width: 150 },
    { field: "Name", headerName: "Name", width: 150 },
  ];


  useEffect(() => {
    try {
      axios.get("http://localhost:4000/api/organization/getUserInOrganization", {
        withCredentials: true
      }).then((response) => {
        setinOrg(true);
        setAdmin(response.data.isAdmin);
        const modifiedArray = response.data.users.map(users => {
          return { ...users, id: users._id, Name: users.username, email: users.email }
        })
        setRows(modifiedArray)
      }).catch((error) => {
        if (error.response.status === 401) {
          window.location.href = "/login";
        }
      });
      axios.get("http://localhost:4000/api/auth/getCSRF", { withCredentials: true }).then((response) => {
        setCsrftoken(response.data.csrftoken);
      }).catch((error) => {
        console.log(error);
      })
    }
    catch (error) {
      console.log(error);
    }

  }

    , [inOrg, openAdd, openRemove]);



  const handleClickOpenAdd = (event) => {
    event.preventDefault();
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleCloseRemove = () => {
    setOpenRemove(false);
  }
  const handleClickOpenRemove = (event) => {
    event.preventDefault();
    setOpenRemove(true);
  }
  const createOrganization = (event) => {
    handleCloseRemove();      
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const organization = formJson.organization;
      axios.post("http://localhost:4000/api/organization/createOrganization", {
        name: formJson.organization,
        csrftoken: csrftoken,
      }, {
        withCredentials: true,
      })
        .then((response) => {
          console.log(response.data.message);
          if (response.status === 200) {
            setinOrg(true);
            axios.post("http://localhost:4000/api/auth/tokenRefresh", {
              
              csrftoken: csrftoken,
            },
            {
              withCredentials: true,
            });
            
          }
        }).catch ((error) => {
        console.log(error.data.message);
        console.log(error);
      });

  }
  const addUser = (event) => {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      axios.post("http://localhost:4000/api/organization/addUserToOrganization", {
        email: formJson.email,
        csrftoken: csrftoken,
      }, {
        withCredentials: true,
      }).then((response) => {
        handleCloseAdd();

      }).catch ((error) => {
        console.log(error);
      });
  }
  const removeUser = (event) => {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      axios.delete("http://localhost:4000/api/organization/removeUserFromOrganization", {data : {
        email:formJson.email,
        csrftoken:csrftoken,

      },
      withCredentials: true,
      }).then ((response) => {
        handleCloseRemove();
      }).catch((error) => 
        {
          console.log(error);
        }
      );

  }
  if (inOrg === false) {
    return (
      <div>
        <PermanentDrawerLeft />
        <h2 style={{ display: "flex", justifyContent: "center", margin: "auto" }}>
           Looks like you are not in an organization, click the button to create one</h2>

        {
          <div
            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}

          >

            <Box
              component="form"
              onSubmit={handleClickOpenAdd}
              noValidate
              sx={{ mt: 1 }}>

              <Button
                style={{ alignitems: "center" }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Add organization
              </Button>
              <Dialog
                open={openAdd}
                onClose={handleCloseAdd}
                PaperProps={{
                  component: "form",
                  onSubmit: (event) => createOrganization(event),
                }}
              >
                <DialogTitle>create organization</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To create organization, please enter the organization name.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="organization"
                    name="organization"
                    label="organization name"
                    type="input"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseAdd}>Cancel</Button>
                  <Button type="submit">Create organization</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </div>
        }
      </div>
    );
  } else {
    return (
      <div>
        {console.log(rows)}
        <PermanentDrawerLeft />

        {
          <div
            style={{ display: "flex", justifyContent: "center", margin: "auto" }}
          >
            <div style={{ height: 400, width: "40%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{}}
                checkboxSelection
              />
            </div>
            {admin && (
            <Box
              component="form"
              onSubmit={handleClickOpenRemove}
              noValidate
              sx={{ mt: 1 }}
              style={{display: "flex", justifyContent: "center", alignItems: "center"}}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Remove user
              </Button>
              <Dialog
                open={openRemove}
                onClose={handleCloseRemove}
                PaperProps={{
                  component: "form",
                  onSubmit: (event) => removeUser(event),
                }}
              >
                <DialogTitle>Remove user</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To remove a user from the organization, please enter the email.
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
                  <Button onClick={handleCloseRemove}>Cancel</Button>
                  <Button type="submit">Remove user</Button>
                </DialogActions>
              </Dialog>
            </Box>
            )}
            {admin && (
                          <Box
                          component="form"
                          onSubmit={handleClickOpenAdd}
                          noValidate
                          sx={{ mt: 1 }}
                          style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                        >
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Add user
                          </Button>
                          <Dialog
                            open={openAdd}
                            onClose={handleCloseAdd}
                            PaperProps={{
                              component: "form",
                              onSubmit: (event) => addUser(event),
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
                              <Button onClick={handleCloseAdd}>Cancel</Button>
                              <Button onClick={handleCloseAdd} type="submit">Add user</Button>
                            </DialogActions>
                          </Dialog>
                        </Box>
            )}
          </div>
        }
      </div>
    );
  }

}

export default Org;
