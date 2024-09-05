import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDataType } from '../types/GlobalTypes';

const TERMS = 'TERMS';
const USER_DATA = 'USER_DATA';
const KEEP_SESION = 'KEEP_SESION';
const ACCOUNT_CREATED = 'ACCOUNT_CREATED';

type CacheType = {

  setUserData: (param : UserDataType) => Promise<void>,
  getUserData: () => Promise<UserDataType>,

  setTerms: (param :boolean) => void,
  getTerms: () => Promise<boolean>,

  setKeepSesion : (param:boolean) => void,
  getKeepSesion : () => Promise<boolean>,

  setAccountCreated: (param :boolean) => Promise<void>,
  getAccountCreated: () => Promise<boolean>,

  removeTerms: () => void,
  removeKeepSesion : () => void,
  removeAll : ( value? : any) =>void,
};

const CacheUtil: CacheType = {

  setUserData: (userData: UserDataType) => {
    let dataStr = JSON.stringify(userData)
    
    return AsyncStorage.setItem(USER_DATA, dataStr);
  },

  getUserData: async (): Promise<UserDataType> => {
    const dataStr : string | null = await AsyncStorage.getItem(USER_DATA);
    const userData : UserDataType = JSON.parse(dataStr ? dataStr : "{}");
    return userData;
  },

  setTerms: (terms: boolean) => {
    return AsyncStorage.setItem(TERMS, terms.toString());
  },

  getTerms: async (): Promise<boolean> => {
    let value = await AsyncStorage.getItem(TERMS);
    return value === "true"
  },

  setAccountCreated: (terms: boolean) : Promise<void> => {
    console.log("estoy en setAccountCreated :. " + terms.toString())
    return AsyncStorage.setItem(ACCOUNT_CREATED, terms.toString());
  },

  getAccountCreated: async (): Promise<boolean> => {
    let value = await AsyncStorage.getItem(ACCOUNT_CREATED);
    return value === "true"
  },

  setKeepSesion: (sesion: boolean) => {
    return AsyncStorage.setItem(KEEP_SESION, sesion.toString());
  },

  getKeepSesion: async (): Promise<boolean> => {
    let value = await AsyncStorage.getItem(KEEP_SESION);
    return value === "true"
  },

  removeTerms: () => {
    return AsyncStorage.removeItem(TERMS);
  },

  removeKeepSesion : () => {
    return AsyncStorage.removeItem(KEEP_SESION);
  },

  removeAll: (callback?: any) => {
    let keys = [ USER_DATA];
    return AsyncStorage.multiRemove(keys, callback);
  },

};

export default CacheUtil;