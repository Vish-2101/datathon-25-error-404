import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';


// const [jsonData, setJsonData] = React.useState<DataEntry[]>([]);

interface DataEntry {
  prediction: number;
  Gender: number;
}

interface PageViewsBarChartProps {
  jsonData: DataEntry[]; // Expecting an array of data objects
}

const PageViewsBarChart: React.FC<PageViewsBarChartProps> = ({ jsonData = [] }) => {

  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  // Count occurrences of each category
  const totalPredictionsYes = jsonData.filter((entry) => entry.prediction === 1).length;
  const totalPredictionsNo = jsonData.filter((entry) => entry.prediction === 0).length;
  const totalGenderMale = jsonData.filter((entry) => entry.Gender === 1).length;
  const totalGenderFemale = jsonData.filter((entry) => entry.Gender === 0).length;

  const barChartData = [
    { label: 'Predicted: Yes', value: totalPredictionsYes },
    { label: 'Predicted: No', value: totalPredictionsNo },
    { label: 'Gender: Male', value: totalGenderMale },
    { label: 'Gender: Female', value: totalGenderFemale },
  ];

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Prediction Summary
        </Typography>
        <Stack direction="row" spacing={4} justifyContent="center" sx={{ my: 3 }}>
          <Chip label={`Yes: ${totalPredictionsYes}`} color="primary" />
          <Chip label={`No: ${totalPredictionsNo}`} color="secondary" />
          <Chip label={`Male: ${totalGenderMale}`} color="primary" />
          <Chip label={`Female: ${totalGenderFemale}`} color="secondary" />
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
