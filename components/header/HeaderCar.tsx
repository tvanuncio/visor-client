import React from 'react';
import { View, Text, StyleSheet, Platform, Image, TouchableOpacity, StyleProp } from 'react-native';
import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import EvilIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../../AppNavigator';
import { TextStyle } from 'react-native';
import { PropsHomeScreen } from '../../screens/home/HomeScreen';
import { PropsMainScreen } from '../../screens/main/MainScreen';

MaterialCommunityIcons.loadFont();
EvilIcons.loadFont();
FontAwesome.loadFont();


//type PropsTermsConditionScreen = NativeStackScreenProps<LoginStackParamList,'TermsConditions' | 'Privacy' | 'createdAccount'>;


type PropsHeaderType = {
  title : string,
  styleTitle? : StyleProp<TextStyle>,
  navigation : PropsMainScreen['navigation']
  goto? : () => void
}

const HeaderCar : React.FC<PropsHeaderType> = ({ navigation, title, styleTitle , goto} : PropsHeaderType) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.button}
        onPress={() => {goto == undefined ? navigation.goBack() : goto()}}
      >
        <Image
          style={{...styles.image1, }}
          source={require('../../utils/images/icon/backArrow.png')}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.text, styleTitle]}>{title}</Text>
      </View>
      <View
        style={styles.imageContainer}>
        <Image
          style={styles.image2}
          source={require('../../utils/images/icon/Logo.png')}
          resizeMode={'contain'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.4,
    paddingHorizontal: 20, 
    paddingBottom: 15,
    paddingTop: Platform.OS === 'android' ? responsiveScreenHeight(3) : responsiveScreenHeight(6),
    borderBottomColor: color.grayLine,
    backgroundColor: color.white
  },
  button: {
    justifyContent: 'center',
     width:'10%' ,
    alignItems:'center',
    right:'35%',
  },
  textContainer: {
    justifyContent: 'center',
    right:100,
  },
  text: {
    fontSize: 18,
    fontFamily: Roboto.Regular,
  },
  imageContainer: {
    top: Platform.OS === 'android' ? responsiveScreenHeight(0) : responsiveScreenHeight(0),
  },
  image1: {
    width: 16,
    height: 20,
    marginRight: 20
  },
  image2: {
    width: 35,
    height: 35,
  },
});

export default HeaderCar;