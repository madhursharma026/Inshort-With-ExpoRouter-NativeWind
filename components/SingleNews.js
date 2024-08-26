import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
import { useBookmarks } from "../context/BookmarkContext";
import UseDynamicStyles from "../context/UseDynamicStyles";
import ImageViewer from "../app/ImageViewer";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const imageHeight = windowHeight * 0.3;

const SingleNews = ({ item }) => {
  const router = useRouter();
  const { bookmarkedArticles, toggleBookmark } = useBookmarks();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState("");

  const dynamicStyles = UseDynamicStyles();

  const isBookmarked = bookmarkedArticles.some((a) => a.url === item.url);

  const handleImagePress = (imageURI) => {
    setSelectedImageUri(imageURI);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleBookmarkPress = () => {
    toggleBookmark(item);
  };

  if (!item) {
    return null;
  }

  return (
    <View style={[styles.container, dynamicStyles.backgroundColor]}>
      <TouchableOpacity
        onPress={() => handleImagePress(item.urlToImage)}
        style={styles.imageContainer}
      >
        <Image
          source={{ uri: item.urlToImage }}
          style={styles.imageBackground}
        />
      </TouchableOpacity>
      <View style={[styles.description, dynamicStyles.backgroundColor]}>
        <Text style={[styles.title, dynamicStyles.textColor]}>
          {item.title}
        </Text>
        <Text style={[styles.content, dynamicStyles.textColor]}>
          {item.description}
        </Text>
        <View style={styles.footer}>
          <Text style={dynamicStyles.textColor}>
            Short by{" "}
            <Text style={styles.author}>{item.author ?? "unknown"}</Text>
          </Text>
          <TouchableOpacity
            onPress={handleBookmarkPress}
            style={styles.bookmarkButton}
          >
            <Text
              style={[
                styles.bookmarkText,
                isBookmarked ? styles.bookmarked : dynamicStyles.textColor,
              ]}
            >
              {isBookmarked ? "🔖 Bookmarked" : "🔖 Bookmark"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ImageViewer
        visible={isModalVisible}
        imageUri={selectedImageUri}
        onClose={handleCloseModal}
      />
      <View
        style={[styles.readMoreFooter, dynamicStyles.footerBackgroundColor]}
      >
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/LinkViewer",
              params: { LinkURL: item.url },
            })
          }
        >
          <Text style={[styles.readMoreContent, dynamicStyles.footerTextColor]}>
            {item?.readMoreContent?.slice(0, 80)}...
          </Text>
          <Text style={[styles.readMoreText, dynamicStyles.footerTextColor]}>
            Read More
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight - 70,
    paddingBottom: Platform.OS === "ios" ? 70 : 70,
  },
  imageContainer: {
    backgroundColor: "white",
  },
  imageBackground: {
    width: "100%",
    height: imageHeight,
    resizeMode: "cover",
  },
  description: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 18,
    paddingBottom: 10,
  },
  content: {
    fontSize: 15,
    paddingBottom: 10,
    fontWeight: "300",
  },
  author: {
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookmarkButton: {
    padding: 10,
  },
  bookmarkText: {
    fontSize: 18,
  },
  bookmarked: {
    color: "green",
    fontWeight: "bold",
  },
  readMoreFooter: {
    bottom: 0,
    height: 80,
    padding: 15,
    width: "100%",
    justifyContent: "center",
    position: Platform.OS === "ios" ? "relative" : "absolute",
  },
  readMoreContent: {
    fontSize: 15,
  },
  readMoreText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default SingleNews;
