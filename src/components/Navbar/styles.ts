import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1D1F24",
    paddingBottom: 12,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
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
    fontFamily: "Poppins-Regular",
  },
  image: {
    width: 24,
    height: 24,
    marginBottom: 4,
    color: "#676D75",
  },
});
