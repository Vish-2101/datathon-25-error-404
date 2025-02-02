import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

interface DataEntry {
  prediction: number; // 1 for Yes, 0 for No
  Gender: number; // 1 for Male, 0 for Female
}

interface PageViewsBarChartProps {
  jsonData: DataEntry[];
}

const PageViewsBarChart: React.FC<PageViewsBarChartProps> = ({ jsonData = [] }) => {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  // Count occurrences of each category
  const totalYesMale = jsonData.filter((entry) => entry.prediction === 1 && entry.Gender === 1).length;
  const totalNoMale = jsonData.filter((entry) => entry.prediction === 0 && entry.Gender === 1).length;
  const totalYesFemale = jsonData.filter((entry) => entry.prediction === 1 && entry.Gender === 0).length;
  const totalNoFemale = jsonData.filter((entry) => entry.prediction === 0 && entry.Gender === 0).length;

  const barChartData = [
    { label: 'Yes & Male', value: totalYesMale },
    { label: 'No & Male', value: totalNoMale },
    { label: 'Yes & Female', value: totalYesFemale },
    { label: 'No & Female', value: totalNoFemale },
  ];

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Prediction Summary
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 3 }}>
          <Chip label={`Yes & Male: ${totalYesMale}`} color="primary" />
          <Chip label={`No & Male: ${totalNoMale}`} color="secondary" />
          <Chip label={`Yes & Female: ${totalYesFemale}`} color="primary" />
          <Chip label={`No & Female: ${totalNoFemale}`} color="secondary" />
        </Stack>
        <BarChart
          series={[
            {
              data: barChartData.map((item) => item.value),
              label: 'Predictions',
              color: colorPalette[1],
            },
          ]}
          xAxis={[{ data: barChartData.map((item) => item.label), scaleType: 'band' }]}
          width={600}
          height={400}
        />
      </CardContent>
    </Card>
  );
};

export default PageViewsBarChart;
