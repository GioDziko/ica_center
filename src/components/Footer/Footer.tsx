import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { PHONE } from '../../config';
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#1A1010', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={logo}
              alt="ICA"
              sx={{ height: 40, mb: 2, display: 'block' }}
            />
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              ICA — სასწავლო ცენტრი მოსწავლეებისთვის
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ color: 'grey.300', mb: 1 }}>
              <Box
                component="a"
                href={`tel:${PHONE}`}
                sx={{ color: 'inherit', textDecoration: 'none' }}
              >
                {PHONE}
              </Box>
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              მისამართი: —
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        <Typography variant="caption" sx={{ color: 'grey.600' }}>
          © 2026 ICA. ყველა უფლება დაცულია
        </Typography>
      </Container>
    </Box>
  );
}
