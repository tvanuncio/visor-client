import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { elevationShadowStyle, simpleAlert } from '../../utils/commons/Functions';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import * as Component from '../../components';

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginStackParamList, MainStackParamList } from '../../AppNavigator';
import { PropsTermsConditionScreen } from './TermsConditionsScreen';
import { PropsHomeScreen } from '../home/HomeScreen';

Octicons.loadFont()
Ionicons.loadFont()

export type PropsVerMasScreen = NativeStackScreenProps<MainStackParamList & LoginStackParamList, 'VerMas'>;



const VerMasScreen : React.FC<PropsVerMasScreen> = ({ navigation, route }) => {

  const dispatch = useDispatch();


  return (
    <View style={[styles.container]}>
      <Component.HeaderComponent
        logo={true}
        navigation={navigation}
      />
      <ScrollView>
        <Component.UserInformation
        />
        <TouchableOpacity
                onPress={() => { navigation.navigate('FrequentAsks') }}
                style={[styles.viewNavigationBot]}
            >
                <View style={[styles.viewImage]}>
                    <Image
                        source={require('../../utils/images/icon/asking.png')}
                    />
                </View>
                <Text style={[styles.text1]}>
                    Preguntas frecuentes
                </Text>
                <Image
                    style={[styles.navImg]}
                    source={require('../../utils/images/icon/right.png')}
                />
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.grayBackTwo,
    alignItems: 'center',
  },

  container2: {
      width: responsiveScreenWidth(96),
      marginBottom: 15,
      backgroundColor: color.grayBackTwo,
  },
  viewNavigationM: {
      alignItems: "center",
      width: responsiveScreenWidth(96),
      paddingVertical: 25,
      backgroundColor: color.white,
      borderRadius: 15,
      borderWidth: 0.7,
      borderColor: color.grayIcons,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 15,

  },

  viewNavigationUniversity: {
      alignItems: "center",
      width: responsiveScreenWidth(96),
      paddingVertical: 5,
      backgroundColor: "#E7FAF4" ,
      borderRadius: 15,
      borderWidth: 0.7,
      borderColor: color.grayIcons,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 15,

  },
  viewNavigationTop: {
      alignItems: "center",
      width: responsiveScreenWidth(96),
      paddingVertical: 25,
      backgroundColor: color.white,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderWidth: 0.7,
      borderColor: color.grayIcons,
      flexDirection: 'row',
      justifyContent: 'space-between',

  },
  viewNavigationBot: {
      alignItems: "center",
      width: responsiveScreenWidth(96),
      paddingVertical: 25,
      backgroundColor: color.white,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderWidth: 0.7,
      borderColor: color.grayIcons,
      flexDirection: 'row',
      justifyContent: 'space-between',

  },
  viewNavigation: {
      alignItems: "center",
      width: responsiveScreenWidth(96),
      backgroundColor: color.white,
      borderWidth: 0.7,
      borderColor: color.grayIcons,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 18,

  },
  viewImage: {
      left: 15,
      top: 5
  },
  text0: {
      position: 'absolute',
      top: 20,
      fontFamily: Roboto.Regular,
      fontSize: 16,
      color: color.darkGray,
      left: 50,
  },
  text1: {
      position: 'absolute',
      fontFamily: Roboto.Regular,
      fontSize: 16,
      color: color.darkGray,
      left: 50,
  },
  text2: {
      color: color.blueBack,
      fontFamily: Roboto.Regular,
      fontSize: 15,
      marginBottom: 10,
  },
  text3: {
      color: color.blueBack,
      fontFamily: Roboto.Bold,
      fontSize: responsiveScreenFontSize(2.3),
  },
  navImg: {
      right: 25,
  },
  bottomView: {
      left: 18,
      flexDirection: 'column',
      paddingVertical: 10,
      marginBottom: 100
  },
})

export default VerMasScreen;