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
} from "react-native";
import InputField from "./src/components/inputField";
import { useEffect, useState } from "react";
import ListElement from "./src/components/element.jsx";
import purchaseService from "./services/purchase.service.js";
import { cats } from "./beerCats.js";

export default function App() {
  const [catIndex, setCatIndex] = useState(0);
  const [purchase, setPurchase] = useState("");
  const [purchasesList, setPurchasesList] = useState([]);

  useEffect(() => {
    setCatIndex(Math.floor(Math.random() * 17));
  }, []);

  useEffect(() => {
    async function loadList() {
      try {
        await purchaseService.get().then((data) => setPurchasesList(data));
      } catch (error) {
        Vibration.vibrate(100);
        ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
      }
    }
    loadList();
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

  const image = {
    uri: cats[catIndex],
  };

  return (
    <View style={styles.container}>
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
    height: 350,
    width: 350,
    marginTop: 65,
  },
});
