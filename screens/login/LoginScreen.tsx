import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Platform, Linking, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from 'react-native';
import * as Components from '../../components';
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
// import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import { useSelector, useDispatch } from 'react-redux';
import CacheUtils from '../../utils/cache/CacheUtils'
import { formatDatetimeCompare } from '../../utils/commons/Functions';
import {  UserDataType, LoginRequestType } from '../../utils/types/GlobalTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { simpleAlert } from '../../utils/commons/Functions';
import { LoginStackParamList, RootStackParamList } from '../../AppNavigator'; // Ajusta la ruta según tu estructura
import { AppDispatch, RootState } from '../../store/store';
import { loginUser } from '../../store/userSlice';
import { CommonActions } from '@react-navigation/native';

type PropsLoginScreen = NativeStackScreenProps<RootStackParamList & LoginStackParamList, 'Login'>;

Icon.loadFont()
EvilIcons.loadFont()
Ionicons.loadFont()

const LoginScreen : React.FC<PropsLoginScreen>  = ({ navigation } ) =>{

  const REACT_APP_VERSION : string = '1.0';
  const REACT_APP_PRODUCTION : string = 'ignore';
  const dispatch = useDispatch<AppDispatch>();
  const { signInData, loading, error } = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [terms, setTerms] = useState(false);
  const [keepSesion, setKeepSesion] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fcmToken, setFcmToken] = useState('');
  const [isToken, setIsToken] = useState('');

  useEffect(() => {
    getTerms();
    getKeepSesion();
    //DESCOMENTAR
    // getFcmToken();
  }, [])

  const getTerms = () => {
    CacheUtils.getTerms().then((value) => {
       console.log('TERMS', value)   
        setTerms(value)
    })
  }

  const getKeepSesion = () => {
    CacheUtils.getKeepSesion().then((value) => {
       console.log('KEEP_SESION', value) 
       setKeepSesion(value);
       CacheUtils.getUserData().then((usrDat) => {
             setUser(usrDat.user);
             setPassword(usrDat.password);
       })
    })
  }



  useEffect(() => {
    console.log("sigindata", signInData);
    console.log("loading : " , loading);
    console.log("Error ", error);

    if (loading == false && error && 'statusCode' in error){
       alert("Error : " + error.description)
       return;
    }

    if (loading == false && signInData ) {
      console.log("Q** SignINData 1. = ", signInData);
      CacheUtils.setAccountCreated(true).then ( () => {
          //Si ya tenia una cuenta creada, y he hizo login, la cuenta fue creada.
          console.log("** Ya seteo accountCreated ")
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'MainFlow' }],
            })
          );
          console.log("Limpiando historia 1..")
          navigation.navigate('MainFlow');
      });
      
      

    }

  },[signInData, loading, error]);

  const validateLogin = (isBlock : boolean, hour : string) => {
    if (isBlock && user !== "200000000") {
      simpleAlert(`Para mejorar el uso de la aplicación se estará dando mantenimiento de ${hour} horas, disculpe las molestias`)
    } 
  }

  const alert = (message : string) => {
    setShowLoading(false)
    setTimeout(() => {
      Alert.alert(
        "Error",
        message,
      )
    }, 300)
  }

  const callLoginUser = () => {
    if(Boolean(user) && Boolean(password)){

      if (!terms) {
        alert("Debe aceptar terminos y condiciones")
        
      }else {
        console.log("Hacer login " + user)
        setShowLoading(true);
        let dtaUsr : UserDataType = {user : keepSesion ? user : "", password : keepSesion ? password : ""};
        CacheUtils.setUserData(dtaUsr).then ( () => {
            const data : LoginRequestType = {username : user, password }
            dispatch(loginUser(data))
            console.log("Se despacho el loginUser")
        }).catch (() => {
          alert("Error: Intente nuevamente")
          setShowLoading(false);
        });


              
      }
      
    }
    else{
      alert("Ingresa usuario y password")
    }
  };

  const goToTermsConditions = () => {
    navigation.navigate('TermsConditions')
    setTerms(true)
  }

  const goToPrivacy = () => {
    navigation.navigate('Privacy')
    setTerms(true)
  }

  const aceptTerms = (check : boolean) => {
    if (check) {
      CacheUtils.setTerms(true);
    } else {
      CacheUtils.removeTerms()
    }
    setTerms(check)
  }

  const activeSession = (active : boolean) => { 
    
    if (active) {
      CacheUtils.setKeepSesion(active);
    }else {
      CacheUtils.removeKeepSesion();
    }
    setKeepSesion(active);
  }

 // const forgotPassword = () => navigation.navigate('ForgotPassword');

  return (
    <>
      <ImageBackground source={require("../../utils/images/backgroundLogin.png")} style={{flex: 1, height:responsiveScreenHeight(Platform.OS === "ios" ? 95 : 98) }}>
        <View style={{...styles.appContainer, marginTop: 230, }}>
          {/* DESCOMENTAR */}
          {/* <NavigationEvents onDidFocus={payload => getTerms()} /> */}
          <FlatList
            data={[0]}
            contentContainerStyle={styles.contentContainerStyle}
            ListFooterComponentStyle={styles.listFooterComponentStyle}
            ListFooterComponent={
              <View >
                <Components.Button
                  text="Entrar"
                  color={color.blueMain}
                  textColor='white'
                  marginTop={25}
                  onPress={() => { callLoginUser() }}
                />
                { loading && <Components.LoadingComponent /> }
                <Text adjustsFontSizeToFit style={styles.textVersion}>{REACT_APP_PRODUCTION === '0' ? REACT_APP_VERSION + ' DEV' : REACT_APP_PRODUCTION === '0' ? REACT_APP_VERSION + ' QA' : REACT_APP_VERSION}</Text>
              </View>
            }
            renderItem={
              ({item}) => (
                <View style={{alignItems: 'center',}}>
                  <View>
                    <Components.Input
                      width= {responsiveScreenWidth(90)}
                      placeholder="Usuario"
                      value={user}
                      onChangeText={user => setUser(user)}
                      color={color.darkGray}
                      backgroundColor={color.white}
                      icon={<Ionicons name={'person-outline'} size={18} color='#9397AB' />}
                      paddingVertical={15}
                      borderRadius={8}
                    />
                    <Components.Input
                      width= {responsiveScreenWidth(90)}
                      placeholder="Contraseña"
                      value={password}
                      onChangeText={password => setPassword(password)}
                      secureTextEntry={true}
                      color={color.darkGray}
                      backgroundColor={color.white}
                      icon={<Ionicons name={'lock-closed-outline'} size={20} color='#9397AB' />}
                      eye={<Ionicons name={'eye-outline'} size={20} color='#9397AB' />}
                      eyeOff={<Ionicons name={'eye-off-outline'} size={20} color='#9397AB' />}
                      paddingVertical={15}
                      borderRadius={8}
                      // title={'Contraseña'}
                    />
                    <TouchableOpacity onPress={ () => {}}>
                      <Text  adjustsFontSizeToFit style={[styles.textUnderline, { marginTop: 2.5 }]}>
                        ¿Olvidaste tu contraseña?
                      </Text>
                    </TouchableOpacity> 
                  </View>
                  <View style={{ position: 'absolute' }}>
                    {/* 
                    {modalVisible &&
                      <Components.ModalLogin
                        setModalVisible={setModalVisible}
                        navigation={navigation}
                      />
                    
                    }
                      */}
                  </View>
                  <View style={{ alignItems: 'center', marginTop: 45 }}>
                    <Text adjustsFontSizeToFit style={styles.textNeedHelp}>{'¿Necesitas ayuda?'}</Text>
                    
                    <View style={styles.wspContainer}>
                      <Ionicons name={'logo-whatsapp'} size={22} color='#42CEA6' />
                      <Text adjustsFontSizeToFit style={styles.textChat}>
                        {' Chatea con nosotros '}
                        <Text  adjustsFontSizeToFit style={styles.textWsp}
                          onPress={() => {
                            // Linking.openURL(`tel:55 2723-6355`)
                            Linking.openURL(`https://wa.me/525560217769/?text=Hola requiero ayuda`) 
                          }}
                        >{'55-6021-7769'}</Text>
                      </Text>
                    </View>
                    <View style={{width:responsiveScreenWidth(90)}}>
                      <View style={styles.termsAndPoliciesContainer} >
                        <TouchableOpacity
                          style={[terms ? styles.checkboxChecked : styles.checkboxBase]}
                          onPress={() => { aceptTerms(!terms) }}>
                          {terms ? <Ionicons name="checkmark-sharp" size={14} color="white" /> : null}
                        </TouchableOpacity>
                        <View>
                          <Text adjustsFontSizeToFit style={styles.textGlobalTermsAndPolicies}
                          >{'Acepto '}
                            <Text adjustsFontSizeToFit style={styles.textTermsAndPolicy}
                              onPress={() => { goToPrivacy() }}
                            >
                              {'Aviso de privacidad'}
                            </Text>
                            <Text adjustsFontSizeToFit style={styles.textWithoutUnderline}>
                              {' y '}
                            </Text>
                            <Text adjustsFontSizeToFit style={styles.textTermsAndPolicy }
                              onPress={() => { goToTermsConditions() }}>
                              {'Términos y Condiciones'}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View style={styles.saveSessionContainer} >
                        <TouchableOpacity
                          style={[keepSesion ? styles.checkboxChecked : styles.checkboxBase]}
                          onPress={() => { activeSession(!keepSesion) }}>
                          {keepSesion ? <Ionicons name="checkmark-sharp" size={14} color="white" /> : null}
                        </TouchableOpacity>
                        <Text  adjustsFontSizeToFit style={styles.textSaveSession}
                        >{'Mantener la sesión activa '}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )
            }
          />
        </View>
      </ImageBackground>

    </>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  checkboxBase: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 2,
    borderColor: '#D5DAE7',
    backgroundColor: 'transparent',
    marginRight: 15,
  },
  checkboxChecked: {
    width: 18,
    height: 18,
    borderRadius: 2,
    backgroundColor: '#42CEA6',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appContainer: {
    flex: 1,
    backgroundColor: color.white,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingTop: 15,
  },
  text: {
    color: color.darkGray,
    fontFamily: Roboto.Bold,
    fontSize: 16,
  },
  textUnderline: {
    fontFamily: Roboto.Regular,
    color: color.text,
    textDecorationLine: 'underline',
    fontSize: 12,
  },
  contentContainerStyle: {
    flexGrow: 1,
    marginTop: 30,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  listFooterComponentStyle: {
    flex:1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  textVersion: {
    textAlign: 'right',
    marginVertical: 10,
    marginRight: 20,
  },
  textNeedHelp: {
    fontFamily: Roboto.Medium,
    color: color.darkGray,
    fontSize: 14,
  },
  textChat: {
    fontFamily: Roboto.Regular,
    color: color.darkGray,
    fontSize: 14,
  },
  wspContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 45,
  },
  textWsp: {
    fontFamily: Roboto.Medium,
    color: color.black,
  },
  textSaveSession: {
    fontFamily: Roboto.Regular,
    color: color.darkGray,
    justifyContent: 'flex-start',
    fontSize: 12,
  },
  saveSessionContainer: { 
    flexDirection: 'row',
    marginTop: 12.5,
    alignItems: 'center',
  },
  textTermsAndPolicy: {
    fontFamily: Roboto.Regular,
    color: color.text,
    textDecorationLine: 'underline',
  },
  textWithoutUnderline: {
    fontFamily: Roboto.Regular,
    color: color.darkGray,
  },
  termsAndPoliciesContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: responsiveScreenWidth(80),
    alignItems: 'center',
  },
  textGlobalTermsAndPolicies: {
    color: color.darkGray,
    justifyContent: 'flex-start',
    fontSize: 12,
  },
});
