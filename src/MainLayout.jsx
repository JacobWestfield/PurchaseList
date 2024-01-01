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
import InputField from "./components/inputField.jsx";
import { useEffect, useState } from "react";
import ListElement from "./components/element.jsx";
import purchaseService from "./services/purchase.service.js";
import { cats } from "./beerCats.js";
import Loader from "./components/loader.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

export default function MainLayout() {
  const [loading, setLoading] = useState(true);
  const [catIndex, setCatIndex] = useState(0);
  const [purchase, setPurchase] = useState("");
  const [purchasesList, setPurchasesList] = useState([]);
  const [description, setDescription] = useState("");
  const [currentGroup, setCurrentGroup] = useState("");

  const getCurrentGroup = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("currentGroup");
      setCurrentGroup(JSON.parse(jsonValue).groupName);
    } catch (e) {
      Vibration.vibrate(100);
      ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getCurrentGroup();
    setCatIndex(Math.floor((Math.random() * cats.length) | 0));
  }, []);

  useEffect(() => {
    if (currentGroup) loadList();
  }, [currentGroup]);

  async function loadList() {
    setLoading(true);
    try {
      const loadedList = await purchaseService.get();
      setPurchasesList(
        loadedList.filter((purchase) => purchase.group === currentGroup)
      );
      setTimeout(() => setLoading(false), 1200);
    } catch (error) {
      Vibration.vibrate(100);
      ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
      setLoading(false);
    }
  }

  function setPurchaseData(title) {
    setPurchase(title);
  }
  function setDescriptionData(description) {
    setDescription(description);
  }

  async function makePurchase() {
    if (!purchase.trim()) {
      Vibration.vibrate(100);
      setTimeout(() => {
        Vibration.vibrate(100);
      }, 200);
      Alert.alert("Где-то ошибка", "Поле добавления не должно быть пустым", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      setPurchase("");
    }
    Keyboard.dismiss();
    const newItem = new Object({
      title: purchase.trim(),
      description: description.trim(),
      group: currentGroup,
      _id: nanoid(),
    });
    try {
      await purchaseService.create(newItem);
      setPurchasesList((prev) => {
        if (!prev) return;
        return [...prev, newItem];
      });
      ToastAndroid.show(`${purchase} - Добавлено успешно`, ToastAndroid.SHORT);
      setPurchase("");
      setDescription("");
    } catch (error) {
      Vibration.vibrate(100);
      ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
    }
  }

  async function deletePurchase(id, title) {
    if (!id) return;
    try {
      await purchaseService.delete(id);
      setPurchasesList((prev) => prev.filter((item) => item._id !== id));
      ToastAndroid.show(`${title} - Удалено успешно`, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
    }
  }

  async function refreshList() {
    setCatIndex(Math.floor((Math.random() * cats.length) | 0));
    loadList();
  }

  const image = cats[catIndex];

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
      <Pressable onPress={refreshList} style={styles.refreshButton}>
        <Image source={require("../assets/refresh.png")} />
      </Pressable>
      <Image source={image} style={styles.image}></Image>
      <Text style={styles.item}>{currentGroup}</Text>
      <InputField
        purchase={purchase}
        description={description}
        onChangePurchase={setPurchaseData}
        onChangeDescription={setDescriptionData}
        onMakePurchase={makePurchase}
      />
      <Text style={styles.item}>Список покупок:</Text>
      {purchasesList.length ? (
        <FlatList
          data={purchasesList}
          renderItem={({ item }) => (
            <ListElement
              id={item._id}
              onDelete={deletePurchase}
              title={item.title}
              description={item.description}
            />
          )}
        />
      ) : (
        <Text>Еще нет списка</Text>
      )}
      <StatusBar style="auto" />
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
    fontSize: 0.04 * windowHeight,
    textAlign: "center",
  },
  image: {
    height: 0.25 * windowHeight,
    width: 0.25 * windowHeight,
    marginTop: 0.05 * windowHeight,
    borderRadius: 0.06 * windowHeight,
  },
  refreshButton: {
    position: "absolute",
    top: 0.03 * windowHeight,
    right: -0.03 * windowWidth,
    height: 0.1 * windowHeight,
    width: 0.2 * windowWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  copyRight: {
    position: "absolute",
    bottom: 0,
    fontSize: FONT_MAIN,
  },
});
