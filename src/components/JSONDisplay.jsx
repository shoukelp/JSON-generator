// src/components/JSONDisplay.jsx
import React, { useState } from "react";

const JSONDisplay = ({ jsonOutput }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="json-display">
      <h3>Generated JSON</h3>
      <div className="textarea-container">
        <textarea
          readOnly
          value={jsonOutput}
          rows={20}
          className="output-textarea"
        />
        <button onClick={handleCopy} className="copy-button">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default JSONDisplay;