import {
  View,
  Text,
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { useLocalSearchParams, useNavigation } from "expo-router";

const LinkViewer = () => {
  const { LinkURL } = useLocalSearchParams();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();

  const getDomainName = (url) => {
    try {
      const { protocol, hostname } = new URL(url);
      return `${protocol}//${hostname}`;
    } catch {
      return "Invalid URL";
    }
  };

  const domainName = getDomainName(LinkURL);

  const handleError = (syntheticEvent) => {
    console.error("WebView error: ", syntheticEvent.nativeEvent);
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(LinkURL);
    Alert.alert("Link Copied", "The link has been copied successfully!");
    setDropdownVisible(false);
  };

  const handleOpenInBrowser = async () => {
    const supported = await Linking.canOpenURL(LinkURL);
    if (supported) {
      await Linking.openURL(LinkURL);
    } else {
      Alert.alert("Error", "Can't open this URL.");
    }
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close-outline" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.urlText}>{domainName}</Text>
        <TouchableOpacity onPress={toggleDropdown} style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical-sharp" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            onPress={handleCopyLink}
            style={styles.dropdownItem}
          >
            <Ionicons name="copy-outline" size={20} color="black" />
            <Text style={styles.dropdownText}>Copy Link</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleOpenInBrowser}
            style={styles.dropdownItem}
          >
            <Ionicons name="open-outline" size={20} color="black" />
            <Text style={styles.dropdownText}>Open in Browser</Text>
          </TouchableOpacity>
        </View>
      )}

      <WebView
        source={{ uri: LinkURL }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
        onError={handleError}
        onHttpError={handleError}
        accessibilityLabel="Web content"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#282C35",
  },
  closeButton: {
    paddingRight: 15,
  },
  urlText: {
    flex: 1,
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  menuButton: {
    paddingLeft: 15,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dropdownText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default LinkViewer;
