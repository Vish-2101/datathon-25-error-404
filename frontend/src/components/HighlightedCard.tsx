import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function HighlightedCard() {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      console.log(file);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        component="h2"
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 2,
          pt: 2,
          textAlign: "center",
        }}
      >
        Upload DataSet
      </Typography>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          type="file"
          accept=".csv, .xlsx"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            textTransform: "none",
            fontSize: "1rem",
            padding: "10px 20px",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "#397ecc",
            },
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          Choose File
        </Button>
        {fileName && (
          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            Selected file: {fileName}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
