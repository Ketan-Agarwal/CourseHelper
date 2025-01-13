'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert, Snackbar} from '@mui/material';
import LockOutlined from '@mui/icons-material/LockOutlined';
import styles from './loginform.module.css';
import Link from 'next/link';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { getDecodedToken } from '../lib/decode';
const SignUpForm = () => {
    const router = useRouter();
      useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decoded = getDecodedToken(token);
          if (decoded) {
            router.push('/');
          }
        }
      }, [router]);
    
    const [alertMessage, setAlertMessage] = useState('');
    const sleep = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };
const [openAlert, setOpenAlert] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  }
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
        
        const response = await axios.post("http://localhost:3001/auth/register", formData);
        if (response.status === 201) {
            setAlertMessage("Registered Successfully! Please Login!")
            setOpenAlert(true);
            await sleep(2000);
          router?.push("/login");
        }
        if (response.status === 400) {
            alert("Username already exists.");
          }
      } catch (error: any) {
        console.error("Error during signup:", error);
        if (error.status === 400) {
            alert("Username/email already exists.");
            // router?.push("/login");
          }

      }
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <LockOutlined className={styles.icon} />
        <Typography variant='h5' className={styles.title}>
          Sign Up
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          type="email"
          value={formData.email}
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
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          fullWidth
        >
          Sign Up
        </Button>
      <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
        Already have an account?{' '}
        <Link href="/login">
          Login
        </Link>
      </Typography>
      </form>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} severity={alertMessage.includes('Failed') ? 'error' : 'success'} variant="filled">
                {alertMessage}
              </Alert>
            </Snackbar>
    </div>
  );
};

export default SignUpForm;
