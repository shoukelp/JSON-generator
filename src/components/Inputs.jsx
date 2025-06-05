import React from "react";
import MinEngineVersionInput from "./MinEngineVersionInput";

const Inputs = ({ data, onChange, errors, minEngineVersions, inputFields, selectClassName }) => (
  <div>
    {inputFields.includes("name") && (
      <>
        <input
          type="text"
          placeholder="Name"
          value={data.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          className="custom-input"
        />
        {errors.name && <div className="input-error">{errors.name}</div>}
      </>
    )}

    {inputFields.includes("version") && (
      <>
        <input
          type="text"
          placeholder="Version"
          value={data.version || ""}
          onChange={(e) => onChange("version", e.target.value)}
          pattern="[0-9]+\.[0-9]+\.[0-9]+"
          className="custom-input"
        />
        {errors.version && <div className="input-error">{errors.version}</div>}
      </>
    )}

    {inputFields.includes("packType") && (
      <select
        value={data.packType || ""}
        onChange={(e) => onChange("packType", e.target.value)}
        className={`custom-select ${selectClassName || ""}`}
      >
        <option value="">Pack Type</option>
        <option value="data">Behaviour Pack</option>
        <option value="resources">Resource Pack</option>
        <option value="skin_pack">Skin Pack</option>
      </select>
    )}

    {inputFields.includes("minEngineVersion") && (
      <>
        <MinEngineVersionInput
          value={data.minEngineVersion || ""}
          onChange={(val) => onChange("minEngineVersion", val)}
          versions={minEngineVersions}
          className={selectClassName}
        />
        {errors.minEngineVersion && <div className="input-error">{errors.minEngineVersion}</div>}
      </>
    )}

    {inputFields.includes("description") && (
      <>
        <textarea
          placeholder="Description (supports formatting codes and new lines)"
          value={data.description || ""}
          rows={4}
          onChange={(e) => onChange("description", e.target.value)}
          className="custom-input"
        />
        {errors.description && <div className="input-error">{errors.description}</div>}
      </>
    )}
  </div>
);

export default Inputs;