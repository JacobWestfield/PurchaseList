import { StatusBar } from "expo-status-bar";
import { Image, FlatList, StyleSheet, Text, View } from "react-native";
import InputField from "./src/components/inputField";
import { useState } from "react";
import ListElement from "./src/components/element.jsx";

export default function App() {
  const [purchase, setPurchase] = useState();
  const [purchasesList, setPurchasesList] = useState([]);

  function setData(title) {
    if (!title.trim()) return;
    setPurchase(title);
  }
  function makePurchase() {
    const newItem = new Object({ title: purchase, _id: Date.now() });
    setPurchasesList((prev) => {
      if (!prev) return;
      return [...prev, newItem];
    });
  }
  function deletePurchase(id) {
    setPurchasesList((prev) => prev.filter((item) => item._id !== id));
  }

  const image = {
    uri: "https://crva.imgix.net/hero-images/cats-and-craft-beer.jpg?auto=compress%2Cformat&fit=crop&fm=webp&ixlib=php-3.1.0&q=80&v=1554820621",
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    fontSize: 40,
    textAlign: "center",
  },
  image: { height: 400, width: 400 },
});
