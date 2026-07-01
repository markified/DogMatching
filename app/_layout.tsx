import {
    DarkTheme,
    DefaultTheme,
    Stack,
    ThemeProvider,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { V3Provider } from "../contexts/AppContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <V3Provider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </V3Provider>
  );
}
