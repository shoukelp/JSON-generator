import React, { useState } from "react";

const JSONOutput = ({ json }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(json, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset setelah 1.5 detik
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  // <button onClick={handleDownload}>Download</button>

  return (
    <div style={{ marginTop: "1em", position: "relative" }}>
      <pre className="json-output">{JSON.stringify(json, null, 2)}</pre>
      <div className="buttons-row">
        <button onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
      </div>
    </div>
  );
};

export default JSONOutput;