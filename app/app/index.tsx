import { StyleSheet, View, StatusBar } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header/Header";
import SearchPost from "@/components/searchPost/SearchPost";
import Post from "@/components/post/Post";

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
        <View style={styles.main}>
          <SearchPost qtyPost={2} />

          <Post
            post={{
              id: 1,
              title: "Post 1",
              content: "Conteúdo do post 1",
              publishDate: new Date(),
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 16,
    // paddingVertical: 16,
  },
});
