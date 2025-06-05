import React, { useState } from "react";

const JSONOutput = ({ json }) => {
  const [copied, setCopied] = useState(false);

  const formatOutput = (obj) => {
    return JSON.stringify(obj, null, 2)
      .replace(/§/g, "\\u00A7")
      .replace(/\n/g, "\n");
  };

  const handleCopy = async () => {
    const formatted = formatOutput(json);
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const formatted = formatOutput(json);
    const blob = new Blob([formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: "1em", position: "relative" }}>
      <pre className="json-output">{formatOutput(json)}</pre>
      <div className="buttons-row">
        <button onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
      </div>
    </div>
  );
};

export default JSONOutput;