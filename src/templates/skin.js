const skin = (data) => ({
  geometry: "geometry.json",
  serialize_name: data.name || "Skin Pack",
  localization_name: data.localizationName || "tutorial",
  skins: [
    {
      localization_name: "skin_1",
      geometry: "geometry.humanoid.custom",
      texture: "goggled_gecko_no_goggles.png",
      type: "free",
    },
    {
      localization_name: "skin_2",
      geometry: "geometry.humanoid.customSlim",
      texture: "goggled_gecko.png",
      type: "free",
    },
  ],
});

export default skin;