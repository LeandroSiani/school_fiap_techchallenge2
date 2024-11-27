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
import { Link, usePathname, useRouter } from "expo-router";
import { listPostsAdmin } from "@/services/listPostsAdmin";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { setPosts } from "@/redux/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import DeleteConfirmationModal from "@/components/deleteConfirmationModal/DeleteConfirmationModal";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { publishPostAdmin } from "@/services/publishPostAdmin";
import PublishDialogModal from "@/components/publishDialogModal/PublishDialogModal";

type ModalState = {
  open: boolean;
  id: string;
};

export default function Dashboard() {
  const router = useRouter();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState<ModalState>({
    open: false,
    id: "",
  });
  const [openPublishModal, setOpenPublishModal] = useState({
    open: false,
    id: 0,
  });

  const fetchPosts = async () => {
    try {
      const data = await listPostsAdmin();
      dispatch(setPosts(data));
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePublishAdmin = async (id: number) => {
    setOpenPublishModal({ open: true, id });
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => handlePublishAdmin(item.id)}>
            {item.isPublished ? (
              <FontAwesome6 name="circle-check" size={24} color="#10b981" />
            ) : (
              <Feather name="x-circle" size={24} color="#ef4444" />
            )}
          </TouchableOpacity>
          {!item.isPublished && (
            <Link href={`/dashboard/editPost/${item.id}`}>
              <Octicons name="pencil" size={24} color="#eab308" />
            </Link>
          )}
          <TouchableOpacity
            onPress={() => router.navigate("/dashboard/seePost")}
          >
            <Ionicons name="eye-outline" size={24} color="#3b82f6" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOpenModal({ open: true, id: item.id })}
          >
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
          {item.isPublished ? "Sim" : "Não"}
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

        <DeleteConfirmationModal
          open={openModal.open}
          close={() => setOpenModal({ open: false, id: "" })}
          id={openModal.id}
        />

        <PublishDialogModal
          open={openPublishModal.open}
          close={() => setOpenPublishModal({ open: false, id: "" })}
          postId={openPublishModal.id}
          onPublish={fetchPosts}
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
