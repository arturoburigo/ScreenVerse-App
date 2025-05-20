import Button from "@/components/Button";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text, View, StyleSheet } from "react-native";

export default function Home() {
  const { user } = useUser();
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {user?.firstName || "Guest"}</Text>
      <Button icon="exit" title="Sair" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#121212",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 64,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
