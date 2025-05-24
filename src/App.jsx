// src/App.jsx
import React, { useState } from "react";
import TemplateSelector from "./components/TemplateSelector";
import JSONDisplay from "./components/JSONDisplay";
import DownloadButton from "./components/DownloadButton";
import generateTemplate from "./utils/templateGenerator";

const App = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("manifest_bp");
  const [jsonOutput, setJsonOutput] = useState(
    JSON.stringify(generateTemplate("manifest_bp"), null, 2)
  );

  const handleTemplateChange = (e) => {
    const templateKey = e.target.value;
    setSelectedTemplate(templateKey);
    setJsonOutput(JSON.stringify(generateTemplate(templateKey), null, 2));
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Minecraft JSON Generator</h1>
      <TemplateSelector
        selectedTemplate={selectedTemplate}
        onChange={handleTemplateChange}
      />
      <JSONDisplay jsonOutput={jsonOutput} />
      <DownloadButton jsonOutput={jsonOutput} />
    </div>
  );
};

export default App;
