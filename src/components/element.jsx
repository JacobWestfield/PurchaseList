import React from "react";
import { Button, Text, View, StyleSheet, Pressable } from "react-native";

const ListElement = ({ data, onDelete, id }) => {
  return (
    <View style={styles.view}>
      <Text style={styles.item}>{data}</Text>
      <Pressable
        style={styles.button}
        title="Удалить"
        onPress={() => onDelete(id)}
      >
        <Text style={{ color: "#ffffff" }}>Удалить</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexWrap: "wrap",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 10,
    marginRight: 50,
  },
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#EEF296",
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF8F8F",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default ListElement;
