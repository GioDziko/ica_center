import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { PHONE } from '../../config';
import logo from '../../assets/logo.png';

export default function Navbar() {
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setElevated(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar position="sticky" color="primary" elevation={elevated ? 4 : 0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          component="img"
          src={logo}
          alt="ICA"
          sx={{ height: 40, display: 'block' }}
        />
        <Button
          variant="outlined"
          color="inherit"
          href={`tel:${PHONE}`}
          sx={{
            borderColor: 'rgba(255,255,255,0.7)',
            color: 'white',
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          {PHONE}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
