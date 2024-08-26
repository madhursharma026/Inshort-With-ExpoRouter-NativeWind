import React from "react";
import UseDynamicStyles from "../../context/UseDynamicStyles";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const TermsOfService = () => {
  const dynamicStyles = UseDynamicStyles();

  const renderParagraph = (content) => (
    <Text style={[styles.paragraph, dynamicStyles.textColor]}>{content}</Text>
  );

  const renderListItem = (content) => (
    <Text style={[styles.listItem, dynamicStyles.textColor]}>• {content}</Text>
  );

  return (
    <ScrollView style={[styles.container, dynamicStyles.backgroundColor]}>
      <View style={styles.content}>
        <Text style={[styles.heading, dynamicStyles.textColor]}>
          Terms of Service
        </Text>
        {renderParagraph(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt nunc lorem, eget bibendum nisl malesuada a. Nulla facilisi. Suspendisse potenti. Ut id enim nec ipsum consequat scelerisque. Suspendisse potenti. Phasellus in justo non nisi lacinia efficitur. Donec et sapien in elit vulputate fermentum. Fusce in arcu non nisi blandit placerat."
        )}
        {renderParagraph(
          "Curabitur vel ligula euismod, suscipit augue in, accumsan nisi. Nulla facilisi. In hac habitasse platea dictumst. Curabitur eget tincidunt lorem, id vulputate tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti. Phasellus in justo non nisi lacinia efficitur."
        )}
        <Text style={[styles.subheading, dynamicStyles.textColor]}>
          Key Points:
        </Text>
        <View style={styles.listContainer}>
          {renderListItem("Lorem ipsum dolor sit amet")}
          {renderListItem("Consectetur adipiscing elit")}
          {renderListItem("Proin tincidunt nunc lorem")}
          {renderListItem("Nulla facilisi")}
          {renderListItem("Suspendisse potenti")}
        </View>
        {renderParagraph(
          "Curabitur vel ligula euismod, suscipit augue in, accumsan nisi. Nulla facilisi. In hac habitasse platea dictumst. Curabitur eget tincidunt lorem, id vulputate tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti. Phasellus in justo non nisi lacinia efficitur."
        )}
        <Text
          style={[styles.paragraph, styles.centerText, dynamicStyles.textColor]}
        >
          ---------------------------------------------------
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  heading: {
    fontSize: 30,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  subheading: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  listContainer: {
    marginLeft: 16,
    marginBottom: 16,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
  },
  centerText: {
    textAlign: "center",
  },
});

export default TermsOfService;
