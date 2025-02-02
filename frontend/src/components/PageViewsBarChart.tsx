import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';

interface DataEntry {
  prediction: number;
  Gender: number;
  State: number;
  Age: number;
  Contract: number;
  Tenure_in_Months: number;
  Monthly_Charge: number;
  Total_Charges: number;
  Total_Revenue: number;
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

  const totalYesMale = jsonData.filter((entry) => entry.prediction === 1 && entry.Gender === 1).length;
  const totalNoMale = jsonData.filter((entry) => entry.prediction === 0 && entry.Gender === 1).length;
  const totalYesFemale = jsonData.filter((entry) => entry.prediction === 1 && entry.Gender === 0).length;
  const totalNoFemale = jsonData.filter((entry) => entry.prediction === 0 && entry.Gender === 0).length;
  
  const stateData = [
    { label: 'Delhi', value: jsonData.filter((entry) => entry.State === 0 && entry.prediction === 0).length },
    { label: 'Gujarat', value: jsonData.filter((entry) => entry.State === 1 && entry.prediction === 0).length },
    { label: 'Karnataka', value: jsonData.filter((entry) => entry.State === 2 && entry.prediction === 0).length },
    { label: 'Maharashtra', value: jsonData.filter((entry) => entry.State === 3 && entry.prediction === 0).length },
    { label: 'Tamil Nadu', value: jsonData.filter((entry) => entry.State === 4 && entry.prediction === 0).length },
    { label: 'Telangana', value: jsonData.filter((entry) => entry.State === 5 && entry.prediction === 0).length },
    { label: 'West Bengal', value: jsonData.filter((entry) => entry.State === 6 && entry.prediction === 0).length },
  ];

  const ageGroups = [
    { label: '18-35', min: 18, max: 35 },
    { label: '36-50', min: 36, max: 50 },
    { label: '51+', min: 51, max: Infinity },
  ];

  const ageGroupData = ageGroups.map((group) => ({
    label: group.label,
    value: jsonData.filter((entry) => entry.Age >= group.min && entry.Age <= group.max).length,
  }));

  const barChartData = [
    { label: 'Yes & Male', value: totalYesMale },
    { label: 'No & Male', value: totalNoMale },
    { label: 'Yes & Female', value: totalYesFemale },
    { label: 'No & Female', value: totalNoFemale },
  ];
  const contractData = jsonData.map((entry, index) => ({ x: index * 5, y: entry.Contract }));
  const financialData = jsonData.map((entry, index) => ({
    x: index,
    y: entry.Monthly_Charge,
    id: index,
  }));
  
  return (
    <Card sx={{ maxWidth: 1200, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Prediction Summary
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 3, flexWrap: 'wrap' }}>
          <Chip label={`Yes & Male: ${totalYesMale}`} color="primary" sx={{ visibility: 'hidden' }}/>
          <Chip label={`No & Male: ${totalNoMale}`} color="secondary" sx={{ visibility: 'hidden' }}/>
          <Chip label={`Yes & Female: ${totalYesFemale}`} color="primary" sx={{ visibility: 'hidden' }} />
          <Chip label={`No & Female: ${totalNoFemale}`} color="secondary" sx={{ visibility: 'hidden' }}/>
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              Gender Prediction
            </Typography>
            <BarChart
              series={[{ data: barChartData.map((item) => item.value), color: colorPalette[1] }]}
              xAxis={[{ data: barChartData.map((item) => item.label), scaleType: 'band' }]}
              width={500}
              height={300}
            />
          </Box>

          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              State-wise Not Churned Predictions
            </Typography>
            <PieChart
              series={[{
                data: stateData.map((item, index) => ({ id: index, value: item.value, label: item.label })),
                innerRadius: 40,
                outerRadius: 100,
                paddingAngle: 5,
              }]}
              width={500}
              height={300}
            />
          </Box>
          
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              Age Demographics
            </Typography>
            <BarChart
              series={[{ data: ageGroupData.map((item) => item.value), color: colorPalette[2] }]}
              xAxis={[{ data: ageGroupData.map((item) => item.label), scaleType: 'band' }]}
              width={500}
              height={300}
            />
          </Box>
          
          
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              Financial Overview (Monthly Charge vs. Index)
            </Typography>
            <ScatterChart
              series={[{
                data: financialData,
                color: colorPalette[2],
              }]}
              xAxis={[{ label: 'Index', data: jsonData.map((_, i) => i) }]}
              yAxis={[{ label: 'Monthly Charge' }]}
              width={500}
              height={300}
              grid={{ vertical: true, horizontal: true }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <Typography variant="h6" component="div" gutterBottom>
              Contract Type Trends
            </Typography>
            <ScatterChart
              series={[{
                data: contractData,
                color: colorPalette[1],
              }]}
              xAxis={[{ label: 'Index', data: contractData.map((point) => point.x) }]}
              yAxis={[{ label: 'Contract Type' }]}
              width={500}
              height={300}
              grid={{ vertical: true, horizontal: true }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PageViewsBarChart;
