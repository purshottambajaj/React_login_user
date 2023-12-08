// SignUpForm.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignUp = () => {
    // Implement your sign-up logic here
    // Perform form validation for mandatory fields
    const validationErrors = {};
    if (!username) {
      validationErrors.username = 'Username is required';
    }
    if (!email) {
      validationErrors.email = 'Email is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }
    if (!confirmPassword) {
      validationErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(validationErrors);

    // If no errors, proceed with sign-up
    if (Object.keys(validationErrors).length === 0) {
      const userData = {
        username: username,
        email: email,
        password: password,
      };
    
      fetch('http://localhost:4000/signup', {
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
          console.log('Signed up successfully!');
          // Handle success (optional)
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
          // Handle error (optional)
        });
    }
    
  };

  return (
    <Box p={2}>
      <h2>Sign Up</h2>
      <form>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <Button variant="contained" color="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
