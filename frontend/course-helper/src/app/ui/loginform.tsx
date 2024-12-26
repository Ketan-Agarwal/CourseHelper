'use client';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import LockOutlined from '@mui/icons-material/LockOutlined';
import styles from './loginform.module.css';
import { FormControlLabel, Checkbox } from '@mui/material';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    rollnumber: '',
    password: '',
    rememberMe: false
  });

  const [error, setError] = useState('');

  // Handle form data change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      rememberMe: e.target.checked
    }));
  };
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call to authenticate user)
    if (formData.rollnumber === 'user' && formData.password === 'password') {
      // Successful login, navigate to home page or dashboard
    } else {
      // Handle invalid login
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.formWrapper}>
        <LockOutlined className={styles.icon}/>
        <Typography variant='h5' className={styles.title}>
            Course Helper
        </Typography>
        <TextField
            label="Roll Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="rollnumber"
            value={formData.rollnumber}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          /> <FormControlLabel
          control={
            <Checkbox
            
              checked={formData.rememberMe}
              onChange={handleCheckboxChange}
              name="rememberMe"
              color="primary"
            />
          }
          label="Remember Me"
          sx={{ marginBottom: 2 }}
        />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            fullWidth
          >
            Login
          </Button>
    </div>
  );
};

export default LoginForm;
