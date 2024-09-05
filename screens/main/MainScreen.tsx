import React, {ReactNode, useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import color from '../../utils/commons/ColorsCommon';
import * as Component from '../../components';
import HomeScreen from '../home/HomeScreen';
import {useDispatch, useSelector} from 'react-redux';
import { setTabSelector } from '../../store/tabBarSlice';
import { LoginStackParamList, MainStackParamList } from '../../AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootState } from '../../store/store';
import VerMasScreen  from '../../screens/profile/VerMasScreen'
import GalleryScreen from '../profile/GalleryScreen';

export type PropsMainScreen = NativeStackScreenProps<MainStackParamList & LoginStackParamList, 'Main'>;


const MainScreen : React.FC<PropsMainScreen> = ({navigation, route}) => {
  const Selected = useSelector((state: RootState) => state.tabBar.selectIndex);
  const [selection, setSelection] = React.useState<number> (0);

  useEffect(() => {
    setSelection(Selected);
  }, [Selected]);

  const _renderContent  = () => {
    switch (selection) {
       case 0: return <HomeScreen navigation={navigation} route={route} />;
      // case 1: return <HomeReferScreen navigation={navigation} />;
       case 2: return <GalleryScreen navigation={navigation} route={route} />;
       case 3:
         return <VerMasScreen navigation={navigation} route={route} />;
      //   break;
      // case 3: return <ProfileScreen navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      {_renderContent()}
      <Component.TabBarComponent />   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsiveScreenWidth(100),
    alignItems: 'center',
    backgroundColor: color.white,
  },
});

export default MainScreen;
