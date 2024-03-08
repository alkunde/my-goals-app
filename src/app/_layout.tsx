import "@/libs/dayjs";
import "@/styles/global.css";

import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";

import { colors } from "@/styles/colors";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  } else {
    return;
  }

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.gray[600] }}
    >
      <StatusBar style="light" />
      <Slot />
    </GestureHandlerRootView>
  );
}