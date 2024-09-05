import React from 'react';
import { Text, View, Modal, StyleSheet, Linking, Platform} from 'react-native';
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import * as Component from '../../components';
import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
SimpleLineIcons.loadFont();
Entypo.loadFont();
type PropsModalUpdateType = {
  modalVisible : boolean,
  setModalVisible : (value : boolean) => void,
  urlAndroid : string,
  urlIos : string,

}

const ModalUpdate = (props : PropsModalUpdateType) => {
  const modalVisible : boolean = props.modalVisible;
  const setModalVisible = props.setModalVisible;
  const urlAndroid=props.urlAndroid
  const urlIos=props.urlIos

  const goToStore =()=>{
    setModalVisible(false);
    let platform = Platform.OS === "android" ? urlAndroid : urlIos
    Linking.openURL(platform)
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.centeredView, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={styles.modalView}>
            <Text style={styles.text1}>
              {`¡Hola!`}
            </Text>
            <Text style={styles.text2}>
              {`Te recomendamos actualizar tu app tvanuncio para que esta sea más veloz y sigas impulsando tu tienda al nuevo nivel.`}
            </Text>
            <View style={{marginTop:30}}>
              <Component.Button
                text="Actualizar"
                color={color.text}
                textColor='white'
                width={responsiveScreenWidth(80)}
                onPress={() => {goToStore() }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: 'absolute',
    backgroundColor: color.white,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(27),
  },
  text1: {
    color: color.blueBack,
    fontFamily:Roboto.Bold,
    fontSize: 16,
    marginTop:20,
  },
  text2: {
    color: color.darkGray,
    fontFamily: Roboto.Regular,
    fontSize: 15,
    marginTop:15,
    textAlign:'center',
    width:responsiveScreenWidth(70),
  },
});

export default ModalUpdate;