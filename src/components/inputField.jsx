import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";

const InputField = ({ onChange, onMakePurchase, purchase }) => {
  return (
    <View style={{ padding: 10 }}>
      <TextInput
        value={purchase}
        style={styles.input}
        placeholder="Пиши тут чо надо купить"
        onChangeText={(newText) => onChange(newText)}
      />
      <Pressable color="#508D69" style={styles.button} onPress={onMakePurchase}>
        <Text style={{ fontSize: 20, color: "#FFFFFF" }}>Добавить</Text>
      </Pressable>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    height: 60,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#508D69",
    borderRadius: 50,
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    elevation: 10,
    shadowColor: "#000000",
  },
});
