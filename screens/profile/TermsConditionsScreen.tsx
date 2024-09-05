import React from 'react';
import * as Components from '../../components';
import {  StyleSheet, View} from 'react-native';
import color from '../../utils/commons/ColorsCommon';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoginStackParamList, MainStackParamList } from '../../AppNavigator';
import { PropsMainScreen } from '../main/MainScreen';
SimpleLineIcons.loadFont();
Entypo.loadFont();

export type PropsTermsConditionScreen = NativeStackScreenProps<MainStackParamList & LoginStackParamList,'TermsConditions'>;



const TermsConditionsScreen: React.FC<PropsTermsConditionScreen> = ({ navigation }) => {
  
  return (
    <View>
      <Components.HeaderCar
        title="Términos y condiciones"
        navigation={navigation}
      />
      <Components.TermsConditionsComponent backgroundColor={color.grayBackTwo} styleParagraphe={styles.paragraphe} styleTitle={styles.title}/>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  paragraphe: {
    fontSize: 18,
  }
})

export default TermsConditionsScreen;