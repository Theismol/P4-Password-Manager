import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

export default function PasswordModal({ open, handleCloseModal, selectedRow, handlePasswordChange, generatedPassword, saveChanges }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [isNewPasswordSaved, setIsNewPasswordSaved] = useState(false);

  useEffect(() => {
    if (selectedRow) {
      setUsername(selectedRow.username);
      setPassword(selectedRow.password);
      setUrl(selectedRow.url);
      setIsNewPasswordSaved(false); // Reset isNewPasswordSaved when modal opens
    }
  }, [selectedRow, generatedPassword]); // Update when selectedRow or generatedPassword changes

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSaveChanges = () => {
    if (!isNewPasswordSaved && generatedPassword) {
      saveChanges(generatedPassword); // Save the generated password
      setIsNewPasswordSaved(true);
    }
    handleCloseModal();
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
          value={isNewPasswordSaved ? generatedPassword : password}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
            // type: isNewPasswordSaved ? 'text' : 'password', // Display as text if new password is saved
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
        <Button onClick={handlePasswordChange}>Change Password</Button>
        <Button onClick={handleCloseModal} style={{ float: 'right' }}>Close</Button>
        <Button onClick={handleSaveChanges} style={{ float: 'right', marginRight: '10px' }}>Save Changes</Button>
      </Box>
    </Modal>
  );
}
