import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import Result from './result';

// import data from '../../public/data.json'; // Importing data.barGraphData from JSON file


export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  const barChartData = [
    { label: 'Predicted: Yes', value: Result.total_predictions_with_1 },
    { label: 'Predicted: No', value: Result.total_prediction_with_0 },
    { label: 'Gender: Male', value: Result.gender_1 },
    { label: 'Gender: Female', value: Result.gender_0 },
  ];

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Prediction Summary
        </Typography>
        <Stack direction="row" spacing={4} justifyContent="center" sx={{ my: 3 }}>
          <Chip label={`Yes: ${Result.total_predictions_with_1}`} color="primary" />
          <Chip label={`No: ${Result.total_prediction_with_0}`} color="secondary" />
          <Chip label={`Male: ${Result.gender_1}`} color="primary" />
          <Chip label={`Female: ${Result.gender_0}`} color="secondary" />
        </Stack>
        <BarChart
          series={[
            {
              data: barChartData.map(item => item.value),
              label: 'Predictions',
              color: colorPalette[1],
            }
          ]}
          xAxis={[{ data: barChartData.map(item => item.label), scaleType: 'band' }]}
          width={600}
          height={400}
        />
      </CardContent>
    </Card>
  );
}

