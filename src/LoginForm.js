import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = () => {
    const validationErrors = {};
    if (!username) {
      validationErrors.username = 'Username or Email is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const userData = {
        username: username,
        password: password
      };
    
      fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          alert('Signed up successfully!');
          //console.log('Signed up successfully!');
          // Handle success (optional)
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
          // Handle error (optional)
        });
    }
    
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Username or Email"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message="Logged in successfully!"
      />
    </Box>
  );
};

export default LoginForm;
