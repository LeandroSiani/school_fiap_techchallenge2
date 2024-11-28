import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { formatDateCustom } from "@/hooks/formatedDate";
import DeleteConfirmationModal from "../deleteConfirmationModal/DeleteConfirmationModal";
import PublishDialogModal from "../publishDialogModal/PublishDialogModal";

interface HeaderTitlePostBlogProps {
  seePost?: boolean;
  id: number;
  title: string;
  date?: Date;
  publishDate: Date;
  isPublished?: boolean;
}

export default function HeaderTitlePostBlog({
  seePost,
  id,
  title,
  date,
  publishDate,
  isPublished,
}: HeaderTitlePostBlogProps) {
  const router = useRouter();
  const displayDate = publishDate || date || new Date();
  const [openModal, setOpenModal] = useState(false);

  const handleDeletePost = async () => {
    setOpenModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.navigate("/dashboard")}
          style={styles.backButton}
        >
          <Ionicons name="caret-back" size={12} color="#3294F8" />
          <Text style={styles.backText}>VOLTAR</Text>
        </TouchableOpacity>

        {seePost && (
          <View style={styles.actionIcons}>
            <TouchableOpacity
              onPress={() => handleDeletePost()}
              style={styles.editButton}
            >
              <Ionicons name="trash-outline" size={18} color="#ef4444" />
            </TouchableOpacity>
            {!isPublished && (
              <TouchableOpacity
                onPress={() => router.push(`/dashboard/editPost/${id}`)}
                style={styles.editButton}
              >
                <Octicons name="pencil" size={18} color="#eab308" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <FontAwesome5 name="user-graduate" size={18} color="#3A536B" />

            <Text style={styles.infoText}>Professor</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="calendar" size={18} color="#3A536B" />
            <Text style={styles.infoText}>{formatDateCustom(displayDate)}</Text>
          </View>
          {seePost && (
            <View style={styles.infoItem}>
              {isPublished ? (
                <AntDesign name="checkcircleo" size={18} color="#16a34a" />
              ) : (
                <AntDesign name="closecircleo" size={18} color="#6b3a3a" />
              )}
              <Text style={styles.infoText}>
                {isPublished ? "Publicado" : "Não publicado"}
              </Text>
            </View>
          )}
        </View>
      </View>

      <DeleteConfirmationModal
        open={openModal}
        close={() => setOpenModal(false)}
        router={() => router.navigate("/dashboard")}
        id={id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 800,
    marginHorizontal: "auto",
    flexDirection: "column",
    gap: 20,
    backgroundColor: "#0B1B2B",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: -80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backText: {
    color: "#3294F8",
    fontSize: 12,
    fontWeight: "bold",
  },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    color: "#facc15",
  },
  content: {
    flexDirection: "column",
    gap: 8,
  },
  title: {
    color: "#E7EDF4",
    fontSize: 24,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-start",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    color: "#7B96B2",
    fontSize: 16,
  },
});
