import React, { useRef, useEffect } from "react";
import { Animated, Text, View, StyleSheet, Pressable } from "react-native";

const ListElement = ({ data, onDelete, id }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  //Component fades in once being mounted
  useEffect(() => {
    fadeInMounted();
  }, []);

  const fadeInMounted = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  //Component fades out when is being unmounted
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => onDelete(id), 900);
    setTimeout(fadeIn, 1200);
  };
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      <View style={styles.view}>
        <Text style={styles.item}>{data}</Text>
        <Pressable style={styles.button} onPress={fadeOut}>
          <Text style={{ color: "#ffffff" }}>Удалить</Text>
        </Pressable>
      </View>
    </Animated.View>
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
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 30,
    backgroundColor: "#EEF296",
    borderWidth: 2,
    borderRadius: 50,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF8F8F",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    elevation: 3,
    shadowColor: "#000000",
  },
});

export default ListElement;
