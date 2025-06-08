import React, { useRef, useState } from "react";
import MinEngineVersionInput from "./MinEngineVersionInput";

const formattingCodes = [
  { code: "§0", label: "Black", color: "#000000" },
  { code: "§1", label: "Dark Blue", color: "#0000AA" },
  { code: "§2", label: "Dark Green", color: "#00AA00" },
  { code: "§3", label: "Dark Aqua", color: "#00AAAA" },
  { code: "§4", label: "Dark Red", color: "#AA0000" },
  { code: "§5", label: "Dark Purple", color: "#AA00AA" },
  { code: "§6", label: "Gold", color: "#FFAA00" },
  { code: "§7", label: "Gray", color: "#AAAAAA" },
  { code: "§8", label: "Dark Gray", color: "#555555" },
  { code: "§9", label: "Blue", color: "#5555FF" },
  { code: "§a", label: "Green", color: "#55FF55" },
  { code: "§b", label: "Aqua", color: "#55FFFF" },
  { code: "§c", label: "Red", color: "#FF5555" },
  { code: "§d", label: "Light Purple", color: "#FF55FF" },
  { code: "§e", label: "Yellow", color: "#FFFF55" },
  { code: "§f", label: "White", color: "#FFFFFF" },
  { code: "§l", label: "Bold", color: "#FFFFFF", style: <b>B</b> },
  { code: "§o", label: "Italic", color: "#FFFFFF", style: <i>I</i> },
  { code: "§n", label: "Underline", color: "#FFFFFF", style: <u>U</u> },
  { code: "§m", label: "Strikethrough", color: "#FFFFFF", style: <s>S</s> },
  { code: "§r", label: "Reset", color: "#FFFFFF", style: "×" },
];

const Inputs = ({ data, onChange, errors, minEngineVersions, inputFields, selectClassName }) => {
  const [activeField, setActiveField] = useState(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleInsertCode = (code) => {
    const ref = activeField === "name" ? nameRef : descriptionRef;
    if (!ref.current) return;

    const input = ref.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const currentValue = data[activeField] || "";
    const newValue = currentValue.slice(0, start) + code + currentValue.slice(end);

    onChange(activeField, newValue);

    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + code.length, start + code.length);
    });
  };

  return (
    <div>
      {inputFields.includes("name") && (
        <>
          <input
            ref={nameRef}
            type="text"
            placeholder="Name"
            value={data.name || ""}
            onFocus={() => setActiveField("name")}
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
          {errors.minEngineVersion && (
            <div className="input-error">{errors.minEngineVersion}</div>
          )}
        </>
      )}

      {inputFields.includes("description") && (
        <>
          <textarea
            ref={descriptionRef}
            placeholder="Description (supports formatting codes and new lines)"
            value={data.description || ""}
            rows={4}
            onFocus={() => setActiveField("description")}
            onChange={(e) => onChange("description", e.target.value)}
            className="custom-input"
          />
          {errors.description && <div className="input-error">{errors.description}</div>}
        </>
      )}

      <div className="formatting-toolbar">
        {formattingCodes.map(({ code, label, color, style }) => (
          <button
            key={code}
            type="button"
            onClick={() => handleInsertCode(code)}
            title={label}
            className="format-button"
            style={{
              backgroundColor: color,
              color: code === "§0" ? "#FFF" : "#000",
            }}
          >
            {style || ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Inputs;