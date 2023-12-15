import React, { useState } from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";

const InputField = ({ onChange, onMakePurchase }) => {
  return (
    <View style={{ padding: 10 }}>
      <TextInput
        style={styles.input}
        placeholder="Пиши тут чо надо купить"
        onChangeText={(newText) => onChange(newText)}
      />
      <Button
        color="#508D69"
        style={styles.button}
        title="Создать"
        onPress={onMakePurchase}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    height: 60,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "black",
  },
  button: {
    borderWidth: 5,
    borderRadius: 25,
  },
});
