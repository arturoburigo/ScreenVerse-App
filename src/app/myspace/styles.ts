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
    marginTop: 24, // Espaço abaixo do Header
    marginBottom: 24,
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
    flex: 1,
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
});

export default styles;
