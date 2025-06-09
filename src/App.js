import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

import "./index.css";

import Footer from "./components/Footer";
import TemplateSelector from "./components/TemplateSelector";
import Inputs from "./components/Inputs";
import JSONOutput from "./components/JSONOutput";

import manifest from "./templates/manifest";
import block from "./templates/block";
import item from "./templates/item";
import skin from "./templates/skin";
import sound from "./templates/sound";

import { validateVersionFormat, convertDescription } from "./utils";

const templates = [
  { key: "", label: "Select Template" },
  { key: "manifest", label: "Manifest (Resource, Behaviour, Skin Pack)", fn: manifest },
  { key: "block", label: "Block Definition", fn: block },
  { key: "item", label: "Item Definition", fn: item },
  { key: "skin", label: "Skin Definition", fn: skin },
  { key: "sound", label: "Sound Definition", fn: sound },
];

const inputFieldsByTemplate = {
  manifest: ["name", "version", "minEngineVersion", "description", "packType", "uuid", "uuidModule"],
  block: [],
  item: [],
  sound: [],
};

const minEngineVersions = [
  "1.21.80", "1.21.70", "1.21.60", "1.21.40", "1.21.20", "1.21.0",
  "1.20.50", "1.20.30", "1.20.0",
  "1.19.70", "1.19.60", "1.19.50", "1.19.10", "1.19.0",
  "1.18.30", "1.18.10", "1.18.0",
  "1.17.30", "1.17.10", "1.17.0",
  "1.16.200", "1.16.100", "1.16.40", "1.16.20", "1.16.0",
  "1.14.60"
];

function App() {
  const [templateKey, setTemplateKey] = useState("");
  // inputDataByTemplate = { resourceManifest: {...}, behaviourManifest: {...}, ... }
  const [inputDataByTemplate, setInputDataByTemplate] = useState({});
  const [errors, setErrors] = useState({});

  // Load template pilihan dari cookie saat pertama buka
  useEffect(() => {
    const savedTemplate = Cookies.get("jsonGeneratorTemplate");
    if (savedTemplate && templates.find((t) => t.key === savedTemplate)) {
      setTemplateKey(savedTemplate);
    }
  }, []);

  // Saat templateKey berubah, load data dari cookie untuk template itu
  useEffect(() => {
    if (templateKey) {
      const savedData = Cookies.get(`jsonGeneratorData_${templateKey}`);
      if (savedData) {
        setInputDataByTemplate((prev) => ({
          ...prev,
          [templateKey]: JSON.parse(savedData),
        }));
      } else {
        const initialData = {};
        if (inputFieldsByTemplate[templateKey]?.includes("uuid")) {
          initialData.uuid = uuidv4();
          initialData.uuidModule = uuidv4();
          // set default packType misal "data"
          if (templateKey === "manifest") initialData.packType = "data";
        }
        setInputDataByTemplate((prev) => ({
          ...prev,
          [templateKey]: initialData,
        }));
      }
    }
  }, [templateKey]);

  // Simpan data ke cookie hanya untuk template yang aktif
  useEffect(() => {
    if (templateKey && inputDataByTemplate[templateKey]) {
      Cookies.set(
        `jsonGeneratorData_${templateKey}`,
        JSON.stringify(inputDataByTemplate[templateKey]),
        { expires: 365 }
      );
      Cookies.set("jsonGeneratorTemplate", templateKey, { expires: 365 });
    }
  }, [inputDataByTemplate, templateKey]);

  const onChangeInput = (key, value) => {
    if (!templateKey) return;

    const newData = {
      ...(inputDataByTemplate[templateKey] || {}),
      [key]: value,
    };

    // Validasi per field
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (key === "version") {
        newErrors.version = validateVersionFormat(value)
          ? null
          : "The version format should be x.y.z (eg 1.0.0).";
      } else if (key === "name") {
        newErrors.name = value.trim() ? null : "Name cannot be empty.";
      } else if (key === "minEngineVersion") {
        newErrors.minEngineVersion = minEngineVersions.includes(value)
          ? null
          : "Min engine version must be selected.";
      } else if (key === "description") {
        newErrors.description = value.trim() ? null : "Description must not be empty.";
      }
      return newErrors;
    });

    setInputDataByTemplate((prev) => ({
      ...prev,
      [templateKey]: newData,
    }));
  };

  const onGenerateUUID = () => {
    if (!templateKey) return;

    setInputDataByTemplate((prev) => ({
      ...prev,
      [templateKey]: {
        ...(prev[templateKey] || {}),
        uuid: uuidv4(),
        uuidModule: uuidv4(),
      },
    }));
  };

  const templateFn = templates.find((t) => t.key === templateKey)?.fn;
  const inputFields = inputFieldsByTemplate[templateKey] || [];
  const currentInputData = inputDataByTemplate[templateKey] || {};

  // Gabungkan error menjadi satu string untuk deskripsi
  const combinedErrorMessages = [];
  ["name", "version", "minEngineVersion", "description"].forEach((field) => {
    if (errors[field]) combinedErrorMessages.push(errors[field]);
  });
  const errorText = combinedErrorMessages.join(" ");

  const outputJSON =
    templateFn && templateKey !== ""
      ? templateFn({
          ...currentInputData,
          description: convertDescription(currentInputData.description || ""),
        })
      : {};

  return (
    <div className="container">
      <h1>MCBE Manifest Generator</h1>
      <p className="description">
        This tool helps you create JSON files for Minecraft Bedrock{" "}
        <strong>
          behavior packs, resource packs, skin packs, blocks, items, and sound definitions
        </strong>
        . You can edit the name, version, and description directly.
      </p>
      <p className="description">
        This is an experimental web, created to help MCBE creators.
      </p>
      <p className="description">
        Useful links: 
      </p>
      <p className="link-row">
        <a
          href="https://wiki.bedrock.dev/guide/understanding-json"
          target="_blank"
          rel="noopener noreferrer"
        >
          Understanding JSON
        </a>{" "}
        |{" "}
        <a
          href="https://minecraft.fandom.com/wiki/Formatting_codes"
          target="_blank"
          rel="noopener noreferrer"
        >
          Formatting Codes
        </a>
      </p>

      <TemplateSelector
        options={templates}
        selected={templateKey}
        onChange={setTemplateKey}
        className="custom-select"
      />

      {templateKey !== "" && (
        <>
          <Inputs
            data={currentInputData}
            onChange={onChangeInput}
            errors={{ description: errorText }}
            minEngineVersions={minEngineVersions}
            inputFields={inputFields.filter((f) => f !== "uuid")}
            selectClassName="select"
          />

          {inputFields.includes("uuid") && (
            <button className="uuid-button" onClick={onGenerateUUID}>
              Generate UUID
            </button>
          )}

          <JSONOutput json={outputJSON} />
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;