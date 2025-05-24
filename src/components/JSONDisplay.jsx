// src/components/JSONDisplay.jsx
import React from "react";

const JSONDisplay = ({ jsonOutput }) => (
  <div style={{ marginTop: 20 }}>
    <h3>Generated JSON</h3>
    <textarea readOnly value={jsonOutput} rows={20} style={{ width: "100%" }} />
  </div>
);

export default JSONDisplay;
