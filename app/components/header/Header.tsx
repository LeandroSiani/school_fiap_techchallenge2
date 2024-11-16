import { useEffect, useState } from "react";
import { usePathname, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        router.navigate("/login");
      }
    };

    checkAuth();
  }, [router]);

  const buttonAcessStyle = {
    ...styles.buttonAcess,
    backgroundColor: isAuthenticated ? "#00e56b" : "#3294F8",
  };

  const buttonIsAuthenticated = {
    ...styles.buttonLogout,
    backgroundColor: pathname == "/" ? "#00e56b" : "transparent",
  };

  const handleLogout = async () => {
    if (isAuthenticated) {
      router.navigate("/dashboard");
    } else {
      await AsyncStorage.removeItem("userToken");
      setIsAuthenticated(false);
      router.navigate("/");
    }
  };

  return (
    <View style={styles.container}>
      {!isAuthenticated ? (
        <TouchableOpacity
          onPress={() => router.navigate("/login")}
          style={buttonAcessStyle}
        >
          <FontAwesome5 name="user-graduate" size={24} color="#0B1B2B" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleLogout} style={buttonIsAuthenticated}>
          {pathname == "/" ? (
            <FontAwesome5 name="user-graduate" size={24} color="#0B1B2B" />
          ) : (
            <Ionicons name="exit-outline" size={24} color="#FFF" />
          )}
        </TouchableOpacity>
      )}
      <Image
        source={require("@/assets/effect_one.png")}
        style={styles.imageOne}
      />
      <Text style={styles.text}>{title}</Text>
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
  buttonLogout: {
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
