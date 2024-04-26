
import React, { useState, useEffect } from 'react';
import { Table, TableCell, TableRow, TableHead, TableBody, Paper, TableContainer, TablePagination } from '@mui/material';
import axios from 'axios';
import PasswordModal from '../../components/PasswordPop/PasswordModal';
import CryptoJS from 'crypto-js';

export default function PasswordTable() {
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
      // Assuming you have the CSRF token stored in a variable called csrfToken
      
  
      const response = await axios.get('http://localhost:4000/api/password/getPasswords', {csrftoken:"csrf",
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'// Include CSRF token in the headers
        }
      });
  
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const columns = [
    { id: 'username', label: 'Username', minWidth: 170 },
    { id: 'password', label: 'Password', minWidth: 170 },
    { id: 'url', label: 'URL', minWidth: 170 }
  ];

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlePasswordChange = async () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let newPassword = '';
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    const encryptedPassword = CryptoJS.AES.encrypt(newPassword, 'your_secret_key').toString();

    // Update the selectedRow with the new password
    const updatedRow = { ...selectedRow, password: encryptedPassword };

    try {
      // Send the new password to the backend API endpoint - NEED TO KNOW WHICH API ENDPOINT
      // await axios.put(`http://localhost:4000/api/users/${updatedRow.id}`, { password: newPassword });

      // Update the data state with the updatedRow
      const updatedData = data.map(row => row.username === updatedRow.username ? updatedRow : row);
      setData(updatedData);
    } catch (error) {
      console.error('Error updating password:', error);
    }

    handleCloseModal();
  };

  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
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
      {/* Modal component */}
      <PasswordModal
        open={openModal}
        handleCloseModal={handleCloseModal}
        selectedRow={selectedRow}
        handlePasswordChange={handlePasswordChange} 
      />
    </div>
  );
}
 