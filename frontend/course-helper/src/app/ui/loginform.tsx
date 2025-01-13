'use client';
import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import LockOutlined from '@mui/icons-material/LockOutlined';
import styles from './loginform.module.css';
import { FormControlLabel, Checkbox } from '@mui/material';
// import Link from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDecodedToken } from '../lib/decode';
const LoginForm = () => {
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


  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const [error, setError] = useState('');

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://course-helper-back.vercel.app/auth/login", formData);

      if (response.status === 200) {
        const { token } = response.data;

            localStorage.setItem("jwtToken", token);
            router.push('/');
        
      }
    } catch (error: any) {
      setError('Invalid username or password');
      
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit} className={styles.formWrapper}>

        <LockOutlined className={styles.icon}/>
        <Typography variant='h5' className={styles.title}>
            Course Helper
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
        {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            fullWidth
          >
            Login
          </Button>
          
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
        Don't have an account?{' '}
        <Link href="/register">
          Sign Up
        </Link>
      </Typography>
          </form>
          
    </div>
  );
};

export default LoginForm;
