import { Slot } from "expo-router";
import { useEffect } from "react";
import { LogBox, StatusBar } from "react-native";
import { useTheme } from "./context/ThemeContext";
import { setupOneSignal } from "./context/SetupOneSignal";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  LogBox.ignoreAllLogs();

  useEffect(() => {
    setupOneSignal();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />
    </SafeAreaView>
  );
}
