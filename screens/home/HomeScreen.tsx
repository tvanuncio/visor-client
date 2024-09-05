import React, {useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../utils/commons/ColorsCommon';
import {Roboto} from '../../utils/commons/Fonts';
import * as Component from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {REACT_APP_PRODUCTION} from '@env';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginStackParamList, MainStackParamList } from '../../AppNavigator';
import { AppDispatch, RootState } from '../../store/store';
import { FetchDevicesParams, getAllDevices } from '../../store/deviceSlice';
import { FetchFindBySegmentParams, findBannerBySegment } from '../../store/bannerSlice';
import { simpleAlert } from '../../utils/commons/Functions';

Octicons.loadFont()
Ionicons.loadFont()

export type PropsHomeScreen = NativeStackScreenProps<MainStackParamList & LoginStackParamList, 'Main'>;

const HomeScreen : React.FC<PropsHomeScreen> = ({ navigation, route  }) => {

  const dispatch = useDispatch<AppDispatch>();
  const UserToken = useSelector((state: RootState) => state.user.signInData?.accessToken);
  const tenantId = useSelector((state: RootState) => state.user.signInData?.tenantId);
  const { devices, loading, error } = useSelector((state: RootState) => state.device);
  const { banners , loading : loadingBanners, error : errorBanners } = useSelector((state: RootState) => state.banners);
  
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    initial();



  }, []);

  useEffect( () => {
    
    setShowLoading(loading);
    console.log("Devices : " + devices)


  },[devices, loading,error])

  useEffect(() => {
    if (UserToken && UserToken.length > 0){
      let params : FetchDevicesParams = {request : {"tenantId": tenantId}, token : UserToken};
      dispatch(getAllDevices(params))
      let paramFindBanners : FetchFindBySegmentParams = { segment : "General" , token : UserToken}
      dispatch(findBannerBySegment(paramFindBanners))
    }

  },[UserToken])

  useEffect ( () => {
    console.log("banners: ", banners);
    console.log("loadingBanner : " , loadingBanners);
    console.log("errorBanners ", errorBanners);

    if (loadingBanners == false && errorBanners && 'statusCode' in errorBanners){
      simpleAlert("Error : " + errorBanners.description)
      return;
   }

   if (loadingBanners == false && banners && 'length' in banners ) {
     

   }
  },[banners,loadingBanners,errorBanners])


  const initial = () => {
    Keyboard.dismiss();
  };


  return (
    <LinearGradient colors={[color.blueMain || '#FFFFFF', '#FFFFFF']} start={{ x: 0, y: 0.3 }} end={{ x: 0, y: .5 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : responsiveScreenHeight(12)}
        style={{alignItems: 'center' }}
      >

        {/* <NavigationEvents onDidFocus={payload => initial()} /> */}

        <Component.HeaderComponent
          logo={true}
          navigation={navigation}
          colorRGB={color.blueMain}
          backgroundColorText={color.white}
          backgroundColorIcons={color.greenMain}
        />

        <View style={{ ...styles.block, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 10,}}>
        {/*  <ScrollView>
            <View
              style={{  borderTopLeftRadius: 20, borderTopRightRadius: 20,}}>

               <Text> 1.. Estoy en Home 3</Text>
            </View>
            {
              devices && devices.map((dev, idx) => {
                return <Text key={idx}>{dev.macaddress} - {dev.viewsScreen?.length} screens</Text>
              })
            }
           </Animated.ScrollView> 
          </ScrollView>*/}
          
          <Component.BannersComponent banners={banners} navigation={navigation}  newHeight={responsiveScreenHeight(19)} />
          
          <ScrollView>
            {
                devices && devices.map((dev, idx) => {
                return (
                  <Component.DeviceAccordionItem key={'idx' + idx} title={dev.macaddress || ''}>
                      {
                        dev.viewsScreen && dev.viewsScreen.map ((screen, idxScreen) => {
                          return <Component.DeviceScreenItem key={'k' + idxScreen} device={dev} screen={screen} />
                        })
                      }
                  </Component.DeviceAccordionItem>
                );

              })
            }


          </ScrollView>
        </View>
        {showLoading ? <Component.LoadingComponent /> : null}
      </KeyboardAvoidingView>
    </LinearGradient>
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
});

export default HomeScreen;
