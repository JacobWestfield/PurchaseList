import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  PixelRatio,
  Text,
  TextInput,
  View,
  Pressable,
  Dimensions,
} from "react-native";

const RegisterForm = ({
  onChangeGroup,
  onChangePassword,
  onMakeGroup,
  group,
  password,
  onRouteChange,
}) => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={styles.header}>Создание группы</Text>
      <Text style={styles.item}>
        Придумайте имя группы и пароль. После этого Вы можете передать эти
        данные другому участнику, что-бы Вы могли иметь общий список покупок Не
        указывайте персональные данные и пароли, которые Вы используете где-то
        еще
      </Text>
      <TextInput
        value={group}
        style={styles.input}
        placeholder="Имя группы..."
        onChangeText={(newText) => onChangeGroup(newText)}
      />
      <TextInput
        value={password}
        style={styles.input}
        placeholder="Пароль..."
        onChangeText={(newText) => onChangePassword(newText)}
      />
      <Pressable color="#508D69" style={styles.button} onPress={onMakeGroup}>
        <Text
          style={{
            fontSize: FONT_BUTTON,
            color: "#FFFFFF",
            maxWidth: 0.5 * windowWidth,
          }}
        >
          Создать
        </Text>
      </Pressable>
      <Pressable
        color="#508D69"
        style={styles.button}
        onPress={() => onRouteChange((prev) => !prev)}
      >
        <Text
          style={{
            fontSize: FONT_BUTTON,
            color: "#FFFFFF",
            maxWidth: 0.5 * windowWidth,
          }}
        >
          Вход в группу
        </Text>
      </Pressable>
    </View>
  );
};

export default RegisterForm;

//Adaptive markup props
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

let FONT_MAIN = 0.025 * windowHeight;
let FONT_BUTTON = 0.025 * windowHeight;

if (PixelRatio.getFontScale() > 1) {
  FONT_MAIN = 0.015 * windowHeight;
  FONT_BUTTON = 0.01 * windowHeight;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 0.05 * windowHeight,
    marginBottom: 0.01 * windowHeight,
    alignSelf: "center",
    textAlign: "center",
    width: 0.8 * windowWidth,
    marginBottom: 0.02 * windowHeight,
  },
  item: {
    flexWrap: "wrap",
    fontSize: 0.02 * windowHeight,
    marginBottom: 0.01 * windowHeight,
    alignSelf: "center",
    textAlign: "center",
    width: 0.8 * windowWidth,
    marginBottom: 0.02 * windowHeight,
  },
  input: {
    fontSize: FONT_MAIN,
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
    marginBottom: 0.05 * windowHeight,
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
