import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  poster: {
    width: 150,
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  reviewText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
