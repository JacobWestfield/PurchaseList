import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const InputField = ({ onChange, onMakePurchase }) => {
  return (
    <View style={{ padding: 10 }}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Пиши тут чо надо купить"
        onChangeText={(newText) => onChange(newText)}
      />
      <Button title="Создать" onPress={onMakePurchase} />
    </View>
  );
};

export default InputField;
