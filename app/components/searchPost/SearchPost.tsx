import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface SearchPostProps {
  qtyPost: number;
  setSearchPost: (value: string) => void;
}

export default function SearchPost({
  qtyPost,
  setSearchPost,
}: SearchPostProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.qtyText}>
          {qtyPost <= 1 ? "Publicação" : "Publicações"}
        </Text>
        <Text style={styles.postText}>
          {qtyPost} {qtyPost <= 1 ? "Publicação" : "Publicações"}
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Buscar conteúdo"
        placeholderTextColor="#AFC2D4"
        onChangeText={(text) => setSearchPost(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 960,
    marginHorizontal: "auto",
    marginTop: 36,
    flexDirection: "column",
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qtyText: {
    color: "#C4D4E3",
    fontSize: 14,
    fontFamily: "nunitoRegular",
  },
  postText: {
    color: "#7B96B2",
    fontSize: 10,
    fontFamily: "nunitoRegular",
  },
  input: {
    width: "100%",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#1C2F41",
    backgroundColor: "#040F1A",
    fontFamily: "nunitoRegular",
    color: "#AFC2D4",
  },
});
