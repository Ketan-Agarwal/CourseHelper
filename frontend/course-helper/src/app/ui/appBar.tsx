'use client';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { getDecodedToken } from '../lib/decode';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar({
    setSearchQuery,
  }: {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  }) {
    React.useState<null | HTMLElement>(null);
  const [username, setUsername] = React.useState<string | null>(null);
  const router = useRouter();



  React.useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decoded = getDecodedToken(token);
      setUsername(decoded?.username || '');
    }
  }, []);

  const handleLoginLogout = () => {
    if (username) {
      // Log out
      localStorage.removeItem('jwtToken');
      setUsername(null);
      router.push('/login');
    } else {
      router.push('/login');
    }
  };
  const handleLoginClick = () => {
      router.push('/login');  // Redirect to login page only if no username
  };


  return (
    <Box sx={{ flexGrow: 1, display: 'fixed'}}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
          >
            Course Helper
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'block', md: 'flex' }, fontSize: { xs: '20px !important' } }}>
          <Typography variant="h6" color="inherit">
              {username ? `Hi, ${username}` :  (
              <span
                style={{ cursor: 'pointer' }}  // Add pointer cursor to indicate it's clickable
                onClick={handleLoginClick}
              >
                Login
              </span>
            )}
            </Typography>

            <Typography variant="h6" color="inherit" sx={{ cursor: 'pointer', marginLeft: '12px' }} onClick={handleLoginLogout}>
              {username ? <LogoutIcon/> : ''}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
