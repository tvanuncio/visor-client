import React, { useEffect, useState } from 'react';
import { View, Text, Button,  StyleSheet, ScrollView, TouchableOpacity, Modal, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { elevationShadowStyle, simpleAlert } from '../../utils/commons/Functions';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import * as Component from '../../components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

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
import { FileSystemItem } from '../../utils/types/types';
import { red } from 'react-native-reanimated/lib/typescript/Colors';
import { PhotoFile } from 'react-native-vision-camera';
import { AppDispatch, RootState } from '../../store/store';
import { getDisplay } from 'react-native-device-info';
import { FetchDirectoryByIdParams, getDirectory } from '../../store/directorySlice';
import DocumentPicker, { types }  from 'react-native-document-picker';

export type PropsGalleryScreen = NativeStackScreenProps<MainStackParamList & LoginStackParamList, 'Main'>;

const GalleryScreen : React.FC<PropsGalleryScreen> = ({ navigation, route }) => {
  const [modalPicture, setModalPicture] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [fileSystem, setFileSystem] = useState<FileSystemItem[]>([]);
  const [picture, getPicture] = useState<PhotoFile | null>(null);
  const {directoryData, loading, error } = useSelector( (state: RootState) => state.directory);
  const { signInData } = useSelector ( (state: RootState) => state.user)
  const [filename, setFilename] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() =>{
    const requestDirectory : FetchDirectoryByIdParams = {
      "rootId" : Number(signInData?.directoryId),
      "token" : signInData?.accessToken || ""
    }
     dispatch(getDirectory(requestDirectory))
  },[signInData]);

  useEffect( () => {
    console.log("directoryData", directoryData);
    console.log("loading : " , loading);
    console.log("Error ", error);
    setShowLoading(loading);
    if (loading == false && error && 'statusCode' in error){
        simpleAlert("Error : " + error.description)
        return;
    }

    if (loading == false && directoryData ) {
       setFileSystem(directoryData);
    }

  },[directoryData, loading, error])


  const addFolder = () => {
    setModalVisible(true);
 }


 const selectFile = async () => {
  try {
    const result = await DocumentPicker.pick({
      type: [types.images, types.pdf],
      allowMultiSelection: true,
    });
    console.log('Archivos seleccionados:', result);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('Selección de archivo cancelada');
    } else {
      console.error('Error al seleccionar archivo:', err);
    }
  }
};
 
 const openGallery = async () => {
    console.log("va a seleccionar un archivo")
    const pickedFile = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
    });

    console.log(pickedFile);
 }

  return (
    <View style={[styles.container]}>
        <View style={{borderWidth : 1, flexShrink: 1}}>
            <Component.HeaderComponent
                logo={true}
                navigation={navigation}
            />
            <View style={{borderWidth: 1, borderColor: "red"}}>

                <View style={{marginBottom: 2, marginVertical: 2, backgroundColor: "white" , borderWidth: 2}}>
                                {picture && picture.path &&
                                    <Image
                                        source={{ uri: `file://${picture.path}` }} 
                                        resizeMode={'contain'}
                                    />
                                }
                                <View style={{ alignItems: 'center', marginBottom:15  }}>
                                    <TouchableOpacity
                                        style={{ alignItems: 'center', justifyContent: 'center', marginVertical:15, borderRadius:50, backgroundColor: color.greenLight }}
                                        onPress={() => { setModalPicture(true) }}
                                    >
                                        <Image
                                            style={{tintColor:color.blueBack}}
                                            source={require('../../utils/images/icon/camera.png')}
                                            resizeMode={'contain'}
                                        />
                                    </TouchableOpacity>
                                    <Text style={[styles.text2]}>
                                        {`Tomar una foto`}
                                    </Text>
                                </View>
                </View>
                <View>
                    <TouchableOpacity
                              style={{ alignItems: 'center', justifyContent: 'center', marginVertical:15, borderRadius:50, backgroundColor: color.greenLight }}
                              onPress={selectFile}
                          >
                                        <Image
                                            style={{tintColor:color.blueBack}}
                                            source={require('../../utils/images/icon/backArrow.png')}
                                            resizeMode={'contain'}
                                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={{
            alignContent: 'flex-start',
            alignItems: 'flex-start', 
            justifyContent: 'flex-start',
            flex: 1, //ocupa el spacio restante
            borderWidth: 1,
        }}>  
                <Component.FileExplorer data={fileSystem} />
        </View>

            {modalPicture ?
                        <Modal
                            animationType="fade"
                            visible={modalPicture}
                            onRequestClose={() => { setModalPicture(false) }}>
                            <Component.CameraComponent
                                back={() => setModalPicture(false)}
                                needQr={false}
                                getPicture={getPicture}
                                
                            />
                        </Modal> 
                    : 
                        null
            }
            {showLoading && <Component.LoadingComponent />}
       
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.grayBackTwo,
    alignItems: 'center',
    height: responsiveScreenHeight(83),
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
  viewImage: {
      left: 15,
      top: 5
  },
  text1: {
      position: 'absolute',
      fontFamily: Roboto.Regular,
      fontSize: 16,
      color: color.darkGray,
      left: 50,
  }, 
  text2: {
    color: color.darkGray,
    fontFamily: Roboto.Bold,
    fontSize: 12,
  },
  navImg: {
      right: 25,
  },
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
    height: responsiveScreenHeight(55),
  },
  input: {
    padding: 15,
    alignItems: "center",
    backgroundColor: color.white,
    width: responsiveScreenWidth(45),
    borderRadius: 10,
    borderColor: color.blueBack,
    borderWidth: 1.5,
    marginTop: 10,
  },
})

export default GalleryScreen;