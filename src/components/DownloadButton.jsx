// src/components/DownloadButton.jsx
import React from "react";

const DownloadButton = ({ jsonOutput }) => {
  const handleDownload = () => {
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "template.json";
    link.click();
  };

  return (
    <button onClick={handleDownload} className="download-button">
      Download JSON
    </button>
  );
};

export default DownloadButton;