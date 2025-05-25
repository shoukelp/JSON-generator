const manifest = (data) => {
  const versionArray = data.version ? data.version.split('.').map(Number) : [1, 0, 0];

  const manifest = {
    format_version: data.formatVersion || "2",
    header: {
      name: data.name || "Minecraft Pack",
      description: data.description || "",
      uuid: data.uuid,
      version: versionArray,
    },
    modules: [
      {
        type: data.packType || "data", // "data", "resources", "skin_pack", dll
        uuid: data.uuidModule,
        version: versionArray,
      },
    ],
  };

  if (data.minEngineVersion && data.packType !== "skin_pack") {
    manifest.header.min_engine_version = data.minEngineVersion.split('.').map(Number);
  }

  return manifest;
};

export default manifest;