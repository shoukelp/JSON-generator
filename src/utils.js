// validasi versi format x.y.z
export function validateVersionFormat(version) {
  return /^\d+(\.\d+){0,2}$/.test(version);
}

// konversi simbol § dan newline jadi unicode dan \n
export function convertDescription(desc) {
  if (typeof desc !== "string") return "";
  return desc.replace(/§/g, '\u00A7').replace(/\n/g, '\n');
}