// src/utils/templateGenerator.js
import { v4 as uuidv4 } from "uuid";

const generateTemplate = (type) => {
  const baseUUID = () => uuidv4();

  switch (type) {
    case "manifest_bp":
      return {
        format_version: 2,
        header: {
          name: "Example BP",
          description: "Behavior pack example",
          uuid: baseUUID(),
          version: [1, 0, 0]
        },
        modules: [
          {
            type: "data",
            uuid: baseUUID(),
            version: [1, 0, 0]
          }
        ]
      };

    case "manifest_rp":
      return {
        format_version: 2,
        header: {
          name: "Example RP",
          description: "Resource pack example",
          uuid: baseUUID(),
          version: [1, 0, 0]
        },
        modules: [
          {
            type: "resources",
            uuid: baseUUID(),
            version: [1, 0, 0]
          }
        ]
      };

    case "block":
      return {
        format_version: "1.16.100",
        "minecraft:block": {
          description: {
            identifier: "example:block"
          },
          components: {
            "minecraft:destroy_time": 1.0
          }
        }
      };

    case "item":
      return {
        format_version: "1.16.100",
        "minecraft:item": {
          description: {
            identifier: "example:item",
            category: "Misc"
          },
          components: {
            "minecraft:icon": "textures/items/example"
          }
        }
      };

    default:
      return {};
  }
};

export default generateTemplate;
