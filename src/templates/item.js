const item = (data) => ({
  format_version: "1.19.50",
  "minecraft:item": {
    description: {
      identifier: data.name || "custom:item",
      category: "Misc",
    },
    components: {
      "minecraft:icon": data.name || "custom_item",
      "minecraft:stacked_by_data": true,
    },
  },
});

export default item;