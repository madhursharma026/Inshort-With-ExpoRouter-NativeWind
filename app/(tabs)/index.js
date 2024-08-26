import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  CATEGORIES,
  VACCINE_IMAGE_URL,
  VACCINE_NOTIFICATION,
} from "../../api/api";
import React from "react";
import Carousel from "react-native-snap-carousel";
import UseDynamicStyles from "../../context/UseDynamicStyles";

const sources = Array(8).fill({
  pic: VACCINE_IMAGE_URL,
  notification: VACCINE_NOTIFICATION,
});

export default function DiscoverScreen() {
  const dynamicStyles = UseDynamicStyles();
  const windowWidth = Dimensions.get("window").width;
  const SLIDE_WIDTH = Math.round(windowWidth / 3.5);

  const renderCategoryItem = ({ item }) => (
    <View style={styles.category}>
      <Image source={{ uri: item.pic }} style={styles.categoryImage} />
      <Text style={[styles.text, dynamicStyles.textColor]}>{item.name}</Text>
    </View>
  );

  const renderNotifications = (notifications) =>
    notifications.map((s, index) => (
      <View key={index} style={styles.notificationContainer}>
        <Text style={[styles.notificationText, dynamicStyles.textColor]}>
          {s.notification.slice(0, 120)}...
        </Text>
        <Image source={{ uri: s.pic }} style={styles.notificationLogo} />
      </View>
    ));

  return (
    <ScrollView
      contentContainerStyle={[styles.discover, dynamicStyles.backgroundColor]}
    >
      <Text style={[styles.subtitle, dynamicStyles.textColor]}>Categories</Text>
      <Carousel
        layout="default"
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        sliderWidth={windowWidth}
        itemWidth={SLIDE_WIDTH}
        activeSlideAlignment="start"
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
      <Text style={[styles.subtitle, dynamicStyles.textColor]}>
        Notifications
      </Text>
      {renderNotifications(sources)}
      <Text
        style={[styles.subtitle, dynamicStyles.textColor, { marginTop: 40 }]}
      >
        More Categories
      </Text>
      <Carousel
        layout="default"
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        sliderWidth={windowWidth}
        itemWidth={SLIDE_WIDTH}
        activeSlideAlignment="start"
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
      <Text style={[styles.subtitle, dynamicStyles.textColor]}>
        More Notifications
      </Text>
      {renderNotifications(sources)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  discover: {
    padding: 10,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    paddingBottom: 8,
    borderRadius: 10,
    fontWeight: "bold",
    marginHorizontal: 5,
    alignSelf: "flex-start",
  },
  category: {
    margin: 10,
    height: 130,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  categoryImage: {
    height: "60%",
    width: "100%",
    resizeMode: "contain",
  },
  text: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  notificationContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  notificationLogo: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  notificationText: {
    fontSize: 14,
  },
});
