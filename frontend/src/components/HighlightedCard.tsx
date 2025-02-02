import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import FileUploader from "./FileUploader"; // Import new component
import PageViewsBarChart from "./PageViewsBarChart"; 
import ChartUserByCountry from "./ChartUserByCountry";

export default function HighlightedCard() {
  const [uploadResult, setUploadResult] = React.useState<any>(null);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <InsightsRoundedIcon />
        <Typography component="h2" variant="subtitle2" gutterBottom sx={{ fontWeight: "600" }}>
          Enter DataSet
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: "8px" }}>
          Uncover performance and visitor insights with our data wizardry.
        </Typography>
        
        {/* FileUploader handles upload and returns JSON */}
        <FileUploader onUploadSuccess={setUploadResult} />

 
        {uploadResult && <PageViewsBarChart jsonData={uploadResult} />}
        {uploadResult && <ChartUserByCountry jsonData={uploadResult} />}
        

      </CardContent>
    </Card>
  );
}
