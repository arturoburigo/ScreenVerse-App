import { View, Image, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { usePathname, useRouter } from "expo-router";

export function Header() {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push("/myspace");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>ScreenVerse</Text>
        </View>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={require("../../../assets/images/icon.png")}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
