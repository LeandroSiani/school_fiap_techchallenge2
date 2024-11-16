import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Credenciais mockadas
  const mockUser = "admin";
  const mockPassword = "admin@123";

  const handlePress = async () => {
    if (username === mockUser && password === mockPassword) {
      const token = "mockToken12345";
      await AsyncStorage.setItem("userToken", token);

      Alert.alert("Sucesso", "Login realizado com sucesso!");
      router.navigate("/dashboard"); // Navegue para a página desejada após o login
    } else {
      Alert.alert("Erro", "Usuário ou senha incorretos.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => router.navigate("/")}
      >
        <MaterialIcons name="arrow-back-ios" size={24} color="#3294F8" />
      </TouchableOpacity>

      <Text style={styles.text}>Acesso Professor</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B1B2B",
  },
  text: {
    color: "#3294F8",
    fontFamily: "codaRegular",
    fontSize: 22,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  button: {
    backgroundColor: "#3294F8",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "codaRegular",
    fontSize: 18,
  },
  buttonBack: {
    position: "absolute",
    top: 50,
    left: 30,
  },
});
