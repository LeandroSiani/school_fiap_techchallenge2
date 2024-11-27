import { deletePost } from "@/redux/postsSlice";
import { AppDispatch } from "@/redux/store";
import { deletePostAdmin } from "@/services/deletePost";
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";

interface DeleteConfirmationModalProps {
  open: boolean;
  close: () => void;
  id?: string;
}

export default function DeleteConfirmationModal({
  open,
  close,
  id,
}: DeleteConfirmationModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await deletePostAdmin(id as string);
      dispatch(deletePost(id as string));
      Alert.alert("Sucesso", "Post deletado com sucesso!");
      close();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar o post.");
      console.error(error);
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
          <Text style={styles.modalTitle}>Você deseja deletar este post?</Text>
          <Text style={styles.modalText}>
            Esta ação não poderá ser desfeita.
          </Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Text style={styles.deleteText}>Deletar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => close()}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "nunitoBold",
  },
  modalText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "nunitoRegular",
  },
  buttonGroup: {
    gap: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
  },
  cancelText: {
    color: "#333",
    fontFamily: "nunitoBold",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
  },
  deleteText: {
    color: "#fff",
    fontFamily: "nunitoBold",
  },
});
