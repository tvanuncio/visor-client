import React from 'react';
import { Text, View, Dimensions, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
const { width } = Dimensions.get("screen");
import { Roboto } from '../utils/commons/Fonts';
type PropsButtonType = {
   text : string,
   color: string,
   borderWidth? : number,
   borderColor? : string,
   marginTop? : number,
   marginVertical? : number,
   marginBottom? : number, 
   paddingVertical? : number,
   paddingHorizontal?: number,
   position?: 'absolute' | 'relative' | 'static' | undefined,
   disabled? : boolean,
   width?    : number,
   borderRadius? : number,
   fontSize? : number, 
   lowerCase? : boolean,
   isSpinner ? : boolean,
   confirmation? : boolean,
   textColor? : string,
   onPress? : () => void,
}

const Button = (props : PropsButtonType) => {
  
  return (
    <View 
         style={{
             alignItems:'center', justifyContent:'center'
            }}>
      <TouchableOpacity
        style={{
          ...styles.globalStylesButton,
          backgroundColor: props.color,
          borderWidth: props.borderWidth?props.borderWidth :1,
          width: props?.width ? props?.width : width / 1.1,
          borderRadius: props.borderRadius ? props.borderRadius : 10,
          borderColor: props.borderColor,
          marginTop: props.marginTop,
          marginVertical: props.marginVertical,
          marginBottom: props.marginBottom,
          paddingVertical: props.paddingVertical? props.paddingVertical :17,
          paddingHorizontal: props.paddingHorizontal ? props.paddingHorizontal : 0,
          position: props.position,
        }}
        disabled = {props.disabled}
        onPress={props.onPress}
      >
        <View style={{flexDirection:'row',}}>
          <Text adjustsFontSizeToFit style={{ fontSize: props.fontSize ? props.fontSize : 16, color: props.textColor, fontFamily: Roboto.Bold }}>
            { Boolean(props.text) && (!props.lowerCase ? props.text.toUpperCase():props.text) }
          </Text>
          {!props.isSpinner  && props.confirmation &&
            <View style={{left:25}}>
              <ActivityIndicator size="small" color={'gray'} />
            </View>
          }
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Button;

const styles = StyleSheet.create({
  globalStylesButton: {
    alignItems: "center",
    justifyContent:'center',
    padding: 10,
  },
});