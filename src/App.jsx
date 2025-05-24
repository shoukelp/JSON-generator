import React, { useState, useEffect } from "react";
import TemplateSelector from "./components/TemplateSelector";
import JSONDisplay from "./components/JSONDisplay";
import DownloadButton from "./components/DownloadButton";
import Footer from "./components/Footer";
import generateTemplate from "./utils/templateGenerator";
import "./index.css";

const App = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("manifest_bp");
  const [name, setName] = useState("Example Pack");
  const [description, setDescription] = useState("This is an example");
  const [version, setVersion] = useState("1.0.0");
  const [jsonOutput, setJsonOutput] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [versionError, setVersionError] = useState("");

  // Convert description keeping § and newlines
  const convertDescription = (desc) =>
    desc.replace(/§/g, "\u00A7").replace(/\r?\n/g, "\n");

  // Normalize version to 3 parts: "1.2" => "1.2.0"
  const normalizeVersion = (v) => {
    const parts = v.split(".");
    while (parts.length < 3) parts.push("0");
    return parts.slice(0, 3).map((p) => String(Number(p))).join(".");
  };

  // Validate version format x.y.z with numbers and dots
  const isValidVersion = (v) => /^\d+(\.\d+){0,2}$/.test(v);

  // Validation functions
  const validateName = (value) => {
    if (value.trim() === "") {
      setNameError("Name cannot be empty");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const validateDescription = (value) => {
    if (value.trim() === "") {
      setDescriptionError("Description cannot be empty");
      return false;
    } else {
      setDescriptionError("");
      return true;
    }
  };

  const validateVersion = (value) => {
    if (value.trim() === "") {
      setVersionError("Version cannot be empty");
      return false;
    }
    if (!isValidVersion(value)) {
      setVersionError("Invalid version format");
      return false;
    }
    setVersionError("");
    return true;
  };

  const generateJSON = () => {
    const normalizedVersion = normalizeVersion(version);
    const versionArray = normalizedVersion.split(".").map((v) => parseInt(v, 10));
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

  // Handlers with validation
  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    validateDescription(e.target.value);
  };

  const handleVersionChange = (e) => {
    const value = e.target.value;
    if (/^[0-9.]*$/.test(value)) {
      setVersion(value);
      validateVersion(value);
    }
  };

  // Version increment/decrement with minimum 0.1.0
  const incrementVersion = () => {
    let [x, y, z] = version.split(".").map((v) => parseInt(v, 10));
    if (isNaN(x)) x = 0;
    if (isNaN(y)) y = 0;
    if (isNaN(z)) z = 0;

    if (z < 99) {
      z++;
    } else {
      z = 0;
      if (y < 99) {
        y++;
      } else {
        y = 0;
        x++;
      }
    }

    setVersion(`${x}.${y}.${z}`);
    validateVersion(`${x}.${y}.${z}`);
  };

  const decrementVersion = () => {
    let [x, y, z] = version.split(".").map((v) => parseInt(v, 10));
    if (isNaN(x)) x = 0;
    if (isNaN(y)) y = 0;
    if (isNaN(z)) z = 0;

    // Minimum version is 0.0.1, can't go below this
    if (x === 0 && y === 0 && z === 1) {
      return;
    }

    if (z > 0) {
      z--;
    } else {
      if (y > 0) {
        y--;
        z = 99;
      } else {
        if (x > 0) {
          x--;
          y = 99;
          z = 99;
        }
      }
    }

    // Clamp to minimum 0.0.1
    if (x === 0 && y === 0 && z === 0) {
      y = 0;
      z = 1;
    }

    setVersion(`${x}.${y}.${z}`);
    validateVersion(`${x}.${y}.${z}`);
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

      <div className="source-note">
        <p>
          <a href="https://wiki.bedrock.dev/guide/understanding-json" target="_blank" rel="noopener noreferrer">
            Understanding JSON
          </a>
        </p>
        <p>
          <a href="https://minecraft.fandom.com/wiki/Formatting_codes" target="_blank" rel="noopener noreferrer">
            Formatting Codes
          </a>
        </p>
      </div>

      <div className="template-selector">
        <TemplateSelector selectedTemplate={selectedTemplate} onChange={handleTemplateChange} />
      </div>

      {(selectedTemplate === "manifest_bp" || selectedTemplate === "manifest_rp") && (
        <>
          <div className="input-group">
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                className={`input-style ${nameError ? "input-error" : ""}`}
              />
            </div>

            <div className="version-input-wrapper">
              <input
                type="text"
                placeholder="Version (e.g. 1.0.0)"
                value={version}
                onChange={handleVersionChange}
                className={`input-style ${versionError ? "input-error" : ""}`}
              />
              <div className="version-buttons">
                <button type="button" onClick={incrementVersion} aria-label="Increase version">▲</button>
                <button type="button" onClick={decrementVersion} aria-label="Decrease version">▼</button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <textarea
              placeholder="Description (supports formartting codes & multiline)"
              value={description}
              onChange={handleDescriptionChange}
              rows={4}
              className={`input-style textarea-style ${descriptionError ? "input-error" : ""}`}
            />
          </div>
          {(nameError || versionError || descriptionError) && (
            <div className="error-text-group">
              {nameError && <div>{nameError}</div>}
              {versionError && <div>{versionError}</div>}
              {descriptionError && <div>{descriptionError}</div>}
            </div>
          )}
        </>
      )}

      <JSONDisplay jsonOutput={jsonOutput} />
      <DownloadButton jsonOutput={jsonOutput} />
      <Footer />
    </div>
  );
};

export default App;