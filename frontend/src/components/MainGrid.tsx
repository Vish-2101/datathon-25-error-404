import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
// import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';


export default function MainGrid() {

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      
      <Grid
        container
        spacing={2}
        columns={14}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        
        {/* <Grid size={{ xs: 12, md: 14 }}>
          <SessionsChart />
        </Grid> */}
        <Grid size={{ xs: 10, sm: 6, lg: 15 }}>
          <HighlightedCard />
        </Grid>
        {/* <Grid size={{ xs: 12, md: 7 }}>
          <PageViewsBarChart />
        </Grid> */}
        {/* <Grid size={{ xs: 12, md: 4 }}>
          <ChartUserByCountry />
        </Grid> */}
      </Grid>
      {/* <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
          </Stack>
        </Grid>
      </Grid> */}
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}