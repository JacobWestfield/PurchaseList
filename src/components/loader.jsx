import React from "react";
import BouncingPreloader from "react-native-bouncing-preloaders";
const photos = [
  require("../../assets/Loader/1.png"),
  require("../../assets/Loader/2.png"),
  require("../../assets/Loader/3.png"),
  require("../../assets/Loader/4.png"),
  require("../../assets/Loader/5.png"),
  require("../../assets/Loader/6.png"),
  require("../../assets/Loader/7.png"),
  require("../../assets/Loader/8.png"),
  require("../../assets/Loader/9.png"),
  require("../../assets/Loader/10.png"),
  require("../../assets/Loader/11.png"),
  require("../../assets/Loader/12.png"),
  require("../../assets/Loader/13.png"),
  require("../../assets/Loader/14.png"),
  require("../../assets/Loader/15.png"),
  require("../../assets/Loader/16.png"),
  require("../../assets/Loader/17.png"),
  require("../../assets/Loader/18.png"),
  require("../../assets/Loader/19.png"),
  require("../../assets/Loader/20.png"),
  require("../../assets/Loader/21.png"),
  require("../../assets/Loader/22.png"),
  require("../../assets/Loader/23.png"),
  require("../../assets/Loader/24.png"),
  require("../../assets/Loader/25.png"),
  require("../../assets/Loader/26.png"),
  require("../../assets/Loader/27.png"),
  require("../../assets/Loader/28.png"),
  require("../../assets/Loader/29.png"),
  require("../../assets/Loader/30.png"),
  require("../../assets/Loader/31.png"),
  require("../../assets/Loader/32.png"),
  require("../../assets/Loader/33.png"),
];

const Loader = () => {
  return (
    <BouncingPreloader
      icons={[
        photos[Math.floor((Math.random() * photos.length) | 0)],
        photos[Math.floor((Math.random() * photos.length) | 0)],
        photos[Math.floor((Math.random() * photos.length) | 0)],
        photos[Math.floor((Math.random() * photos.length) | 0)],
        photos[Math.floor((Math.random() * photos.length) | 0)],
        photos[Math.floor((Math.random() * photos.length) | 0)],
      ]}
      leftRotation="-680deg"
      rightRotation="360deg"
      leftDistance={-180}
      rightDistance={-150}
      speed={1000}
    />
  );
};

export default Loader;
