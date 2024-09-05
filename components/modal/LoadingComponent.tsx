import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import LottieView from 'lottie-react-native';
import { responsiveScreenHeight, responsiveScreenWidth, } from "react-native-responsive-dimensions";

function LoadingComponent() {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => { }}
    >
      <View style={styles.container}>
        <LottieView
          source={require('../../utils/animations/gears.json')}
          style={styles.lottie}
          autoPlay
          loop />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
   
    height: responsiveScreenHeight(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  lottie: {
    width: responsiveScreenWidth(20),
    height: responsiveScreenHeight(20),
  },
});

export default LoadingComponent;