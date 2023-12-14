import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

const ListElement = ({ data, onDelete, id }) => {
  return (
    <View style={styles.view}>
      <Text style={styles.item}>{data}</Text>
      <Button color="#FF0000" title="Удалить" onPress={() => onDelete(id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 20,
    textAlign: "center",
  },
  view: {
    display: "flex",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 200,
    backgroundColor: "#13d168",
    borderWidth: 5,
    borderRadius: 25,
  },
  button: {
    color: "red",
  },
});

export default ListElement;
