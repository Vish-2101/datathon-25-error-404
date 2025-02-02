import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

import { IndiaFlag, UsaFlag, BrazilFlag, GlobeFlag } from "../internals/components/CustomIcons";

function formatValue(value: string | number): string {
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
  if (!isNaN(numericValue)) {
    if (numericValue >= 1000000) {
      return (numericValue / 1000000).toFixed(1) + 'M';
    } else if (numericValue >= 1000) {
      return (numericValue / 1000).toFixed(1) + 'K';
    }
    return numericValue.toString();
  }
  return 'No info available';
}

interface CountryData {
  name: string;
  value: number;
  users: number;
  color: string;
}

interface UsersByCountryData {
  totalUsers: string;
  countries: CountryData[];
  colors: string[];
}

interface StyledTextProps {
  variant: "primary" | "secondary";
}

const StyledText = styled("text", {
  shouldForwardProp: (prop) => prop !== "variant",
})<StyledTextProps>(({ theme }) => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fill: (theme.vars || theme).palette.text.secondary,
}));

interface PieCenterLabelProps {
  primaryText: string;
  secondaryText: string;
}

function PieCenterLabel({ primaryText, secondaryText }: PieCenterLabelProps) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </>
  );
}

export default function ChartUserByCountry({ predictionData }: { predictionData: any[] }) {
  const [data, setData] = React.useState<UsersByCountryData | null>(null);

  const stateMapping: Record<number, string> = {
    0: "Delhi",
    1: "Gujarat",
    2: "Karnataka",
    3: "Maharashtra",
    4: "Tamil Nadu",
    5: "Telangana",
    6: "West Bengal",
  };

  React.useEffect(() => {
    if (predictionData && predictionData.length) {
      const stateCounts: Record<string, number> = {};
      let totalUsers = 0;

      predictionData.forEach(item => {
        const stateName = stateMapping[item.state];
        if (stateName) {
          stateCounts[stateName] = (stateCounts[stateName] || 0) + 1;
          totalUsers++;
        }
      });

      const countries = Object.entries(stateCounts).map(([name, count]) => ({
        name,
        value: (count / totalUsers) * 100,
        users: count,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      }));

      setData({
        totalUsers: totalUsers.toString(),
        countries,
        colors: countries.map(c => c.color),
      });
    }
  }, [predictionData]);

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  const flagComponents: Record<string, JSX.Element> = {
    India: <IndiaFlag />,
    USA: <UsaFlag />,
    Brazil: <BrazilFlag />,
    Other: <GlobeFlag />,
  };

  return (
    <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Users by State
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PieChart
            colors={data.colors}
            margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
            series={[
              {
                data: data.countries.map((country) => ({ label: country.name, value: country.users })),
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: "global", highlighted: "item" },
              },
            ]}
            height={300}
            width={300}
            slotProps={{ legend: { hidden: true } }}
          >
            <PieCenterLabel primaryText={formatValue(data.totalUsers)} secondaryText="Total Users" />
          </PieChart>
        </Box>
        {data.countries.map((country, index) => (
          <Stack key={index} direction="row" sx={{ alignItems: "center", gap: 2, pb: 2 }}>
            {flagComponents[country.name] || <GlobeFlag />}
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "500" }}>
                  {country.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {country.value.toFixed(2)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label="Number of users by state"
                value={country.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: country.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
