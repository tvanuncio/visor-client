import React, { ReactNode, useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity, KeyboardTypeOptions, ColorValue, DimensionValue } from 'react-native';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
const { width } = Dimensions.get("screen");
import color from '../utils/commons/ColorsCommon';
import { Roboto } from '../utils/commons/Fonts';

type PropsInputType = {
  marginVertical?: number,
  title?: string,
  maxLength?: number,
  placeholder? : string,
  value : string,
  color? : string,
  onChangeText? : ( text: string) => void,
  keyboardType?: KeyboardTypeOptions | undefined,
  secureTextEntry?: boolean,
  editable? : boolean | undefined,
  multiline? : boolean | undefined,
  numberOfLines? : number,
  icon? : ReactNode| undefined,
  inputTitle? : string,
  eye?: ReactNode | undefined,
  eyeOff? : ReactNode | undefined,
  colorLabel?: string,
  backgroundColor?: string,
  width? : DimensionValue,
  paddingLeft? : number,
  marginHorizontal? : number,
  padding? : number,
  borderRadius? : number
  paddingVertical? : number,
  borderColor? : string,
  borderWidth? : number,
  left? : number,


}

const Input = (props : PropsInputType) => {

  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <View style={{ marginVertical: props.marginVertical ? props.marginVertical : 10 }}>
      {props.title &&
        <Text  adjustsFontSizeToFit style={{ color: color.text, fontFamily: Roboto.Medium,marginVertical: props.marginVertical ? props.marginVertical : 10 }}>{props.title}</Text>
      }
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TextInput
          maxLength={props.maxLength}
          style={{ ...styles.input, backgroundColor: props.backgroundColor ? props.backgroundColor : color.grayBack, paddingLeft: props.paddingLeft ? props.paddingLeft : 45, marginVertical: props.marginVertical ? props.marginVertical : 0, marginHorizontal: props.marginHorizontal ? props.marginHorizontal : 0, padding: props.padding ? props.padding : 10, borderRadius: props.borderRadius ? props.borderRadius : 20, width: props.width ? props.width : width / 1.2, borderColor: focus ? color.blueBack : color.grayIcons, fontFamily: focus ? Roboto.Regular : Roboto.Regular, paddingVertical: props.paddingVertical ? props.paddingVertical : 12, }}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
          placeholderTextColor={color.grayIcons}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry && !showPassword ? true : false}
          editable={props.editable}
          multiline = {props.multiline}//Para hacerlo tipo text area
          numberOfLines = {props.numberOfLines ? props.numberOfLines : 1}//Para hacerlo tipo text area
          onBlur={() => { setFocus(false) }}
          onFocus={() => { setFocus(true) }}
        />

        {props.icon &&
          <View style={{ 
            position: 'absolute', 
            left: 15
            }}>
              
              {props.icon}
          </View>
        }

        {props.inputTitle &&
          <Text style={{ ...styles.text1, color: props.colorLabel ? props.colorLabel : color.text, left: props.left && props.left, }}>
            {props.inputTitle}
          </Text>
        }
        
        <View style={styles.iconPswContainer}>
          <TouchableOpacity
            style={styles.showPswButton}
            onPress={() => { setShowPassword(!showPassword) }}
          >
            {showPassword ? props.eye : props.eyeOff}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
  },
  text1: {
    position: 'absolute',
    fontFamily: Roboto.Medium,
    fontSize: 10,
    width: '75%',
    top: 5,
  },
  iconPswContainer: {
    position: 'absolute',
    right: 10,
  },
  showPswButton: {
    alignItems: 'center',
    width: responsiveScreenWidth(20),
    left: 15,
  },
});

export default Input;