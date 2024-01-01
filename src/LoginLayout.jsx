import React, { useState, useEffect } from "react";
import groupService from "./services/group.service";
import {
  Vibration,
  Alert,
  Keyboard,
  View,
  ToastAndroid,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  PixelRatio,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import LoginForm from "./components/loginForm";
import Loader from "./components/loader";

export default function LoginLayout({ onGroupChange, onRouteChange }) {
  const [group, setGroup] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentGroup, setCurrentGroup] = useState("");
  const [groupsList, setGroupsList] = useState([]);

  useEffect(() => {
    loadGroups();
  }, []);

  async function loadGroups() {
    setLoading(true);
    try {
      const loadedList = await groupService.get();
      setGroupsList(loadedList);
      setTimeout(() => setLoading(false), 1200);
    } catch (error) {
      Vibration.vibrate(100);
      ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
      setLoading(false);
    }
  }

  function setGroupData(data) {
    setGroup(data);
  }
  function setPasswordData(data) {
    setPassword(data);
  }

  const storeCurrentGroup = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("currentGroup", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  async function handleLogin() {
    setPassword((prev) => prev.trim());
    setGroup((prev) => prev.trim());
    if (!group.trim()) {
      Vibration.vibrate(100);
      setTimeout(() => {
        Vibration.vibrate(100);
      }, 200);
      Alert.alert("Где-то ошибка", "Поле не должно быть пустым", [
        { text: "OK", onPress: () => Keyboard.dismiss() },
      ]);
      setGroup("");
      setPassword("");
      return;
    }
    if (!password.trim()) {
      Vibration.vibrate(100);
      setTimeout(() => {
        Vibration.vibrate(100);
      }, 200);
      Alert.alert("Где-то ошибка", "Поле не должно быть пустым", [
        { text: "OK", onPress: () => Keyboard.dismiss() },
      ]);
      setGroup("");
      setPassword("");
      return;
    }

    const foundedGroupList = groupsList.filter(
      (item) => item["groupName"] == group.trim()
    );

    if (!foundedGroupList.length) {
      Vibration.vibrate(100);
      setTimeout(() => {
        Vibration.vibrate(100);
      }, 200);
      Alert.alert("Ошибка", "Данной группы не существует", [
        { text: "OK", onPress: () => Keyboard.dismiss() },
      ]);
      setGroup("");
      setPassword("");
      return;
    }
    console.log(foundedGroupList);
    const foundedGroupListByPassword = foundedGroupList.filter(
      (item) => item["password"] == password
    );
    console.log(foundedGroupListByPassword.length);
    if (!foundedGroupListByPassword.length) {
      Vibration.vibrate(100);
      setTimeout(() => {
        Vibration.vibrate(100);
      }, 200);
      Alert.alert("Ошибка", "Неверный пароль", [
        { text: "OK", onPress: () => Keyboard.dismiss() },
      ]);
      setGroup("");
      setPassword("");
      return;
    }
    if (foundedGroupList.length && foundedGroupListByPassword.length) {
      storeCurrentGroup(foundedGroupListByPassword[0]);
      onGroupChange(foundedGroupListByPassword[0]);
      Alert.alert("Status", "Вход успешный", [
        { text: "OK", onPress: () => Keyboard.dismiss() },
      ]);
    }
  }

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          widthidth: 0.8 * windowWidth,
        }}
      >
        <Loader />
        <Text style={{ fontSize: 0.05 * windowHeight }}>Идёт загрузка...</Text>
      </View>
    );

  return (
    <View>
      <LoginForm
        onChangeGroup={setGroupData}
        onChangePassword={setPasswordData}
        onLogin={handleLogin}
        group={group}
        password={password}
        onRouteChange={onRouteChange}
      />
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
let FONT_MAIN = 0.025 * windowHeight;
let FONT_BUTTON = 0.025 * windowHeight;

if (PixelRatio.getFontScale() > 1) {
  FONT_MAIN = 0.015 * windowHeight;
  FONT_BUTTON = 0.01 * windowHeight;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#508D69",
    borderRadius: 0.06 * windowHeight,
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 0.06 * windowHeight,
    elevation: 10,
    shadowColor: "#000000",
    width: 0.8 * windowWidth,
  },
});
