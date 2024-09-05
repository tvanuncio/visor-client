import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet,Text,Image, View, Dimensions, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { Camera, PhotoFile, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { alertCallbackActionCancellation, simpleAlert, alertCallbackAction } from '../../utils/commons/Functions';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useIsFocused } from '@react-navigation/native';
import { useAppState } from '@react-native-community/hooks';

type PropsCameraScreenType = {
    back: ()  => void;
    needQr? : boolean;
    getPicture : (image : PhotoFile) => void
  //  getBarcodes? : ( barcodes : Barcode[]) => void | undefined
  }
  
  const  CameraComponent : React.FC<PropsCameraScreenType> = ({ back, needQr = false, getPicture, }) => {
    const { hasPermission, requestPermission } = useCameraPermission()
    const isFocused = useIsFocused()
    const appState = useAppState()
    const isActive = isFocused && appState === "active"
    const camera = useRef<Camera>(null); 

  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera'
    ]
  })
  
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const [showCamera, setShowCamera] = useState<boolean>(false)

  useEffect(() => {
    if (Platform.OS === 'android') {
       _requestPhotosPermission()
    } else {
      detectOrientation();
      setShowCamera(true)
    }

     // Suscribirse a los cambios de dimensión
     const subscription = Dimensions.addEventListener('change', detectOrientation);

     // Limpiar la suscripción cuando el componente se desmonte
     return () => {
       if (subscription) subscription.remove();
     };   
  }, [])

  const detectOrientation = () => {
    const { height, width } = Dimensions.get('window');
    if (width > height) {
      console.log("Camara ladscape")
      setOrientation('landscape')
    } else {
      console.log("Camara portraint")
      setOrientation('portrait')
    }
  };


  const takePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      getPicture(photo)
      back()
      console.log(photo);
    }
  };


  const _requestPhotosPermission = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ];
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      console.log('PERMISSION', granted);
      if (granted["android.permission.CAMERA"] === 'granted') {
        setShowCamera(true)
      } else {
        alertCallbackActionCancellation(() => { back() }, 'Se requieren permisos para acceder a la camara' )
      }
    } catch (err) {
      console.warn(err)
    }
  }

  if (device == null) return <Text> no hay camara </Text>;

  return (
    <View style={styles.container}>
      { (device && showCamera) && 
      <Camera
      style={
        orientation === 'portrait'
          ? styles.portraitCamera
          : styles.landscapeCamera
      }
      ref={camera}
      device={device}
      isActive={isActive}
      photo={true}
    />
      } 
      
      {!needQr &&
        <View style={{ position: 'absolute', bottom: responsiveScreenHeight(12), width: '100%', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => { takePhoto() }}>
            
            <Image
              source={require('../../utils/images/icon/picture.png')}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  portraitCamera: {
    flex: 1,
    //width: responsiveScreenWidth(100),
    //height: responsiveScreenHeight(100),
    //transform: [{rotate: '0deg' }],
  },
  landscapeCamera: {
    flex: 1,
    //transform: [{ rotate: '90deg' }],
    //width: responsiveScreenHeight(100),
    //height: responsiveScreenWidth(100),
  },
});

export default CameraComponent;