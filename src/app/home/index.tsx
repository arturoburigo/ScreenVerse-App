import { Header } from "@/components/Header";
import { useUser } from "@clerk/clerk-expo";
import { Text, View, StyleSheet } from "react-native";
import { styles } from "./styles";

export default function Home() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
}
