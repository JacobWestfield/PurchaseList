import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  Pressable,
  Dimensions,
} from "react-native";

const InputField = ({
  onChangePurchase,
  onChangeDescription,
  onMakePurchase,
  purchase,
  description,
}) => {
  return (
    <View style={{ padding: 10 }}>
      <TextInput
        value={purchase}
        style={styles.input}
        placeholder="Добавить товар..."
        onChangeText={(newText) => onChangePurchase(newText)}
      />
      <TextInput
        value={description}
        style={styles.input}
        placeholder="Добавить описание..."
        onChangeText={(newText) => onChangeDescription(newText)}
      />
      <Pressable color="#508D69" style={styles.button} onPress={onMakePurchase}>
        <Text style={{ fontSize: 20, color: "#FFFFFF" }}>Добавить</Text>
      </Pressable>
    </View>
  );
};

export default InputField;

//Adaptive markup props
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  input: {
    fontSize: 0.02 * windowHeight,
    height: 0.06 * windowHeight,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 0.06 * windowHeight,
    paddingHorizontal: 0.1 * windowWidth,
    marginBottom: 0.01 * windowHeight,
    width: 0.8 * windowWidth,
    textAlign: "center",
  },
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
