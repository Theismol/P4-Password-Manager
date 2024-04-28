import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

export default function PasswordModal({ open, handleCloseModal, selectedRow, handlePasswordChange }) {
  const [username] = useState(selectedRow ? selectedRow.username : '');
  const [password] = useState(selectedRow ? selectedRow.password : '');
  const [url, setUrl] = useState(selectedRow ? selectedRow.url : '');

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const confirmPasswordChange = () => {
    const confirmed = window.confirm("Are you sure you want to change the password?");
    if (confirmed) {
      handlePasswordChange(); // Trigger password change only if confirmed
    }
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: '80vw',
          maxHeight: '80vh',
          overflowY: 'auto',
          borderRadius: 4
        }}
      >
        <Typography variant="h5" gutterBottom>
          Details
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true, 
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true, 
          }}
        />
        <TextField
          label="URL"
          variant="outlined"
          value={url}
          onChange={handleUrlChange}
          fullWidth
          margin="normal"
        />
        <Button onClick={confirmPasswordChange}>Change Password</Button> {/* Button to trigger password change with confirmation */}
        <Button onClick={handleCloseModal}>Close</Button>
      </Box>
    </Modal>
  );
}
