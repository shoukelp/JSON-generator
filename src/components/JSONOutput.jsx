import React, { useState } from "react";
import { formatJSONOutput } from "../utils";

const JSONOutput = ({ json }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const formatted = formatJSONOutput(json);
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const formatted = formatJSONOutput(json);
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
      <pre className="json-output">{formatJSONOutput(json)}</pre>
      <div className="buttons-row">
        <button onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
      </div>
    </div>
  );
};

export default JSONOutput;