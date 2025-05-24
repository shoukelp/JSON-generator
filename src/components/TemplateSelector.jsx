// src/components/TemplateSelector.jsx
import React from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => (
  <div>
    <label htmlFor="template">Choose Template:</label>
    <select
      id="template"
      value={selectedTemplate}
      onChange={onChange}
      style={{ marginLeft: 10 }}
    >
      <option value="manifest_bp">Behavior Pack Manifest</option>
      <option value="manifest_rp">Resource Pack Manifest</option>
      <option value="block">Block Definition</option>
      <option value="item">Item Definition</option>
    </select>
  </div>
);

export default TemplateSelector;
