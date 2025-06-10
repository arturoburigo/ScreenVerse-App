import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { styles } from "./styles";

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const navigation = [
    {
      name: "Home",
      icon: "home",
      route: "/auth",
    },
    {
      name: "Search",
      icon: "search",
      route: "/search",
    },
    {
      name: "MySpace",
      icon: "person",
      route: "/myspace",
    },
  ];
  return (
    <View style={styles.container}>      {navigation.map((item) => (
        <TouchableOpacity
          key={item.route}
          onPress={() => router.push(item.route)}
          style={styles.button}
        >
          <Ionicons
            name={item.icon as keyof typeof Ionicons.glyphMap}
            size={24}
            color={pathname === item.route ? "#B75A5A" : "#676D75"}
          />
          <Text style={[
            styles.buttonText,
            pathname === item.route && { color: "#B75A5A" }
          ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
