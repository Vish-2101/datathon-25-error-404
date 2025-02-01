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

export default function ChartUserByCountry() {
  const [data, setData] = React.useState<UsersByCountryData | null>(null);

  React.useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((jsonData) => {
        if (jsonData.usersByCountry) {
          setData(jsonData.usersByCountry);
        } else {
          console.error("usersByCountry section not found in JSON");
        }
      })
      .catch((err) => console.error("Error loading data:", err));
  }, []);

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
    <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1, width: '70%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Users by country
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PieChart
            colors={data.colors}
            margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
            series={[
              {
                data: data.countries.map((country) => ({ label: country.name, value: country.users })),
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: "global", highlighted: "item" },
              },
            ]}
            height={260}
            width={260}
            slotProps={{ legend: { hidden: true } }}
          >
            <PieCenterLabel primaryText={formatValue(data.totalUsers)} secondaryText="Total Users" />
          </PieChart>
        </Box>
        {data.countries.map((country, index) => (
          <Stack key={index} direction="row" sx={{ alignItems: "center", gap: 2, pb: 2 }}>
            {flagComponents[country.name]}
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "500" }}>
                  {country.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {country.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label="Number of users by country"
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
