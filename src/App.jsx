// src/App.jsx
import React, { useState, useEffect } from "react";
import TemplateSelector from "./components/TemplateSelector";
import JSONDisplay from "./components/JSONDisplay";
import DownloadButton from "./components/DownloadButton";
import Footer from "./components/Footer"; // Import Footer
import generateTemplate from "./utils/templateGenerator";
import "./index.css";

const App = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("manifest_bp");
  const [name, setName] = useState("Example Pack");
  const [description, setDescription] = useState("This is an example");
  const [version, setVersion] = useState("1.0.0");
  const [jsonOutput, setJsonOutput] = useState("");

  const convertDescription = (desc) =>
    desc.replace(/§/g, "\u00A7").replace(/\r?\n/g, "\n");

  const generateJSON = () => {
    const versionArray = version.split(".").map((v) => parseInt(v, 10));
    const desc = convertDescription(description);

    return JSON.stringify(
      generateTemplate(selectedTemplate, {
        name,
        description: desc,
        version: versionArray,
      }),
      null,
      2
    );
  };

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  useEffect(() => {
    setJsonOutput(generateJSON());
  }, [selectedTemplate, name, description, version]);

  return (
    <div className="container">
      <h1>Minecraft JSON Generator</h1>

      <p className="description">
        This tool helps you create JSON files for Minecraft Bedrock <strong>behavior packs, resource packs, blocks, items, and sound definitions</strong>. You can edit the name, version, and description directly.
      </p>

      <p className="source-note">
        <a href="https://wiki.bedrock.dev/guide/understanding-json">Understanding JSON</a>
      </p>

      <div className="template-selector">
        <TemplateSelector selectedTemplate={selectedTemplate} onChange={handleTemplateChange} />
      </div>

      {(selectedTemplate === "manifest_bp" || selectedTemplate === "manifest_rp") && (
        <>
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-style"
            />
            <input
              type="text"
              placeholder="Version (e.g. 1.0.0)"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="input-style"
            />
          </div>

          <textarea
            placeholder="Description (supports § color code & multiline)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="input-style textarea-style"
          />
        </>
      )}

      <JSONDisplay jsonOutput={jsonOutput} />
      <DownloadButton jsonOutput={jsonOutput} />
      <Footer />
    </div>
  );
};

export default App;