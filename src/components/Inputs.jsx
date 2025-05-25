import React from "react";
import MinEngineVersionInput from "./MinEngineVersionInput";

const inputStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  width: "100%",
  boxSizing: "border-box",
  marginBottom: "12px",
};

const errorStyle = {
  color: "red",
  fontSize: "0.875rem",
  marginTop: "-10px",
  marginBottom: "8px",
};

const Inputs = ({ data, onChange, errors, minEngineVersions, inputFields, selectClassName }) => (
  <div>
    {inputFields.includes("name") && (
      <>
        <input
          type="text"
          placeholder="Nama"
          value={data.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          style={inputStyle}
        />
        {errors.name && <div style={errorStyle}>{errors.name}</div>}
      </>
    )}

    {inputFields.includes("version") && (
      <>
        <input
          type="text"
          placeholder="Versi (x.y.z)"
          value={data.version || ""}
          onChange={(e) => onChange("version", e.target.value)}
          pattern="[0-9]+\.[0-9]+\.[0-9]+"
          style={inputStyle}
        />
        {errors.version && <div style={errorStyle}>{errors.version}</div>}
      </>
    )}

    {inputFields.includes("packType") && (
      <select
        value={data.packType || ""}
        onChange={(e) => onChange("packType", e.target.value)}
        className={`custom-select ${selectClassName || ""}`}
      >
        <option value="">Pilih Jenis Pack</option>
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
        {errors.minEngineVersion && <div style={errorStyle}>{errors.minEngineVersion}</div>}
      </>
    )}

    {inputFields.includes("description") && (
      <>
        <textarea
          placeholder="Deskripsi (gunakan § dan baris baru)"
          value={data.description || ""}
          rows={4}
          onChange={(e) => onChange("description", e.target.value)}
          style={inputStyle}
        />
        {errors.description && <div style={errorStyle}>{errors.description}</div>}
      </>
    )}
  </div>
);

export default Inputs;