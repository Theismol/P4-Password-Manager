import React, { useState, useEffect, useContext } from 'react';
import { Table, TableCell, TableRow, TableHead, TableBody, Paper, TableContainer, TablePagination, Container, Box, Button } from '@mui/material';
import axios from 'axios';
import PasswordModal from '../../components/PasswordPop/PasswordModal';
import PermanentDrawerLeft from "../../components/navbars/sideBar";

export default function PasswordTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const columns = [
    { id: 'username', label: 'Username', minWidth: 170 },
    { id: 'password', label: 'Password', minWidth: 170 },
    { id: 'url', label: 'URL', minWidth: 170 }
  ];

  useEffect(() => {
    console.log("fetching");
    fetchData();
  }, [openModal]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/password/getPasswords', { withCredentials: true });
      setData(response.data.passwords);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };
  const createOpenModal = () => {
    setSelectedRow(null);
    setOpenModal(true);
    
  }

  const handleCloseModal = () => {
    setSelectedRow(null);
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <PermanentDrawerLeft/>
      <Container
          component="main"
          sx={{
              display: "flex",
              justifyContent: "center", // Horizontally center the content
          }}
          maxWidth="xl"
      >
      <Button
        onClick = {createOpenModal}
        variant="contained"
        sx={{ margin: "auto" }}>
          Create new password
      </Button>
      <Paper sx={{ width: '70%', overflow: 'hidden', alignItems: "center", justifyContent: "center",   }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    onClick={() => handleOpenModal(row)}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {column.id === 'password' ? '*********' : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </Container>
      {/* Modal component */}

      {openModal ?      (<PasswordModal
        open={openModal}
        handleCloseModal={handleCloseModal}
        selectedRow={selectedRow}
      />) : (null) }

    </div>
  );
}
