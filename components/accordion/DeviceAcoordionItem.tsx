import React, { ReactNode, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';
import { responsiveScreenWidth, useResponsiveScreenWidth } from 'react-native-responsive-dimensions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

EvilIcons.loadFont()
Ionicons.loadFont()

type PropsDeviceAccordionItemType = {
  title : string;
  children : ReactNode;
}

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const DeviceAccordionItem : React.FC<PropsDeviceAccordionItemType> = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  
  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(!collapsed);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggleExpanded} style={styles.header}>
        <Ionicons name="tv-outline" size={30} color="#000" style={styles.iconTv} />
        <Text style={styles.title}>{title}</Text>
         <Ionicons name="settings-outline" size={25} color="#000" style={styles.iconTv} />
         <Ionicons name="trash-outline" size={25} color="#000" style={styles.iconTv} />         
         <Ionicons name="pencil-outline" size={25} color="#000" style={styles.iconTv} />         

      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align="center">
        <View style={styles.content}>
          {children}
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    marginVertical: 10,
    width: responsiveScreenWidth(90),
  },
  content: {
    padding: 15,
    backgroundColor: '#fff',
    width: responsiveScreenWidth(90),
  },
  iconTv: {
    marginHorizontal: 10,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 8,
    marginHorizontal: 10,
    paddingVertical : 5,
    paddingHorizontal:15,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeviceAccordionItem;
