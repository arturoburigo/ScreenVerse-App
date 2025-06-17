import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  backButton: {
    marginBottom: 50,
    marginLeft: 4,
    alignSelf: "flex-start",
    borderRadius: 20,
    padding: 4,
  },
  profileCard: {
    backgroundColor: "#611100",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  profileEmail: {
    color: "#fff",
    fontSize: 15,
    marginTop: 2,
  },
  buttonsContainer: {
    marginTop: 8,
    gap: 14,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#444",
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonExit: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#444",
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 8,
  },
  buttonExitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default styles;
