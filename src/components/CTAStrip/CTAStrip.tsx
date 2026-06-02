import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { PHONE } from '../../config';

export default function CTAStrip() {
  return (
    <Box component="section" sx={{ bgcolor: 'primary.main', py: 8 }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" color="white" gutterBottom>
          დაგვიკავშირდი
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          href={`tel:${PHONE}`}
          sx={{
            borderColor: 'rgba(255,255,255,0.7)',
            color: 'white',
            px: 4,
            py: 1.5,
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          {PHONE}
        </Button>
      </Container>
    </Box>
  );
}
