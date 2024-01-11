import { StatusBar } from "expo-status-bar";
import {
  Vibration,
  PixelRatio,
  Alert,
  Keyboard,
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Dimensions,
  Pressable,
} from "react-native";
import MainLayout from "./src/MainLayout.jsx";
import RegisterLayout from "./src/RegisterLayout.jsx";
import LoginLayout from "./src/LoginLayout.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Loader from "./src/components/loader.jsx";

export default function App() {
  const [currentGroup, setCurrentGroup] = useState("");
  const [loading, setLoading] = useState(true);
  const [registerRoute, setRegisterRoute] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  function logOut() {
    removeValue();
    setCurrentGroup("");
  }

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem("currentGroup");
    } catch (e) {
      Vibration.vibrate(100);
      ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
    }
  };

  const getCurrentGroup = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("currentGroup");
      if (jsonValue) setCurrentGroup(JSON.parse(jsonValue).groupName);
    } catch (e) {
      Vibration.vibrate(100);
      ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getCurrentGroup();
  }, []);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
        <Text style={{ fontSize: 0.05 * windowHeight }}>Идёт загрузка...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {currentGroup ? (
        <Pressable onPress={logOut} style={styles.exitButton}>
          <Image source={require("./assets/exit.png")} />
        </Pressable>
      ) : (
        ""
      )}

      {currentGroup ? (
        <MainLayout />
      ) : registerRoute ? (
        <RegisterLayout
          onRouteChange={setRegisterRoute}
          onGroupChange={setCurrentGroup}
        />
      ) : (
        <LoginLayout
          onGroupChange={setCurrentGroup}
          onRouteChange={setRegisterRoute}
        />
      )}
      <StatusBar style="auto" />
      <Text style={styles.copyRight}>
        ©NikMan Solutions. "Пивной кот". v1.2.1 nikman.solutions@gmail.com
      </Text>
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

let FONT_MAIN = 0.015 * windowHeight;

if (PixelRatio.getFontScale() > 1) {
  FONT_MAIN = 0.01 * windowHeight;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#13d168",
    flex: 1,
    backgroundColor: "#9ADE7B",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    fontSize: 25,
    textAlign: "center",
  },
  copyRight: {
    position: "absolute",
    bottom: 0.01 * windowHeight,
    fontSize: 0.012 * windowHeight,
    maxWidth: 0.9 * windowWidth,
  },
  image: {
    height: 0.25 * windowHeight,
    width: 0.25 * windowHeight,
    marginTop: 0.05 * windowHeight,
    borderRadius: 0.06 * windowHeight,
  },
  exitButton: {
    position: "absolute",
    top: 0.03 * windowHeight,
    left: 0.02 * windowWidth,
    height: 0.1 * windowHeight,
    width: 0.2 * windowWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
});
