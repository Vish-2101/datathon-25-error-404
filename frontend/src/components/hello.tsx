import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import data from "../components/churn_data.json";

Chart.register(CategoryScale);

const ChurnDashboard: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDashboard(true);
    }, 20000); // 30 seconds delay

    return () => clearTimeout(timer); // Cleanup if component unmounts
  }, []);

  if (!showDashboard) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        {/* <CircularProgress /> */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          {/* Loading Churn Dashboard... Please wait 30 seconds. */}
        </Typography>
      </Container>
    );
  }

  // Bar chart data for churn rates
  const churnRates = {
    labels: ["Basic", "Pro", "Enterprise"],
    datasets: [
      {
        label: "Churn Risk (%)",
        data: [20, 10, 5],
        backgroundColor: ["#f44336", "#ff9800", "#4caf50"],
        barPercentage: 0.5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Churn Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Current Churn Rate
              </Typography>
              <Typography variant="h4">
                {data.churn_overview.kpis.current_churn_rate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Revenue at Risk
              </Typography>
              <Typography variant="h4">
                {data.churn_overview.kpis.total_revenue_at_risk}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Churn Risk by Tier
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <div style={{ width: "100%", height: "300px" }}>
          <Bar data={churnRates} options={chartOptions} />
        </div>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Customer Details
      </Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Churn Probability</TableCell>
              <TableCell>Churn Risk Factors</TableCell>
              <TableCell>Suggested Retention Strategy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.interactive_customer_list.details.map((customer) => (
              <TableRow key={customer.customer_id}>
                <TableCell>{customer.customer_id}</TableCell>
                <TableCell>{customer.churn_probability_score}</TableCell>
                <TableCell>{customer.churn_risk_factors}</TableCell>
                <TableCell>{customer.suggested_retention_strategy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default ChurnDashboard;
