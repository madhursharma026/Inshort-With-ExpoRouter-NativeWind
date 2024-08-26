import React from "react";
import {
  Text,
  View,
  Modal,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import UseDynamicStyles from "../../context/UseDynamicStyles";

const ImageViewer = ({ visible, imageUri, onClose }) => {
  const { width, height } = useWindowDimensions();
  const dynamicStyles = UseDynamicStyles();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      hardwareAccelerated
    >
      <SafeAreaView
        style={[styles.modalBackground, dynamicStyles.backgroundColor]}
      >
        <View style={[styles.modalContainer, { width, height }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={[styles.closeButtonText, dynamicStyles.textColor]}>
              ✕
            </Text>
          </TouchableOpacity>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="contain"
            accessibilityLabel="View Image"
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: 10,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 30,
  },
  image: {
    width: "100%",
    height: "80%",
  },
});

export default ImageViewer;
