import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import HeaderTitlePostBlog from "@/components/headerTitlePostBlog/HeaderTitlePostBlog";
import { Header } from "@/components/header/Header";

export default function SeePostAdmin() {
  const [post, setPost] = useState({
    id: 1,
    title: "Primeiro Post",
    content: "Conteúdo do primeiro post.",
    date: new Date("2024-11-07"),
    publishDate: new Date("2024-11-08"),
    isPublished: true,
  });

  //   useEffect(() => {
  //     const fetchPost = async () => {
  //       const postData = await seePostAdmin({ params: { slug } });
  //       setPost(postData);
  //     };
  //     fetchPost();
  //   }, [slug]);

  //   if (!post) {
  //     return <Text>Loading...</Text>;
  //   }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="" />

      <View style={styles.contentContainer}>
        <HeaderTitlePostBlog
          seePost
          id={post.id}
          title={post.title}
          date={post.date}
          publishDate={post.publishDate}
          isPublished={post.isPublished}
        />

        <View style={styles.mainContent}>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#071422",
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  mainContent: {
    width: "100%",
    maxWidth: 800,
    alignSelf: "center",
    marginTop: 16,
  },
  postContent: {
    color: "#AFC2D4",
    fontSize: 16,
    fontFamily: "nunitoRegular",
  },
});
