import React, { useEffect, useState } from 'react';
import {
  View, Text, StatusBar,
  useColorScheme, Image, StyleSheet, ImageBackground, Platform, Linking
} from 'react-native';
import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import { REACT_APP_VERSION_TO_VALIDATE } from "@env"
import CacheUtils from '../../utils/cache/CacheUtils';
import * as Components from '../../components';
import { phrase, alertUpdateApp, formatDatetimeCompare } from '../../utils/commons/Functions'
import checkVersion from 'react-native-store-version';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../../AppNavigator'; // Ajusta la ruta según tu estructura
import {  LoginRequestType, UserDataType } from '../../utils/types/GlobalTypes';
import ModalUpdate from '../../components/modal/ModalUpdate';
import { loginUser } from '../../store/userSlice';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { simpleAlert } from '../../utils/commons/Functions';
import { lockApp } from '../../store/lockAppSlice';
import { CommonActions } from '@react-navigation/native';


type PropsSplashScreen = NativeStackScreenProps<LoginStackParamList, 'Splash'>;

const SplashScreen: React.FC<PropsSplashScreen> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isModal, setIsModal]= useState(false);
  const [userData, setUserData]= useState <UserDataType | undefined>(undefined);
  const urlIos = 'itms-apps://apps.apple.com/ca/app/nutenta/id1583302312'
  const urlAndroid = 'market://details?id=com.nutenta'
  const randomElement = Math.floor(Math.random() * phrase.length);
  const [firstLoading, setFisrtLoading] = useState<boolean>(false);
  const { lockAppData : appLock, loading : loadingAppLock, error : errorAppLock } = useSelector((state: RootState) => state.app);
  
  const dispatch = useDispatch<AppDispatch>();
  const { signInData, loading, error } = useSelector((state: RootState) => state.user);
  

  useEffect(() => {     
    console.log("Llamando a lockApp") 
     dispatch(lockApp());        
  }, [])

  useEffect ( () => {
    console.log("appLock", appLock);
    console.log("loadingAppLock : " , loadingAppLock);
    console.log("errorAppLock ", errorAppLock);

    if (loadingAppLock == false && errorAppLock && 'statusCode' in errorAppLock){
      simpleAlert("Error : " + errorAppLock.description)
      return;
   }

   if (loadingAppLock == false && appLock && 'startDate' in appLock ) {
     console.log("appLockDat = ", appLock);
     const now : number = formatDatetimeCompare(new Date());
     const start : number  = Number(appLock.startDate + appLock.startTime);
     const end : number = Number(appLock.endDate+appLock.endTime);

     console.log (start + " >= " + now + " <= " + end);
   

     const isBlock : boolean = start <= now && now <= end;
     console.log("isblock : " + isBlock )

     if (isBlock) {
       simpleAlert(appLock.description);
     }else {
          CacheUtils.getAccountCreated().then ((accountCreated) => {
            console.log("Cuenta creada 1 = " + accountCreated);
            if (accountCreated) {
              validate();//QUITAR
              //DESCOMENTAR
              // validateVersion()
            }else {
              setTimeout(() => {
              navigation.navigate('createdAccount')
                }, 3000)
            }

          })
    
     }


   }
  },[appLock,loadingAppLock,errorAppLock])



  useEffect(() => {
    console.log("sigindata", signInData);
    console.log("loading : " , loading);
    console.log("Error ", error);

    if (loading == false && error && 'statusCode' in error){
       simpleAlert("Error : " + error.description)
    }

    if (firstLoading == true && loading == false &&  error == undefined && signInData === undefined){
      simpleAlert("Error de red")
      setTimeout(() => {
        navigation.navigate('Login')
       }, 500)
    }
    
    if (loading == false && signInData && "accessToken" in signInData && signInData.accessToken.length > 0 ) {
      console.log("SignINData = ", signInData);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainFlow' }],
        })
      );
      console.log("Resetenado historia")
      setTimeout(() => {

        navigation.navigate('MainFlow')
       }, 500)
    }

  },[signInData, loading, error]);

  
  console.log("REACT_APP_VERSION_TO_VALIDATE",REACT_APP_VERSION_TO_VALIDATE)

  const validateVersion = async () => {
    try {
      const check = await checkVersion({
        version: REACT_APP_VERSION_TO_VALIDATE,
        iosStoreURL: 'https://apps.apple.com/ca/app/nutenta/id1583302312',
        androidStoreURL: 'https://play.google.com/store/apps/details?id=com.nutenta&hl=es',
        country: 'es'
      });
      let urlIos = 'itms-apps://apps.apple.com/ca/app/nutenta/id1583302312'
      let urlAndroid = 'market://details?id=com.nutenta'
      if (check.result === "new") {
        console.log('Check', check)
        console.log('REACT_APP_VERSION_TO_VALIDATE', REACT_APP_VERSION_TO_VALIDATE)
        alertUpdateApp(() => {
          let platform = Platform.OS === "android" ? urlAndroid : urlIos
          Linking.openURL(platform)
        }, "Hay una nueva versión de Nutenta", ()=>{})
      } else {
        validate()
      }
    } catch (e) {
      console.log(e);
      validate()
    }
  };


  const dispatchLogin =  ( userData : UserDataType) => {
    if(Boolean(userData) && Boolean(userData.user) && Boolean(userData.password)){
      CacheUtils.getKeepSesion().then ((value) => {
          if (value){
            const data : LoginRequestType = {username : userData.user, password : userData.password }
            dispatch(loginUser(data))   
            setFisrtLoading(true);
          }

        })
      }
  }

  const validate = () => {
    console.log("LLamando a validate")
    CacheUtils.getUserData().then((userData : UserDataType) => {
      console.log('** RECOVER USER DATA', userData)
      if (userData) {

        if (userData.user == "200000000") {
          dispatchLogin(userData);
        } else {

          if(Boolean(userData) && userData.user != ""  && userData.password != ""){

            dispatchLogin(userData)
          }else {
            _goto()
          }


        }




      }
    })
  }

  const _goto = () => {
    setTimeout(() => {
      navigation.navigate('Login')
     }, 1500)
  }

  return (
    <ImageBackground
      style={[styles.mainContainer]}
      source={require('../../utils/images/splash/Splash.png')}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Image
          style={{ marginBottom: 20 }}
          source={require('../../utils/images/logo/logoApp.png')}
        />
        <Text style={styles.text}>
          {`${phrase[randomElement]}`}
        </Text>
        {isModal ?
          <ModalUpdate
            modalVisible = {isModal}
            setModalVisible = {setIsModal}
            urlAndroid={urlAndroid}
            urlIos={urlIos}
          />
        :
          null
        }
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.blueBack,
  },
  container: {
    position: 'absolute',
    alignItems: 'center',
    paddingBottom: responsiveScreenHeight(20)
  },
  text: {
    fontFamily: Roboto.Bold,
    fontSize: 15,
    width: responsiveScreenWidth(85),
    textAlign: 'center',
    color: color.white
  },
});

export default SplashScreen