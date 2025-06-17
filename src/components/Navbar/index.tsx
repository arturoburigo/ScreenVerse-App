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

type BottomNavbarProps = {
  activeRoute?: string;
  onTabChange?: (route: string) => void;
};

export default function BottomNavbar({ activeRoute, onTabChange }: BottomNavbarProps) {
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
  const currentRoute = activeRoute || pathname;
  return (
    <View style={styles.container}>
      {navigation.map((item) => {
        const isActive = currentRoute === item.route;
        return (
          <TouchableOpacity
            key={item.route}
            onPress={() => {
              if (onTabChange) onTabChange(item.route);
              router.push(item.route);
            }}
            style={styles.button}
          >
            <Ionicons
              name={item.icon as any}
              size={24}
              color={isActive ? "#B75A5A" : "#676D75"}
            />
            <Text style={[styles.buttonText, isActive && { color: "#B75A5A" }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
