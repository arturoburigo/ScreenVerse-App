import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  poster: {
    width: 150,
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  star: {
    marginHorizontal: 8,
  },
  ratingText: {
    color: "#FFD700",
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "600",
  },
  reviewText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    width: "90%",
    minHeight: 100,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    textAlign: "left",
    textAlignVertical: "top",
    fontSize: 16,
  },
  button: {
    width: "60%",
    alignItems: "center",
    backgroundColor: "#3D9E5F",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#1E1E1E",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: "#888",
    fontSize: 16,
  },
});

export default styles;