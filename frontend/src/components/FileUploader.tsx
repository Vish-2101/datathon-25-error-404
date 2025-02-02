import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileUploaderProps {
  onUploadSuccess: (data: any) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
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
      const response = await fetch("https://23ad-14-142-143-98.ngrok-free.app/predict", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Prediction result:", result);
        onUploadSuccess(result); // Pass the JSON data to parent component
      } else {
        console.error("Error uploading file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{
          backgroundColor: "#3d9fff",
          color: "#fff",
          textTransform: "none",
          fontSize: "1rem",
          padding: "10px 20px",
          borderRadius: "6px",
          "&:hover": {
            backgroundColor: "#3d9fff",
          },
          mb: 2
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        Choose File
      </Button>
      {fileName && (
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Selected file: {fileName}
        </Typography>
      )}
      {file && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2cd152",
            color: "#fff",
            textTransform: "none",
            fontSize: "1rem",
            padding: "10px 20px",
            borderRadius: "6px",
            marginBottom: "20px",
            "&:hover": {
              backgroundColor: "#2cd152",
            },
          }}
          onClick={handleFileUpload}
        >
          Upload File
        </Button>
      )}
    </Box>
  );
};

export default FileUploader;
