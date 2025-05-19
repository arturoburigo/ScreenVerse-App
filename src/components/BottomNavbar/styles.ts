import { StyleSheet, Platform } from "react-native";
import { createShadowStyle } from "@/utils/styles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#131417",
    paddingVertical: 12,
    paddingBottom: Platform.OS === "ios" ? 24 : 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...createShadowStyle(5),
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    gap: 4,
  },
  buttonText: {
    color: "#676D75",
    fontSize: 12,
    marginTop: 4,
  },
});
