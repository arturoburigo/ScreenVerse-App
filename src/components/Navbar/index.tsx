import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { styles } from "./styles";

type NavigationItem = {
  name: string;
  icon: string;
  route: "/home" | "/search" | "/myspace";
};

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const navigation: NavigationItem[] = [
    {
      name: "Home",
      icon: "home",
      route: "/home",
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
    <View style={styles.container}>
      {navigation.map((item) => (
        <TouchableOpacity
          key={item.route}
          onPress={() => router.push(item.route)}
          style={styles.button}
        >
          <Ionicons name={item.icon as any} size={24} color="#676D75" />
          <Text style={styles.buttonText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
