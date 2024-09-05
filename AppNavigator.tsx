import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/splash/SplashScreen';
import LoginScreen from './screens/login/LoginScreen';
import TermsConditionsScreen from './screens/profile/TermsConditionsScreen';
import PolicyPrivacyScreen from './screens/profile/PolicyPrivacyScreen';
import MainScreen from './screens/main/MainScreen';
import CreateAccountScreen from './screens/createAccount/CreateAcountScreen';
import VerMasScreen from './screens/profile/VerMasScreen';
import FrequentAsksScreen from './screens/profile/FrequentAsksScreen';
import GalleryScreen from './screens/profile/GalleryScreen';


export type RootStackParamList = {
  LoginFlow: undefined;
  MainFlow: undefined; 
}

export type LoginStackParamList = {
  Splash: undefined;
  Login: undefined;
  createdAccount: undefined;
  TermsConditions: undefined;
  Privacy: undefined;
};

export type MainStackParamList = {
  Main: undefined;
  TermsConditions: undefined;
  Privacy: undefined;
  VerMas: undefined;
  FrequentAsks: undefined;
  Gallery: undefined;
};

const StackLogin = createNativeStackNavigator<LoginStackParamList>();
const StackMain = createNativeStackNavigator<MainStackParamList>();
const StackRoot = createNativeStackNavigator<RootStackParamList>();

const MainFlow = () => {
  return (
    <StackMain.Navigator initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackMain.Screen name="Main" component={MainScreen} />
      <StackMain.Screen name="TermsConditions" component={TermsConditionsScreen} />
      <StackMain.Screen name="Privacy" component={PolicyPrivacyScreen} />
      <StackMain.Screen name="VerMas" component={VerMasScreen} />
      <StackMain.Screen name="FrequentAsks" component={FrequentAsksScreen} />
      <StackMain.Screen name="Gallery" component={GalleryScreen} />
      
    </StackMain.Navigator>
  );
};

const LoginFlow = () => {
  return (
    <StackLogin.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackLogin.Screen name="Splash" component={SplashScreen} />
      <StackLogin.Screen name="Login" component={LoginScreen} />
      <StackLogin.Screen name="TermsConditions" component={TermsConditionsScreen} />
      <StackLogin.Screen name="Privacy" component={PolicyPrivacyScreen} />
      <StackLogin.Screen name="createdAccount" component={CreateAccountScreen} />
    </StackLogin.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackRoot.Navigator
        initialRouteName="LoginFlow"
        screenOptions={{
          headerShown: false,
        }}
      >
        <StackRoot.Screen name="LoginFlow" component={LoginFlow} />
        <StackRoot.Screen name="MainFlow" component={MainFlow} />
      </StackRoot.Navigator>
    </NavigationContainer>
  );
};


export default AppNavigator;
