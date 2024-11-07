import { StyleSheet, Text, View } from "react-native";

export const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>GRUPO 17 BLOG</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0B1B2B",
    height: 200,
    alignItems: "center",
    paddingTop: 50,
    position: "relative",
  },
  text: {
    color: "#3294F8",
    fontFamily: "codaRegular",
    fontSize: 22,
  },
});
