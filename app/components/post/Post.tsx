import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IPost } from "@/@types/post.interface";
import { formatDateCustom } from "@/hooks/formatedDate";
import { useRouter } from "expo-router";

interface PostProps {
  post: IPost;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  const handlePress = () => {
    console.log("Post", post);

    router.push({
      pathname: "/dashboard/seePost",
      params: { id: post.id },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.date}>{formatDateCustom(post.publishDate)}</Text>
        </View>
        <Text style={styles.content}>
          {post.content.length > 100
            ? post.content.slice(0, 100) + "..."
            : post.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#112131",
    borderRadius: 10,
    padding: 16,
    flexDirection: "column",
    gap: 20,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  title: {
    color: "#E7EDF4",
    fontSize: 16,
    fontFamily: "nunitoBold",
    fontWeight: "bold",
  },
  date: {
    color: "#7B96B2",
    fontSize: 12,
    fontFamily: "nunitoRegular",
  },
  content: {
    color: "#AFC2D4",
    fontSize: 12,
    fontFamily: "nunitoRegular",
  },
});
