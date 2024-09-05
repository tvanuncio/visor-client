import React, {useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../utils/commons/ColorsCommon';
import {Roboto} from '../../utils/commons/Fonts';
import * as Components from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {REACT_APP_PRODUCTION} from '@env';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../../AppNavigator';
import { AppDispatch, RootState } from '../../store/store';
import CacheUtils from '../../utils/cache/CacheUtils'
import moment from 'moment-timezone';
import { simpleAlert, validateEmail } from '../../utils/commons/Functions';
import { createUser } from '../../store/createUserSlice';
import { CreateUserDto } from '../../utils/types/types';
import { UserDataType } from '../../utils/types/GlobalTypes';
import CacheUtil from '../../utils/cache/CacheUtils';

Octicons.loadFont()
Ionicons.loadFont()

type PropsCreateAccountScreen = NativeStackScreenProps<LoginStackParamList, 'createdAccount'>;

const CreateAccountScreen : React.FC<PropsCreateAccountScreen> = ({ navigation, route  }) => {

  const dispatch = useDispatch<AppDispatch>();
  const UserToken = useSelector((state: RootState) => state.user.signInData?.accessToken);
  //const { devices, loading, error } = useSelector((state: RootState) => state.device);
  const [name, setName] = useState<string> ("")
  const [email, setEmail] = useState<string>("")
  const [cellphone, setCellphone] = useState<string>("")
  const [timezone, setTimezone] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")
  const [giroNegocio, setGiroNegocio] = useState<string>("")
  const [terms, setTerms] = useState(false);
  const [waitingRoom, setWaitingRoom] = useState<boolean> (false);
  const { createUserResponse, loading, error } = useSelector((state: RootState) => state.account);
  
  useEffect(() => {
    initial();
    const tz = moment.tz.guess();
    setTimezone(tz);
    console.log ("Timezone : " + tz)
  }, []);


  const initial = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    console.log("sigindata", createUserResponse);
    console.log("loading : " , loading);
    console.log("Error ", error);

    if (loading == false && error && 'statusCode' in error){
      simpleAlert("Error : " + error.description)
      return;
    }

    if (loading == false && createUserResponse ) {
      let dataUser : UserDataType = {
        user : username,
        password
      }
      CacheUtils.setUserData(dataUser).then( () => {
        CacheUtils.setTerms(terms);
        CacheUtils.setAccountCreated(true);
      });

      simpleAlert("Se ha creado la cuenta con exito, ¡Felicidades!");
      navigation.navigate('Login');
    }

  },[createUserResponse, loading, error]);

  
  const goToTermsConditions = () => {
    navigation.navigate('TermsConditions')
    setTerms(true)
  }

  const goToPrivacy = () => {
    navigation.navigate('Privacy')
    setTerms(true)
  }

  const aceptTerms = (check : boolean) => {
    CacheUtils.setTerms(check);
    setTerms(check);
  }

  const gotoLogin = () => {
     navigation.navigate('Login')
  }

  const validateDataFill = ()  => {
      const errors : string [] = [];

      if (name.trim().length == 0) {
         errors.push("Nombre");
      }

      if (email.trim().length == 0){
        errors.push("Correo electronico");
      }

      if (cellphone.trim().length == 0){
        errors.push("Celular")
      }

      if (username.trim().length == 0) {
        errors.push("Usuario")
      }

      if (password.trim().length == 0) {
        errors.push("Contraseña")
      }

      if (password2.trim().length == 0) {
        errors.push("Repeticion contraseña")
      }
      console.log("errores : " + errors.toString())
      return errors;
  }

  const validaData = () => {
    const errors = validateDataFill();
    if (errors.length > 0){
      simpleAlert("Estos datos son obligatorios " + errors.join(","))
      return false;
    }

     if (validateEmail(email) == false) {
      simpleAlert("Correo electronico invalido ")
      return false;      
     }


     if (username.trim().split(" ").length > 1) {
      simpleAlert("El usuario no debe contener espacion en blanco ")
      return false;       
     }
    if (password.trim().length < 8) {
      simpleAlert("El password no debe ser menor a 8 caracteres ")
      return false; 
    }

    if (password.trim() != password2) {
      simpleAlert("Los passwords no coinciden ")
      return false;
    }

    if (terms == false){
      simpleAlert("Acepte la privacidad y Terminos y Condiciones")
      return false
    }


    return true;
  }

  const sendCreateUser = () => {
    if (validaData() == false){
      return false;
    }

    let nameParts : string[] = name.split(" ")
    
    let createUserData : CreateUserDto = {
      firstName : nameParts[0],
      lastName  : nameParts.length > 1 ? nameParts[1] : nameParts[0],
      email,
      cellphone,
      timezone,
      username,
      password,
      enabled : true,
      waitingRoom
    }
  
    dispatch(createUser({ request : createUserData}));
  }

  return (   
   
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : responsiveScreenHeight(12)}
        style={{alignItems: 'center' }}
      >
        <Components.HeaderCar
            title="Crear una cuenta"
            navigation={navigation}
            styleTitle= {{fontWeight : 'bold', fontSize: 25, marginLeft: 35}}
            goto={gotoLogin}
        />
        <ScrollView>

          <Components.Input
            title='(*) Nombre '
            placeholder="Ingrese su nombre"
            value={name}
            marginVertical ={2}
            onChangeText={ (text : string) => setName(text)}  
          />
          <Components.Input
            title='(*) Correo electronico '
            placeholder="Ingrese su correo electronico"
            value={email}
            marginVertical ={2}
            onChangeText={ (text : string) => setEmail(text)}  
          />
          <Components.Input
            title='(*) Celular '
            placeholder="Ingrese su celular"
            value={cellphone}
            marginVertical ={2}
            keyboardType={Platform.OS === 'android' ? "numeric" : 'number-pad'}
            onChangeText={ (text : string) => setCellphone(text)}  
          />
          <Components.Input
            title='Giro del negocio '
            placeholder="Ingrese el giro del negocio"
            value={giroNegocio}
            marginVertical ={2}
            onChangeText={ (text : string) => setGiroNegocio(text)}  
          />
          <Components.Input
            title='(*) Usuario '
            placeholder="Ingrese su usuario"
            value={username}
            marginVertical ={2}
            onChangeText={ (text : string) => setUsername(text)}  
          />
          <Components.Input
            title='(*) Contraseña '
            placeholder="Ingrese su contraseña"
            value={password}
            marginVertical ={2}
            onChangeText={ (text : string) => setPassword(text)}  
          />
          <Components.Input
            title='(*) Repita su contraseña '
            placeholder="Ingrese nuevamente contraseña"
            value={password2}
            marginVertical ={2}
            onChangeText={ (text : string) => setPassword2(text)}  
          />
   
        {loading ? <Components.LoadingComponent /> : null}
        </ScrollView>
                  
        <View style={{width:responsiveScreenWidth(90), marginBottom : 15}}>
            
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
            
        </View>
        
        <Components.Button
          text="Crear cuenta"
          color={color.blueMain}
          textColor='white'
          onPress={()=>{sendCreateUser()}}
        />
   
      </KeyboardAvoidingView>

    
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    backgroundColor: color.white,
    paddingBottom: responsiveScreenHeight(10),
    width : responsiveScreenWidth(98),
    flex: 1
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
  checkboxChecked: {
    width: 18,
    height: 18,
    borderRadius: 2,
    backgroundColor: '#42CEA6',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
});

export default CreateAccountScreen;
