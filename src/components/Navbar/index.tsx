import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { styles } from "./styles";
import HomeIcon from "../../../assets/icons/home.svg";
import SearchIcon from "../../../assets/icons/search.svg";
import MyspaceIcon from "../../../assets/icons/myspace.svg";

import { SvgProps } from "react-native-svg";

type NavigationItem = {
  name: string;
  icon: React.FC<SvgProps>;
  route: "/auth" | "/search" | "/myspace";
};

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const navigation: NavigationItem[] = [
    {
      name: "Home",
      icon: HomeIcon,
      route: "/auth",
    },
    {
      name: "Search",
      icon: SearchIcon,
      route: "/search",
    },
    {
      name: "MySpace",
      icon: MyspaceIcon,
      route: "/myspace",
    },
  ];
  return (
    <View style={styles.container}>
      {" "}
      {navigation.map((item) => (
        <TouchableOpacity
          key={item.route}
          onPress={() => router.push(item.route)}
          style={styles.button}
        >
          <item.icon width={24} height={24} style={styles.image} />
          <Text
            style={[
              styles.buttonText,
              pathname === item.route && { color: "#B75A5A" },
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
