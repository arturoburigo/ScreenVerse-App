import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#121212",
  },
  containerNav: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  buttonNav: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  activeButton: {
    backgroundColor: "#E5E5E5",
    borderColor: "#E5E5E5",
  },
  inactiveButton: {
    backgroundColor: "transparent",
    borderColor: "#555",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  activeText: {
    color: "#121212",
  },
  inactiveText: {
    color: "#E5E5E5",
  },
  contentArea: {
    flex: 1,
    marginTop: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtext: {
    fontSize: 18,
    color: "#676D75",
  },
  movieCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  watchedCard: {
    opacity: 0.7,
  },
  moviePoster: {
    width: 70,
    height: 100,
    borderRadius: 8,
  },
  watchedPoster: {
    opacity: 0.6,
  },
  movieInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  movieYear: {
    fontSize: 14,
    color: "#999",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  movieRating: {
    fontSize: 14,
    color: "#FFD700",
    marginLeft: 4,
    fontWeight: "600",
  },
  movieReview: {
    fontSize: 13,
    color: "#CCC",
    lineHeight: 18,
  },
  watchedLabel: {
    fontSize: 12,
    color: "#10b981",
    marginTop: 2,
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    marginHorizontal: 6,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#FF5C5C",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    marginHorizontal: 6,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#5C9EFF",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  watchedButton: {
    marginHorizontal: 6,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#10b981",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    color: "#676D75",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;