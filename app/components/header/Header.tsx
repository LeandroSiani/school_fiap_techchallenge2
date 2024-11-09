import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";

export const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.navigate("login")}
        style={styles.buttonAcess}
      >
        <FontAwesome5 name="user-graduate" size={24} color="#0B1B2B" />
      </TouchableOpacity>
      <Image
        source={require("@/assets/effect_one.png")}
        style={styles.imageOne}
      />
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
  imageOne: {
    position: "absolute",
  },
  buttonAcess: {
    backgroundColor: "#3294F8",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 3,
  },
});
