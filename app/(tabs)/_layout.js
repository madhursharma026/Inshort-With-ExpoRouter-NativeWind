import { Tabs } from "expo-router";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { paddingBottom: 5, paddingTop: 10, height: 70 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Discover",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="magnifier" size={18} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 14 },
        }}
      />
      <Tabs.Screen
        name="feeds"
        options={{
          title: "Feeds",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="notebook" size={18} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 14 },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="settings" size={18} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 14 },
        }}
      />
    </Tabs>
  );
}
