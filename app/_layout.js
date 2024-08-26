import Constants from "expo-constants";
import { Stack } from "expo-router/stack";
import { View, StatusBar, Platform } from "react-native";
import { LanguageProvider } from "../context/LanguageContext";
import { BookmarkProvider } from "../context/BookmarkContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

export default function Layout() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <ThemeProvider>
        <LanguageProvider>
          <BookmarkProvider>
            <ThemedLayout />
          </BookmarkProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function ThemedLayout() {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? "#282C35" : "#f1f1f1";
  const barStyle = isDarkMode ? "light-content" : "dark-content";

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <View
        style={{
          flex: 1,
          backgroundColor: backgroundColor,
          paddingTop: Constants.statusBarHeight,
        }}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="BookmarkNews/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ContactUs/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TermsOfService/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LinkViewer/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ImageViewer/index"
            options={{ headerShown: false }}
          />
        </Stack>
      </View>
    </>
  );
}
