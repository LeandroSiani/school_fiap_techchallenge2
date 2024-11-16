import { Header } from "@/components/header/Header";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { usePathname, useRouter } from "expo-router";
import { listPostsAdmin } from "@/services/listPostsAdmin";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminPosts = async () => {
      try {
        const data = await listPostsAdmin();
        setPosts(data);
      } catch (err: any) {
        Alert.alert("Erro ao buscar posts:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminPosts();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => router.navigate("/dashboard/editPost")}
          >
            <Octicons name="pencil" size={24} color="#eab308" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate("/dashboard/seePost")}
          >
            <Ionicons name="eye-outline" size={24} color="#3b82f6" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="trash-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentInfos}>
        <Text style={styles.textLabel}>Titulo</Text>
        <Text style={styles.textContent}>{item.title}</Text>
      </View>
      <View style={styles.contentInfos}>
        <Text style={styles.textLabel}>Conteúdo</Text>
        <Text style={styles.textContent} numberOfLines={1} ellipsizeMode="tail">
          {item.content}
        </Text>
      </View>
      <View style={styles.contentInfos}>
        <Text style={styles.textLabel}>Data post criado</Text>
        <Text style={styles.textContent}>
          {dayjs(item.date).format("DD/MM/YY HH:mm")}
        </Text>
      </View>
      <View style={styles.contentInfos}>
        <Text style={styles.textLabel}>Data publicação</Text>
        <Text style={styles.textContent}>
          {item.publishDate != null
            ? dayjs(item.publishDate).format("DD/MM/YY HH:mm")
            : "--"}
        </Text>
      </View>
      <View style={styles.contentInfos}>
        <Text style={styles.textLabel}>Já foi publicado?</Text>
        <Text style={styles.textContent}>
          `{item.isPublished ? "Sim" : "Não"}`
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar backgroundColor="#0B1B2B" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#071422" }}>
        <Header title="DASHBOARD BLOG" />

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("/dashboard/createPost")}
        >
          <Text style={styles.buttonText}>+ Novo post</Text>
        </TouchableOpacity>

        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0B1B2B",
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
  header: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  contentInfos: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
  },
  textLabel: {
    color: "#FFF",
    fontFamily: "nunitoRegular",
    fontSize: 16,
  },
  textContent: {
    color: "#AFC2D4",
    fontFamily: "nunitoRegular",
    fontSize: 16,
    maxWidth: "70%",
  },
  button: {
    backgroundColor: "#3294F8",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontFamily: "nunitoBold",
    fontSize: 16,
  },
});
