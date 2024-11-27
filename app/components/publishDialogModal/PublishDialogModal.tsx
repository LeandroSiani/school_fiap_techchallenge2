import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { publishPostAdmin } from "@/services/publishPostAdmin";

interface PublishDialogProps {
  open: boolean;
  close: () => void;
  postId: number;
  onPublish: () => void;
}

export default function PublishDialogModal({
  open,
  close,
  postId,
  onPublish,
}: PublishDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      await publishPostAdmin(postId);
      Alert.alert("Sucesso", "Post publicado com sucesso.");
      onPublish();
      close();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao publicar o post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => close()}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Você tem certeza que deseja publicar o post?
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={close}
              disabled={isLoading}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.publishButton]}
              onPress={handlePublish}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.publishText}>Publicar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#0B1B2B",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    color: "#AFC2D4",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "nunitoBold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "transparent",
  },
  cancelText: {
    color: "#7B96B2",
    fontFamily: "nunitoBold",
  },
  publishButton: {
    backgroundColor: "#4CAF50",
  },
  publishText: {
    color: "#FFF",
    fontFamily: "nunitoBold",
  },
});
