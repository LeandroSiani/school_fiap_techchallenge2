import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Text,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header/Header";
import SearchPost from "@/components/searchPost/SearchPost";
import Post from "@/components/post/Post";
import UserProfileCarousel from "@/components/userProfileCarousel/UserProfileCarousel";
import { useState, useEffect, useCallback } from "react";
import { getAllPosts, getPostsByQuery } from "@/services/seePosts";

export default function HomeScreen() {
  const [searchPost, setSearchPost] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchPosts = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    setError(null);

    try {
      const data =
        searchPost.length < 3
          ? await getAllPosts()
          : await getPostsByQuery(searchPost);

      setPosts(data);
    } catch (err: any) {
      Alert.alert("Erro ao buscar posts:", err.message);
      setError("Erro ao carregar posts.");
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchPost]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts(true);
  }, [searchPost]);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#0B1B2B" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#071422" }}>
        <Header title="GRUPO 17 BLOG" />

        <View style={styles.carousel}>
          <UserProfileCarousel />
        </View>

        <View style={styles.main}>
          <SearchPost qtyPost={posts.length} setSearchPost={setSearchPost} />

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#00AEEF"
              style={styles.loader}
            />
          ) : error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <View style={styles.container}>
                  <Post post={item} />
                </View>
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 16,
  },
  container: {
    marginBottom: 8,
  },
  carousel: {
    marginTop: -80,
    position: "relative",
    zIndex: 1,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
