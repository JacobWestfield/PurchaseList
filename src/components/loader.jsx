import BouncingPreloader from "react-native-bouncing-preloaders";

const Loader = () => {
  return (
    <BouncingPreloader
      icons={[
        require("../../assets/Loader/1.png"),
        require("../../assets/Loader/2.png"),
        require("../../assets/Loader/3.png"),
        require("../../assets/Loader/4.png"),
        require("../../assets/Loader/5.png"),
        require("../../assets/Loader/6.png"),
        ,
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
