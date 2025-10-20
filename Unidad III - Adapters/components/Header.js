import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 15, backgroundColor: "#4B9CD3", borderRadius: 12 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", textAlign: "center" },
});