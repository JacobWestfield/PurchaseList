import React, { useRef, useEffect } from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";

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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  item: {
    flexWrap: "wrap",
    fontSize: 0.025 * windowHeight,
    marginBottom: 0.01 * windowHeight,
    alignSelf: "center",
    width: 0.5 * windowWidth,
  },
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 0.015 * windowHeight,
    paddingBottom: 0.013 * windowHeight,
    paddingHorizontal: 0.05 * windowWidth,
    backgroundColor: "#EEF296",
    borderWidth: 2,
    borderRadius: 0.06 * windowHeight,
    marginTop: 0.01 * windowHeight,
    width: 0.8 * windowWidth,
  },
  button: {
    backgroundColor: "#FF8F8F",
    borderRadius: 20,
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0.05 * windowWidth,
    elevation: 3,
    shadowColor: "#000000",
    height: 0.05 * windowHeight,
    maxWidth: 0.25 * windowWidth,
    alignSelf: "center",
  },
});

export default ListElement;
