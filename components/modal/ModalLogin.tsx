import React from 'react';
import { Text, TouchableOpacity, View, Modal, StyleSheet, Image } from 'react-native';
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { LoginStackParamList } from '../../AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
SimpleLineIcons.loadFont()
Entypo.loadFont()


type PropsSplashScreen = NativeStackScreenProps<LoginStackParamList, 'Login'>;


type PropsModalLoginType = {
  modalVisible : boolean,
  setModalVisible : ( value : boolean) => void,
  navigation : PropsSplashScreen
}

const ModalLogin = (props : PropsModalLoginType) => {
  const modalVisible : boolean = props.modalVisible;
  const setModalVisible = props.setModalVisible;
  const navigation = props.navigation.navigation;

  const goTo = () =>{
    setModalVisible(false);
    //navigation.navigate('ChangePassword');
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
            <View style={styles.button}>
              <TouchableOpacity onPress={() => { setModalVisible(false) }} >
                <SimpleLineIcons name={'close'} size={responsiveScreenHeight(3)} color={color.darkGray} />
              </TouchableOpacity>
            </View>
            <View style={[styles.cardTop]}>
                <Text style={[styles.text]}>{`¿Olvidaste tu contraseña?`}</Text>
                <TouchableOpacity onPress={()=>{console.log("HI")}} >
                    <Image source={require('../../utils/images/icon/right.png')}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.cardBottom]}>
                <Text style={[styles.text]}>{`¿Quiero cambiar mi contraseña?`}</Text>
                <TouchableOpacity onPress={()=>{goTo()}} >
                    <Image source={require('../../utils/images/icon/right.png')}/>
                </TouchableOpacity>
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
    bottom: responsiveScreenHeight(-5),
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
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(50),
  },
  cardTop:{
    width:responsiveScreenWidth(90),
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:10,
    marginTop:25,
    paddingVertical:15,
    borderTopEndRadius:15,
    borderTopStartRadius:15,
    borderWidth:.5, 
    borderColor: color.darkGray,
  },
  cardBottom:{
    width:responsiveScreenWidth(90),
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:10,
    paddingVertical:15,
    borderBottomEndRadius:15,
    borderBottomStartRadius:15,
    borderWidth:.5, 
    borderColor: color.darkGray,
  },
  text: {
    color: color.darkGray,
    fontFamily: Roboto.Regular,
    fontSize: 16,
  },
  button: {
    width: '95%',
    alignItems: 'flex-end',
    marginTop: 10,
  },
});
export default ModalLogin;