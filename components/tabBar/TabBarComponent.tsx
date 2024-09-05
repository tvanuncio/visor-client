import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import color from '../../utils/commons/ColorsCommon';
import { Roboto } from '../../utils/commons/Fonts';
import { elevationShadowStyle } from '../../utils/commons/Functions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setTabSelector } from '../../store/tabBarSlice';

const TabBarComponent = () => {
  const dispatch = useDispatch();
  const Selected = useSelector((state: RootState) => state.tabBar.selectIndex);

  const options = [
    { name: 'Inicio', iconActive: require('../../utils/images/tabs/inicioActive.png'), iconInactive: require('../../utils/images/tabs/inicioInactive.png'), selected: false },
    { name: 'Vende más', iconActive: require('../../utils/images/tabs/vendemasActive.png'), iconInactive: require('../../utils/images/tabs/vendemasInactive.png'), selected: false },
    { name: 'Recompensas', iconActive: require('../../utils/images/tabs/recompensasActive.png'), iconInactive: require('../../utils/images/tabs/recompensasInactive.png'), selected: false },
    { name: 'Ver más', iconActive: require('../../utils/images/tabs/vermasActive.png'), iconInactive: require('../../utils/images/tabs/vermasInactive.png'), selected: false },
  ];

  React.useEffect( () => {
      console.log("index tab = ", Selected)
  },[Selected])
  const tabs = () => {
    let width = (responsiveScreenWidth(100) / 3.7) - 3.7
    return options.map((option, i) => {
      return (
        <TouchableOpacity
          key={i}
          onPress={() => {
            dispatch(setTabSelector(i))
          }}>
          <View style={[
            { width: width, alignItems: 'center', justifyContent: 'center' }
          ]}>
            <Image
              style={{ width: 35, height: 35,}}
              source={Selected === i ? option.iconActive : option.iconInactive}
              resizeMode={'contain'}
            />
            <Text 
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{
              fontSize: option.name.length > 10 ? 9.8 : 10,
              fontFamily: Selected === i ? Roboto.Regular : Roboto.Light,
              color: Selected === i ? color.text : color.grayLine,
              marginTop: 5,
              textAlign: 'center',
            }}>{option.name}</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }
  
  return (
    <View style={[elevationShadowStyle(20, 'black'), styles.container]}>
      {tabs()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: color.white,
    position: 'absolute',
    bottom: 0
  }
});

export default TabBarComponent;