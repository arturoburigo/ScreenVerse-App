import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  resultsContainer: {
    flex: 1,
    width: "100%",
    marginTop: 16,
  },
  resultItem: {
    backgroundColor: "#1E1E1E",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  posterContainer: {
    width: 60,
    height: 90,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "#2A2A2A",
    justifyContent: "center",
    alignItems: "center",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  posterPlaceholder: {
    width: 30,
    height: 30,
    tintColor: "#666",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  resultType: {
    fontSize: 14,
    color: "#888",
    marginBottom: 2,
  },
  resultDescription: {
    fontSize: 12,
    color: "#AAA",
    lineHeight: 16,
  },
  noResults: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 32,
  },
}); 