import { StyleSheet, View, StatusBar, Text, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header/Header";
import SearchPost from "@/components/searchPost/SearchPost";
import Post from "@/components/post/Post";
import UserProfileCarousel from "@/components/userProfileCarousel/UserProfileCarousel";

const DATA = Array.from({ length: 10 }).map((_, index) => ({
  id: index.toString(),
  title: `Post ${index}`,
  content: `Conteúdo do post ${index}`,
  publishDate: new Date(),
}));

export default function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <>
      <StatusBar backgroundColor="#0B1B2B" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#071422" }}>
        <Header />

        <View style={styles.carousel}>
          <UserProfileCarousel />
        </View>

        <View style={styles.main}>
          <SearchPost qtyPost={DATA.length} />

          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Post post={item} />
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </>
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
    zIndex: 1, // Garante que o carrossel esteja acima de outros elementos
  },
});
