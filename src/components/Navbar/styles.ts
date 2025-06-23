import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#121212",
    paddingBottom: 1,
    paddingTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    zIndex: 1000,
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
