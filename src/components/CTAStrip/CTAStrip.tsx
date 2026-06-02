import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { PHONE } from '../../config';

const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=41.7071976,44.8039371&z=17&output=embed&hl=ka';

export default function CTAStrip() {
  return (
    <Box component="section" sx={{ bgcolor: 'primary.main', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Phone CTA */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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
          </Grid>

          {/* Google Maps embed */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="iframe"
              src={MAP_EMBED_URL}
              title="ICA მდებარეობა"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sx={{
                width: '100%',
                height: 300,
                border: 'none',
                borderRadius: 2,
                display: 'block',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
