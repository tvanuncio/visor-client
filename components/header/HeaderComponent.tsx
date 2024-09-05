import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, Keyboard, Linking, Animated } from 'react-native';
import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from "react-native-responsive-dimensions";
import EvilIcons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { LoginStackParamList, MainStackParamList } from '../../AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleProp } from 'react-native';

EvilIcons.loadFont();


type PropsTermsConditionScreen = NativeStackScreenProps<MainStackParamList & LoginStackParamList ,'Main' | 'VerMas'>;

type PropsHeaderComponentType = {
  logo? : boolean,
  colorRGB?: string,
  navigation? : PropsTermsConditionScreen['navigation']
  backgroundColorIcons?: string,
  styleBackButton?: StyleProp<Image>,
  backgroundColorText?: string,
}


const HeaderComponent:React.FC<PropsHeaderComponentType > = ({ logo, navigation, colorRGB, backgroundColorIcons,styleBackButton })  => {
  const dispatch = useDispatch();

  return (
    <Animated.View style={{ ...styles.container, backgroundColor: colorRGB }}>
      <View style={styles.headerTop}>
        {logo &&
          <View style={{ paddingVertical: 10, marginLeft: responsiveScreenWidth(12) , marginRight: 12}}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
            >
              <Image
                style={{ width: 16, height: 20, ...styleBackButton }}
                source={require('../../utils/images/icon/backArrow.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        }

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`https://wa.me/525527236355/?text='¡Hola soy Franciso requiero ayuda !'`)
            }}
            style={{
              width: responsiveScreenWidth(90),
              paddingHorizontal: 55
            }}
            >
            <Animated.Image style={{ tintColor: backgroundColorIcons }}
              source={require('../../utils/images/icon/what.png')}
            />
          </TouchableOpacity>

      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(100),
    paddingTop: Platform.OS === 'android' ? responsiveScreenHeight(0) : responsiveScreenHeight(5),
    justifyContent: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    width: responsiveScreenWidth(90),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});

export default HeaderComponent;