import { StatusBar } from "expo-status-bar";
import {
  Vibration,
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
import InputField from "./src/components/inputField";
import { useEffect, useState } from "react";
import ListElement from "./src/components/element.jsx";
import purchaseService from "./services/purchase.service.js";
import { cats } from "./beerCats.js";
import Loader from "./src/components/loader.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [catIndex, setCatIndex] = useState(0);
  const [purchase, setPurchase] = useState("");
  const [purchasesList, setPurchasesList] = useState([]);

  useEffect(() => {
    setCatIndex(Math.floor(Math.random() * 17));
  }, []);

  async function loadList() {
    setLoading(true);
    try {
      await purchaseService.get().then((data) => setPurchasesList(data));
      setLoading(false);
    } catch (error) {
      Vibration.vibrate(100);
      ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
      setLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(loadList, 3000);
  }, []);

  function setData(title) {
    setPurchase(title);
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
    const newItem = new Object({ title: purchase.trim(), _id: Date.now() });
    try {
      await purchaseService.create(newItem);
      setPurchasesList((prev) => {
        if (!prev) return;
        return [...prev, newItem];
      });
      Keyboard.dismiss();
      setPurchase("");
      ToastAndroid.show("Добавлено успешно", ToastAndroid.SHORT);
    } catch (error) {
      Vibration.vibrate(100);
      ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
    }
  }

  async function deletePurchase(id) {
    if (!id) return;
    try {
      await purchaseService.delete(id);
      setPurchasesList((prev) => prev.filter((item) => item._id !== id));
      ToastAndroid.show("Удалено успешно", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
    }
  }

  async function refreshList() {
    setTimeout(loadList, 3000);
  }

  const image = {
    uri: cats[catIndex],
  };

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
        <Image source={require("./assets/refresh.png")} />
      </Pressable>
      <Image source={image} style={styles.image}></Image>
      <InputField
        purchase={purchase}
        onChange={setData}
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
              data={item.title}
            >
              {item.title}
            </ListElement>
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
  image: {
    height: 0.25 * windowHeight,
    width: 0.25 * windowHeight,
    marginTop: 0.05 * windowHeight,
    borderRadius: 0.06 * windowHeight,
  },
  refreshButton: {
    position: "absolute",
    top: 0.03 * windowHeight,
    right: 0,
    height: 0.1 * windowHeight,
    width: 0.2 * windowWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
