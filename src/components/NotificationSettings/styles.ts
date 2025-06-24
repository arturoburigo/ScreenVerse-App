import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginTop: 16,
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: "#007BFF",
  },
  successButton: {
    backgroundColor: "#4CAF50",
  },
  dangerButton: {
    backgroundColor: "#F44336",
  },
  secondaryButton: {
    backgroundColor: "#E0E0E0",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEBEE",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: "#D32F2F",
    lineHeight: 18,
  },
  clearErrorButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearErrorText: {
    fontSize: 16,
    color: "#D32F2F",
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  infoText: {
    fontSize: 12,
    color: "#1976D2",
    lineHeight: 16,
    marginBottom: 4,
  },
});
