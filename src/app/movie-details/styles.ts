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
  header: { flexDirection: "row", marginBottom: 16 },
  poster: { width: 120, height: 170, borderRadius: 16 },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  info: { color: "#fff", fontSize: 16 },
  imdb: { color: "#FFD700", fontWeight: "bold", marginTop: 4 },
  platform: { color: "#E50914", marginTop: 4 },
  overview: {
    color: "#fff",
    marginVertical: 16,
    fontSize: 16,
    textAlign: "justify",
    letterSpacing: 0.02,
  },
  section: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  relatedRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  relatedImg: {
    width: 60,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  watchlistBtn: {
    backgroundColor: "#2563eb",
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  rateBtn: {
    backgroundColor: "#FFD700",
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  btnText: { color: "#000", fontWeight: "bold", fontSize: 16 },
});

export default styles;
