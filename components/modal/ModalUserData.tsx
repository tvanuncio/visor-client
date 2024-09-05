import React, { useEffect, useState } from 'react'
import { View, Text, Modal, Image, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Component from '../../components';

import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import { simpleAlert, validateEmail, validateInputsNums, validatePhoneNumber } from '../../utils/commons/Functions';

type PropsModalUserDataType = {
   show : boolean,
   setShow : (value : boolean) => void,
}

function ModalUserData({show, setShow} : PropsModalUserDataType) {

  /*
  const dispatch = useDispatch();
  const UserToken = useSelector(state => state.signIn.signInData.SignIn.access_token);
  const User = useSelector(state => state?.getUser?.getUserData?.User);
  const UpdateUser = useSelector(state => state?.updateUser);
  */
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
/*
  useEffect(() => {
    if(User){
      if(User !== 'EMPTY') {
        const {email, firstName, lastName, mobilePhone} = User;
        setName(firstName || '');
        setLastName(lastName || '');
        setPhone(mobilePhone || '');
        setEmail(email || '');
      }
      setLoading(false);
    }
  }, [User]);

  

  useEffect(() => {
    if(UpdateUser && UpdateUser.updateUserData && UpdateUser?.updateUserData?.status) {

      if(UpdateUser?.updateUserData?.status === 200) {
        alertCallbackActionCancellation(() => {setShow(false)}, "La información fue actualizada exitosamente");
      } else {
        simpleAlert("Hubo un error al procesar la información, intenta de nuevo.");
      }
      setLoading(false);
    }
    if (UpdateUser && UpdateUser.updateUserError && UpdateUser.updateUserError.error) {
      setLoading(false);
      simpleAlert("Hubo un error al procesar la información, intenta de nuevo.");
    }
  }, [UpdateUser]);
*/

  const handlePostData = () => {
    setLoading(true);
    let error = '';
    if(name.length === 0) {
      error += 'Debe ingresar un nombre\n';
    } else if (validateInputsNums(name)) {
      error += 'Debe ingresar un nombre válido\n';
    }
    if(lastName.length === 0) {
      error += 'Debe ingresar un apellido\n';
    } else if (validateInputsNums(lastName)) {
      error += 'Debe ingresar un apellido válido\n';
    }
    if(phone.length === 0) {
      error += 'Debe ingresar un número de celular\n';
    } else if(!validatePhoneNumber(phone)) {
      error += 'Debe ingresar un número de celular válido\n';
    }
    if(email.length === 0) {
      error += 'Debe ingresar un correo electrónico\n';
    } else if(!validateEmail(email)) {
      error += 'Debe ingresar un correo electrónico válido\n';
    }
    
    if(error.length > 0) {
      setLoading(false);
      simpleAlert(error);
    } else {
      const data = {
        firstName: name,
        lastName,
        email,
        mobilePhone: phone
      }
      //dispatch(Actions.UpdateUserAction(data, UserToken));
    }
  }

  return (
    <Modal visible={show} transparent={true}>
      <View style={styles.mainContainer}>
        <View style={styles.modal}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../utils/images/user.png')}
            style={{width: responsiveWidth(25)}}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.title}>¡Hola!</Text>
        <Text style={styles.message}>Por tu seguridad completa la información de tu perfil, esto nos ayudará en caso de que olvides tu contraseña.</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <Component.Input
              value={name}
              onChangeText={(val) => {setName(val)}}
              placeholder={'Nombre del dueño'}
              color={'black'}
            ></Component.Input>
            <Component.Input
              value={lastName}
              onChangeText={(val) => {setLastName(val)}}
              placeholder={'Apellido del dueño'}
              color={'black'}
              marginVertical={5}
            ></Component.Input>
            <Component.Input
              value={phone}
              onChangeText={(val) => {setPhone(val)}}
              placeholder={'Número de celular'}
              keyboardType={'phone-pad'}
              color={'black'}
              marginVertical={5}
            ></Component.Input>
            <Component.Input
              value={email}
              onChangeText={(val) => {setEmail(val)}}
              placeholder={'Correo electrónico'}
              keyboardType={'email-address'}
              color={'black'}
              marginVertical={5}
            ></Component.Input>
            {
              loading ? <ActivityIndicator color={color.blueBack} size="large" />
              : <Component.Button
                text="Guardar"
                color={color.blueBack}
                textColor={color.white}
                onPress={() => {handlePostData()}}
                marginTop={40}
                disabled={loading}
              />
            }
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.5),
    fontFamily: Roboto.Bold,
    color: color.text,
    marginVertical: 10
  },
  modal: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: responsiveHeight(90),
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 20
  },
  message: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.8),
    marginBottom: 10
  },
  container: {
    flex: 1
  },
  mainContainer: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
});

export default ModalUserData;