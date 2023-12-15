import { StatusBar } from "expo-status-bar";
import {
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
  const [purchase, setPurchase] = useState();
  const [purchasesList, setPurchasesList] = useState([]);

  useEffect(() => {
    setCatIndex(Math.floor(Math.random() * 9));
  }, []);

  useEffect(() => {
    async function loadList() {
      try {
        await purchaseService.get().then((data) => setPurchasesList(data));
      } catch (error) {
        ToastAndroid.show("Что-то пошло не так :(", ToastAndroid.SHORT);
      }
    }
    loadList();
  }, []);

  function setData(title) {
    if (!title.trim()) return;
    setPurchase(title);
  }
  async function makePurchase() {
    const newItem = new Object({ title: purchase, _id: Date.now() });
    try {
      await purchaseService.create(newItem);
      setPurchasesList((prev) => {
        if (!prev) return;
        return [...prev, newItem];
      });
      ToastAndroid.show("Добавлено успешно", ToastAndroid.SHORT);
    } catch (error) {
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
      <InputField onChange={setData} onMakePurchase={makePurchase} />
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
  image: { height: 200, width: 200 },
});
