import React, { useEffect, useState } from "react";
import groupService from "./services/group.service";
import {
  Vibration,
  Alert,
  Keyboard,
  View,
  ToastAndroid,
  Text,
  Dimensions,
  PixelRatio,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RegisterForm from "./components/registerForm";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import Loader from "./components/loader";

export default function RegisterLayout({ onGroupChange, onRouteChange }) {
  const [group, setGroup] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
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
      onGroupChange(jsonValue);
    } catch (e) {
      console.log(e);
      // saving error
    }
  };

  const getCurrentGroup = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("currentGroup");
      console.log(jsonValue);
      return JSON.parse(jsonValue);
    } catch (e) {
      Vibration.vibrate(100);
      ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
    }
  };

  async function makeGroup() {
    setPassword((prev) => prev.trim());
    setGroup((prev) => prev.trim());
    if (!group.trim()) {
      Vibration.vibrate(100);
      setTimeout(() => {
        Vibration.vibrate(100);
      }, 200);
      Alert.alert("Где-то ошибка", "Поле не должно быть пустым", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      setGroup("");
      setPassword("");
    }
    if (!password.trim()) {
      Vibration.vibrate(100);
      setTimeout(() => {
        Vibration.vibrate(100);
      }, 200);
      Alert.alert("Где-то ошибка", "Поле не должно быть пустым", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      setGroup("");
      setPassword("");
    }
    Keyboard.dismiss();
    const newGroup = new Object({
      groupName: group.trim(),
      password: password.trim(),
      _id: nanoid(),
    });
    const anotherGroupWithSameName = groupsList.find(
      (item) => item["groupName"] == newGroup.groupName
    );
    try {
      if (anotherGroupWithSameName) {
        Vibration.vibrate(100);
        Vibration.vibrate(100);
        setTimeout(() => {
          Vibration.vibrate(100);
        }, 200);
        Alert.alert(
          "Ошибка",
          "Такя группа уже существует в базе. Придумайте другое имя",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        setGroup("");
        setPassword("");
        return;
      }
      await groupService.create(newGroup);
      await storeCurrentGroup(newGroup);
      onGroupChange(getCurrentGroup());
      ToastAndroid.show(`Группа успешно создана`, ToastAndroid.SHORT);
      setGroup("");
      setPassword("");
    } catch (error) {
      Vibration.vibrate(100);
      console.log(error);
      ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
    }
  }

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
    <View>
      <RegisterForm
        onChangeGroup={setGroupData}
        onChangePassword={setPasswordData}
        onMakeGroup={makeGroup}
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
