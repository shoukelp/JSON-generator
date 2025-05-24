// src/components/TemplateSelector.jsx
import React from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => (
  <div>
    <label htmlFor="template" className="label-style">
      Choose Template:
    </label>
    <select
      id="template"
      value={selectedTemplate}
      onChange={onChange}
      className="select-style"
    >
      <option value="manifest_bp">Behavior Pack Manifest</option>
      <option value="manifest_rp">Resource Pack Manifest</option>
      <option value="block">Block Definition</option>
      <option value="item">Item Definition</option>
      <option value="sound">Sound Definition</option>
    </select>
  </div>
);

export default TemplateSelector;