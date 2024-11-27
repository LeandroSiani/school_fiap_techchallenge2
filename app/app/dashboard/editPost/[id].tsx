import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Header } from "@/components/header/Header";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { updatePost } from "@/redux/postsSlice";
import { editPostAdmin } from "@/services/editPostAdmin";

export default function EditPost() {
  const { id } = useLocalSearchParams();
  const route = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const post = useSelector((state: RootState) =>
    state.posts.posts.find((p) => p.id.toString() === id.toString())
  );

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  const handleEditPost = async () => {
    if (!title || !content) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      await editPostAdmin({ title, content }, id as string);

      dispatch(updatePost({ id: id as string, title, content }));

      Alert.alert("Sucesso", "Post atualizado com sucesso!");
      route.push("/dashboard?refresh=true");
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao atualizar o post.");
      console.error("Erro ao atualizar post:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Editar Post" />

      <View style={styles.main}>
        <TouchableOpacity
          accessibilityLabel="Botão voltar"
          style={styles.backButton}
          onPress={() => route.back()}
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
            value={title}
            onChangeText={setTitle}
          />

          <Text style={[styles.label, { marginTop: 16 }]}>Conteúdo</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escreva o conteúdo aqui"
            placeholderTextColor="#AFC2D4"
            multiline
            numberOfLines={5}
            value={content}
            onChangeText={setContent}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleEditPost}>
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
