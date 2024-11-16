import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Header } from "@/components/header/Header";

export default function EditPost() {
  const navigation = useNavigation();

  const handleCreatePost = () => {
    // Ação para criar post
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Editar Post" />

      <View style={styles.main}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="caret-back" size={12} color="#3294F8" />
          <Text style={styles.backText}>VOLTAR</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Editar post</Text>

          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Título do post"
            placeholderTextColor="#AFC2D4"
          />

          <Text style={[styles.label, { marginTop: 16 }]}>Conteúdo</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escreva o conteúdo aqui"
            placeholderTextColor="#AFC2D4"
            multiline
            numberOfLines={5}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
              <Text style={styles.buttonText}>Editar post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071422",
  },
  main: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  header: {
    backgroundColor: "#0B1B2B",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#3294F8",
    fontSize: 22,
    fontWeight: "bold",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 20,
  },
  backText: {
    color: "#3294F8",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  formContainer: {
    backgroundColor: "#071422",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    color: "#E7EDF4",
    marginBottom: 20,
    fontFamily: "codaRegular",
  },
  label: {
    fontSize: 14,
    color: "#7B96B2",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#040F1A",
    color: "#AFC2D4",
    borderColor: "#1C2F41",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  textArea: {
    textAlignVertical: "top",
    height: 100,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#3294F8",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
