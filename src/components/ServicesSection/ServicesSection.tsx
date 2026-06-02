import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import SubjectCard from './SubjectCard';
import { subjects } from '../../data/subjects';

export default function ServicesSection() {
  return (
    <Box id="services" component="section" sx={{ bgcolor: '#F8F6F2', py: 10, scrollMarginTop: '64px' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" gutterBottom>
            ჩვენი კურსები
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 3,
              bgcolor: 'primary.main',
              mx: 'auto',
              mb: 2,
            }}
          />
          <Typography variant="subtitle1" color="text.secondary">
            აირჩიე შენთვის სასურველი კურსი
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {subjects.map((subject) => (
            <Grid key={subject.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <SubjectCard
                name={subject.name}
                schedule={subject.schedule}
                price={subject.price}
                Icon={subject.Icon}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
