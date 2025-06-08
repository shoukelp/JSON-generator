// utils.js
export function validateVersionFormat(version) {
  return /^\d+(\.\d+){0,2}$/.test(version);
}

export function convertDescription(desc) {
  if (typeof desc !== "string") return "";
  return desc.replace(/§/g, '\u00A7').replace(/\n/g, '\n');
}

export function formatJSONOutput(obj) {
  return JSON.stringify(obj, null, 2)
    .replace(/§/g, '\\u00A7')
    .replace(/\n/g, '\n');
}