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
import { deletePost } from "@/redux/postsSlice";
import { AppDispatch } from "@/redux/store";
import { deletePostAdmin } from "@/services/deletePost";

interface DeleteConfirmationModalProps {
  open: boolean;
  close: () => void;
  id?: number;
  router?: () => void;
}

export default function DeleteConfirmationModal({
  open,
  close,
  id,
  router,
}: DeleteConfirmationModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await deletePostAdmin(id as number);
      dispatch(deletePost(id as number));
      Alert.alert("Sucesso", "Post deletado com sucesso!");
      if (router) {
        router();
      }
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

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={close}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Text style={styles.deleteText}>Deletar</Text>
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
  modalText: {
    fontSize: 14,
    color: "#7B96B2",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "nunitoRegular",
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
  deleteButton: {
    backgroundColor: "#EF4444",
  },
  deleteText: {
    color: "#FFF",
    fontFamily: "nunitoBold",
  },
});
