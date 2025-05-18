import { Platform } from "react-native";

export const createShadowStyle = (elevation = 5) => {
  if (Platform.OS === "web") {
    return {
      boxShadow: `0px ${elevation}px ${elevation * 2}px rgba(0, 0, 0, 0.1)`,
    };
  }

  return {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: elevation,
    },
    shadowOpacity: 0.25,
    shadowRadius: elevation,
    elevation, // Android
  };
};
