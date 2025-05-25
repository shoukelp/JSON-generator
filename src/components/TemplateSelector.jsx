import React from "react";

const TemplateSelector = ({ options, selected, onChange, className }) => (
  <select
    className={className}
    value={selected}
    onChange={(e) => onChange(e.target.value)}
  >
    {options.map((opt) => (
      <option key={opt.key} value={opt.key}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default TemplateSelector;