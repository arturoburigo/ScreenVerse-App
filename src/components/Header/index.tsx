import { View, Image, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { usePathname, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export function Header() {
  const router = useRouter();
  const { user } = useUser();

  const handleProfilePress = () => {
    router.push("/profile");
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
            source={user?.imageUrl ? { uri: user.imageUrl } : require("../../../assets/images/icon.png")}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
