import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import UseDynamicStyles from "../../context/UseDynamicStyles";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const ContactUs = () => {
  const { backgroundColor } = UseDynamicStyles();
  const zohoFormUrl =
    "https://forms.zohopublic.in/iammadhur05/form/ContactUs/formperma/spVhcB0YKJRlewY7xnpx0WkDFnsMekNKkDT6G9gEhgg";

  return (
    <SafeAreaView style={[styles.container, backgroundColor]}>
      <WebView
        source={{ uri: zohoFormUrl }}
        style={[styles.webview, backgroundColor]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default ContactUs;
