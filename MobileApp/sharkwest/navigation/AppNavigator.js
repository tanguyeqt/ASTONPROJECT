import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import MainTabNavigator from './MainTabNavigator';
import RegisterScreen from '../screens/RegisterScreen';
const AuthStack = createStackNavigator({ SignIn: SignInScreen },{ headerMode: 'screen' });


export default createAppContainer(createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // Main: MainTabNavigator,
    Home: HomeScreen,
    Register: RegisterScreen,
    AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Home',
  }
));