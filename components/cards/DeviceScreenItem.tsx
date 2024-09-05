import React, { ReactNode, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';
import { responsiveScreenWidth, useResponsiveScreenWidth } from 'react-native-responsive-dimensions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DeviceInfoDto, ViewScreenData } from '../../utils/types/types';

EvilIcons.loadFont()
Ionicons.loadFont()

type PropsDeviceScreenItemType = {
  device : DeviceInfoDto
  screen : ViewScreenData;
}

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const DeviceScreenItem : React.FC<PropsDeviceScreenItemType> = ({ device, screen }) => {
  const [collapsed, setCollapsed] = useState(true);

  
  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(!collapsed);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggleExpanded} style={styles.header}>
        <Ionicons name="square-outline" size={30} color="#000" style={styles.iconTv} />
        <View style={styles.seccion_a}>
            <Text style={styles.title}>{screen.dateStart}</Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={25} color="#000" style={styles.icon} />
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align="center">
        <View style={styles.content}>
            <View style={styles.seccion_icons}>
                <Ionicons name="settings-outline" size={25} color="#000" style={styles.icon} />
                <Ionicons name="trash-outline" size={25} color="#000" style={styles.icon} />         
                <Ionicons name="pencil-outline" size={25} color="#000" style={styles.icon} />         
            </View>     
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
    marginVertical: 10,
    width: responsiveScreenWidth(90),
  },
  content: {
    flex: 1,
    alignItems: "flex-end",
    padding: 15,
    backgroundColor: '#fff',
    width: responsiveScreenWidth(90),
  },
  iconTv: {
    marginHorizontal: 35,
  },
  icon : {
    marginHorizontal: 10,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    paddingVertical : 5,
    paddingHorizontal:35,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  seccion_a: {
    flex: 1,
    fontSize: 16,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  seccion_icons: {
   
    flexDirection : "row",
    alignContent : "flex-end",
    alignItems: "flex-end",
  }
});

export default DeviceScreenItem;
