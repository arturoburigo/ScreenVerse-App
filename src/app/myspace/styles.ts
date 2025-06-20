import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16, // Padding horizontal para não colar nas bordas
    backgroundColor: "#121212",
  },
  containerNav: {
    flexDirection: "row",
    gap: 12, // Espaço entre os botões
    marginTop: 8, // Espaço abaixo do Header
    marginBottom: 8,
  },
  // Estilo base para os botões
  buttonNav: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20, // Cantos bem arredondados
    borderWidth: 1,
  },
  // Estilo para o botão ATIVO
  activeButton: {
    backgroundColor: "#E5E5E5",
    borderColor: "#E5E5E5",
  },
  // Estilo para o botão INATIVO
  inactiveButton: {
    backgroundColor: "transparent",
    borderColor: "#555",
  },
  // Estilo base para o texto dos botões
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  // Estilo para o texto ATIVO
  activeText: {
    color: "#121212",
  },
  // Estilo para o texto INATIVO
  inactiveText: {
    color: "#E5E5E5",
  },
  contentArea: {
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
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
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginBottom: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  moviePoster: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  movieInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  movieRating: {
    fontSize: 16,
    color: "#FFD700",
    marginBottom: 4,
  },
  movieReview: {
    fontSize: 14,
    color: "#E5E5E5",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  deleteButton: {
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#FF5C5C",
  },
  editButton: {
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#5C9EFF",
  },
});

export default styles;
