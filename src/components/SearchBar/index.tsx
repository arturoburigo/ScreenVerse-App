import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  onSubmitEditing,
  placeholder = "Buscar...",
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="#676D75" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor="#676D75"
        returnKeyType="search"
      />
    </View>
  );
}
