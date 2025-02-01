import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function HighlightedCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://f974-152-52-34-131.ngrok-free.app/predict", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Prediction result:", result);
      } else {
        console.error("Error uploading file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <InsightsRoundedIcon />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          Enter DataSet
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
          Uncover performance and visitor insights with our data wizardry.
        </Typography>
        <input
          type="file"
          accept=".csv, .xlsx"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <Button
          variant="contained"
          startIcon={<ChevronRightRoundedIcon />}
          sx={{
            backgroundColor: "#1976d2",
            color: "#000",
            textTransform: "none",
            fontSize: "1rem",
            padding: "10px 20px",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "#397ecc",
            },
            mb: 2
          }}
          onClick={() => fileInputRef.current?.click()}
          fullWidth={isSmallScreen}
        >
          Choose File
        </Button>
        {fileName && (
          <>
            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
              Selected file: {fileName}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#28a745",
                color: "#fff",
                textTransform: "none",
                fontSize: "1rem",
                padding: "10px 20px",
                borderRadius: "6px",
                "&:hover": {
                  backgroundColor: "#218838",
                },
              }}
              onClick={handleFileUpload}
              fullWidth={isSmallScreen}
            >
              Upload File
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
