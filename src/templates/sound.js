const sound = (data) => ({
  format_version: "1.10.0",
  "sound_definitions": {
    [data.name || "custom:sound"]: {
      sounds: [
        {
          name: data.name || "custom/sound",
          volume: 1.0,
        },
      ],
    },
  },
});

export default sound;