import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PHONE } from '../../config';
import logo from '../../assets/logo.png';

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '90vh',
        bgcolor: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        py: 8,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          component="img"
          src={logo}
          alt="ICA"
          sx={{ height: 200, mb: 4 }}
        />
        <Typography variant="h2" color="white" gutterBottom>
          შენი წარმატება იწყება აქ
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'rgba(255,255,255,0.85)', mb: 4 }}
        >
          ICA — სასწავლო ცენტრი, სადაც მოსწავლეები ეუფლებიან ცოდნას
          გამოცდილი პედაგოგების მეშვეობით.
        </Typography>
        <Button
          variant="contained"
          size="large"
          href={`tel:${PHONE}`}
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            fontWeight: 700,
            px: 4,
            py: 1.5,
            '&:hover': {
              bgcolor: 'grey.100',
              transform: 'scale(1.03)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {PHONE}
        </Button>
      </Container>
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: 24,
          color: 'rgba(255,255,255,0.6)',
          animation: 'bounce 1.5s ease-in-out infinite',
        }}
      >
        <KeyboardArrowDownIcon fontSize="large" />
      </Box>
    </Box>
  );
}
