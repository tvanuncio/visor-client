import { Platform } from 'react-native'
export const Roboto = {
  Regular: Platform.OS === 'android' ? 'Roboto-Regular' : 'Roboto-Regular',
  Italic: Platform.OS === 'android' ? 'Roboto-Italic' : 'Roboto-Italic',
  Thin: Platform.OS === 'android' ? 'Roboto-Thin' : 'Roboto-Thin',
  ThinItalic: Platform.OS === 'android' ? 'Roboto-ThinItalic' : 'Roboto-ThinItalic',
  Light: Platform.OS === 'android' ? 'Roboto-Light' : 'Roboto-Light',
  LightItalic: Platform.OS === 'android' ? 'Roboto-Italic' : 'Roboto-LightItalic',
  Medium: Platform.OS === 'android' ? 'Roboto-Medium' : 'Roboto-Medium',
  MediumItalic: Platform.OS === 'android' ? 'Roboto-MediumItalic' : 'Roboto-MediumItalic',
  Bold: Platform.OS === 'android' ? 'Roboto-Bold' : 'Roboto-Bold',
  BoldItalic: Platform.OS === 'android' ? 'Roboto-BoldItalic' : 'Roboto-BoldItalic',
  Black: Platform.OS === 'android' ? 'Roboto-Black' : 'Roboto-Black',
  BlackItalic: Platform.OS === 'android' ? 'Roboto-BlackItalic' : 'Roboto-BlackItalic'
}