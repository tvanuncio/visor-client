import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Platform, PermissionsAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Component from '..';
import { Barcode, CameraType, GoogleVisionBarcodesDetectedEvent, RNCamera, TakePictureResponse } from 'react-native-camera';
import color from '../../utils/commons/ColorsCommon';
import { alertCallbackActionCancellation, simpleAlert, alertCallbackAction } from '../../utils/commons/Functions';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
const windowWidth = Dimensions.get('window').width;
const heightWidth = Dimensions.get('window').height;
import ImagePicker from 'react-native-image-crop-picker';
import { Image as CropPickerImage } from 'react-native-image-crop-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

EvilIcons.loadFont()
Ionicons.loadFont()


type FlashMode = 'off' | 'on' | 'auto' | 'torch';

const flashModeOrder: Record<FlashMode, FlashMode> = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const flashIcons = {
  'on': 'flash',
  'auto': 'flash-auto',
  'off': 'flash-off',
  'torch': 'flashlight',
}

type PropsCameraScreenType = {
  back: ()  => void;
  needQr? : boolean;
  getPicture : (image : CropPickerImage) => void
  getBarcodes? : ( barcodes : Barcode[]) => void | undefined
}

const  CameraComponent : React.FC<PropsCameraScreenType> = ({ back, getPicture, getBarcodes, needQr = false, }) => {

  let camera = useRef<RNCamera | null>(null);
  const dispatch = useDispatch();
  const [flashMode, setFlash] = useState<FlashMode>('off');
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [showCamera, setShowCamera] = useState<boolean>(false)
  const [dataQr, setDataQr] = useState<Barcode[]>([])
  const [showLoading, setShowLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<number>(0)
  const [dataImageSel, setDataImageSel] = useState<TakePictureResponse | null> (null)
  let cameraOrientation: "auto" | "landscapeLeft" | "landscapeRight" | "portrait" | "portraitUpsideDown" = 'portrait';


  const detectOrientation = () => {
    const { height, width } = Dimensions.get('window');
    if (width > height) {
      console.log("Camara ladscape")
      cameraOrientation ="landscapeLeft"
    } else {
      cameraOrientation ="portrait"
      console.log("Camara portraint")
    }
  };

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


  const takePicture = async () => {
    console.log('Clock');
    if (camera.current) {
      const options = { quality: 0.4, base64: true, fixOrientation: true };
      const data = await camera.current.takePictureAsync(options);
      console.log('FILE IMAGE', data);
      setDataImageSel(data)
    }
  };

  const _requestPhotosPermission = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
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

  const imageCrop = () => {
    
    ImagePicker.openCropper({
      path: dataImageSel && dataImageSel.uri ? dataImageSel.uri : "",
      width: 200,
      height: 70,
      cropping: true,
      includeBase64: true,
      cropperCancelText: 'Cancelar',
      cropperChooseText: 'Seleccionar',
      cropperToolbarTitle: 'Selecciona la imagen de tu promoción',
      mediaType: 'photo',  
    }).then(image => {
      getPicture(image)
      setDataImageSel(null)
      setShowCamera(false);
      Platform.OS === "ios" && back()

      
   
   // back()
      return
    }).catch(error => {
      setDataImageSel(null)
      ImagePicker.clean().then(() => { }).catch(e => { });
      return console.log("error", error);
    }).finally(() =>
      Platform.OS === "android" && back()
    );
  }
  
  const renderTakePicture = () => {
    if (dataImageSel) {
      imageCrop()
    } else {
      const orientation = cameraOrientation === 'portrait' || cameraOrientation === 'landscapeLeft'
      ? cameraOrientation
      : 'auto';
    
      return (
        <>
          <RNCamera
            ref={camera}
            style={styles.preview}
            type={type}
            flashMode={RNCamera.Constants.FlashMode[flashMode]}
            orientation="landscapeLeft" 
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Permiso para usar la camara',
              message: 'Se requiere permiso para usar la camara para leer codigos QR',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancelar',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          {/*
          <View style={{ width: '100%', height: '15%', backgroundColor: 'rgba(255,255,255,0.2)', position: 'absolute' }}></View>
          <View style={{ width: '100%', height: '25%', backgroundColor: 'rgba(255,255,255,0.2)', position: 'absolute', bottom: 0 }}></View>
           */}
        </>
      )
    }
  }
  const orientation = cameraOrientation === 'portrait' || cameraOrientation === 'landscapeLeft'
      ? cameraOrientation
      : 'auto';
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnBack} onPress={() => { back(), setStatus(0) }}>
          <Ionicons name={'chevron-back-outline'} size={30} color={color.green} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{`${needQr ? 'Escanea el codigo QR' : 'Tomar la 1 foto'}`}</Text>
        </View>
      </View>
      
      {showCamera ?
        <View>
          {needQr ?
            <>
              <RNCamera
                ref={camera}
                style={styles.preview}
                type={type}
                orientation={orientation} 
                flashMode={RNCamera.Constants.FlashMode[flashMode]}
                androidCameraPermissionOptions={{
                  title: 'Permiso para usar la camara',
                  message: 'Se requiere permiso para usar la camara para leer codigos QR',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancelar',
                }}
                androidRecordAudioPermissionOptions={{
                  title: 'Permission to use audio recording',
                  message: 'We need your permission to use your audio',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                onGoogleVisionBarcodesDetected={
                  needQr ? ( {barcodes} : GoogleVisionBarcodesDetectedEvent) => {
                    setDataQr(barcodes);
                    getBarcodes && getBarcodes(barcodes);
                  }
                    :             
                    undefined
                }
              />
              {/* 
              <View style={{ width: '100%', height: '15%', backgroundColor: 'rgba(255,255,255,0.2)', position: 'absolute' }}></View>
              <View style={{ width: '100%', height: '25%', backgroundColor: 'rgba(255,255,255,0.2)', position: 'absolute', bottom: 0 }}></View>
              */}
            </>
            :
            <>
              {renderTakePicture()}
            </>
          }
        </View>
        :
        null
      }

      <>
      {!needQr &&
        <View style={{ position: 'absolute', bottom: responsiveScreenHeight(12), width: '100%', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => { takePicture() }}>
            
            <Image
              source={require('../../utils/images/icon/picture.png')}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
      }
      </>
      {showLoading && <Component.LoadingComponent />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(100),
    backgroundColor: color.white
  },
  preview: {
    width: windowWidth,
    height: responsiveScreenHeight(90)
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  header: {
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    padding: 15,
    alignItems: 'center',
  },
  btnBack: {
    marginRight: 15,
    width: responsiveScreenWidth(10),
    height: responsiveScreenWidth(10),
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    color: color.text,
    fontWeight: 'bold',
  },
  title1: {
    fontSize: 18,
    color: color.darkGray,
    fontWeight: 'bold',
  },
  subtitle: {
    color: color.text,
    width: 250,
  },
  barTools: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CameraComponent;
