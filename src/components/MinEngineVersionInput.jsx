import React from "react";

const MinEngineVersionInput = ({ value, onChange, versions, className = "" }) => {
  const handleSelectChange = (e) => {
    if (e.target.value !== "") {
      onChange(e.target.value);
    }
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
      <select
        className={`custom-select ${className}`}
        value={versions.includes(value) ? value : ""}
        onChange={handleSelectChange}
      >
        <option value="">Pilih Versi Minecraft</option>
        {versions.map((ver) => (
          <option key={ver} value={ver}>
            {ver}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Atau isi manual"
        className="custom-input"
      />
    </div>
  );
};

export default MinEngineVersionInput;