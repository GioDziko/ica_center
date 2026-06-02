import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface SubjectCardProps {
  name: string;
  schedule: string;
  price: string;
  Icon: ComponentType<SvgIconProps>;
}

export default function SubjectCard({ name, schedule, price, Icon }: SubjectCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        borderTop: '3px solid',
        borderColor: 'primary.main',
        borderRadius: 2,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box sx={{ color: 'primary.main', mb: 1.5 }}>
          <Icon fontSize="medium" />
        </Box>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {schedule}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
}
