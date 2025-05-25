const block = (data) => ({
  format_version: "1.19.50",
  "minecraft:block": {
    description: {
      identifier: data.name || "custom:block",
    },
    components: {
      "minecraft:destroy_time": 1.0,
      "minecraft:explosion_resistance": 5.0,
      "minecraft:map_color": "#ffffff",
    },
  },
});

export default block;