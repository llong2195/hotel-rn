import React from 'react';

import {View} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import LoginScreen from '../screens/AuthStack/LoginScreen/LoginScreen';
import OTPScreen from '../screens/AuthStack/OTPScreen/OTPScreen';
import ResetPasswordScreen from '../screens/AuthStack/ResetPasswordScreen/ResetPasswordScreen';
import SigninScreen from '../screens/AuthStack/SigninScreen/SigninScreen';
import {DetailsScreen} from '../screens/ExampleScreen/HomeScreen';
import HomeScreen from '../screens/MainStack/HomeScreen/HomeScreen';
import InfomationScreen from '../screens/MainStack/InfomationScreen/InfomationScreen';
import ListPostScreen from '../screens/MainStack/ListPostScreen/ListPostScreen';
import PostDetailScreen from '../screens/MainStack/PostDetailScreen/PostDetailScreen';
import MyPostManageScreen from '../screens/MainStack/PostedManagedScreen/MyPostManageScreen';
import PostedManagedScreen from '../screens/MainStack/PostedManagedScreen/PostedManageScreen';
import PostFormScreen from '../screens/MainStack/PostFormScreen/PostFormScreen';
import ProfileScreen from '../screens/MainStack/ProfileScreen/ProfileScreen';
import SearchAdvanceScreen from '../screens/MainStack/SearchScreen/SearchAdvance';
import SearchScreen from '../screens/MainStack/SearchScreen/SearchScreen';
import SettingsScreen from '../screens/MainStack/SettingScreen/SettingsScreen';
import UserDetailScreen from '../screens/MainStack/UserManagedScreen/UserDetailScreen';
import UserManagedScreen from '../screens/MainStack/UserManagedScreen/UserManagedScreen';
import {MainTabScreen} from './MainTabScreen';
import {routes} from './Routes';

export const navigationRef: any = React.createRef();
export const isMountedRef: any = React.createRef();
const AuthenStack = createStackNavigator();

export const AuthenStackScreen = (param: any) => {
  // console.log("AuthenStackScreen", param.route)
  return (
    <AuthenStack.Navigator
      // headerMode="none"
      screenOptions={{
        // headerMode: "screen",
        headerShown: false,
      }}
      initialRouteName={routes.LOGIN_SCREEN}
    >
      {/* <AuthenStack.Screen name={routes.LOGIN} component={LoginScreen} /> */}
      <AuthenStack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
      <AuthenStack.Screen name={routes.OTP_SCREEN} component={OTPScreen} />
      <AuthenStack.Screen
        name={routes.SIGNIN_SCREEN}
        component={SigninScreen}
      />
      <AuthenStack.Screen
        name={routes.RESET_PASSWORD_SCREEN}
        component={ResetPasswordScreen}
      />
    </AuthenStack.Navigator>
  );
};

const StartupStack = createStackNavigator();
export const StartupStackScreen = (param: any) => {
  return (
    <StartupStack.Navigator
      // headerMode="none"
      initialRouteName={routes.HOME_TAB}
      screenOptions={{
        // headerMode: "screen",
        headerShown: false,
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <StartupStack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
      {/* <StartupStack.Screen name={routes.DETAILS_SCREEN} component={DetailsScreen} /> */}
      <StartupStack.Screen
        name={routes.SETTINGS_SCREEN}
        component={SettingsScreen}
      />
      <StartupStack.Screen
        name={routes.PROFILE_SCREEN}
        component={ProfileScreen}
      />
      <StartupStack.Screen name={routes.LOADING} component={DetailsScreen} />
      <StartupStack.Screen name={routes.HOME_TAB} component={MainTabScreen} />
      <StartupStack.Screen
        name={routes.SEARCH_SCREEN}
        component={SearchScreen}
      />
      <StartupStack.Screen
        name={routes.USER_MANAGED_SCREEN}
        component={UserManagedScreen}
      />
      <StartupStack.Screen
        name={routes.POSTED_MANAGED_SCREEN}
        component={PostedManagedScreen}
      />
      <StartupStack.Screen
        name={routes.INFOMATION_SCREEN}
        component={InfomationScreen}
      />
      <StartupStack.Screen
        name={routes.POST_DETAIL_SCREEN}
        component={PostDetailScreen}
      />
      <StartupStack.Screen
        name={routes.SEARCH_ADVANCE_SCREEN}
        component={SearchAdvanceScreen}
      />
      <StartupStack.Screen
        name={routes.LISTS_POST_SCREEN}
        component={ListPostScreen}
      />
      <StartupStack.Screen
        name={routes.POST_FORM_SCREEN}
        component={PostFormScreen}
      />
      <StartupStack.Screen
        name={routes.MY_POST_MANAGE_SCREEN}
        component={MyPostManageScreen}
      />
      <StartupStack.Screen
        name={routes.USER_DETAIL_SCREEN}
        component={UserDetailScreen}
      />
    </StartupStack.Navigator>
  );
};

const RootStack = createDrawerNavigator();
export const DrawerStackScreen = (param: any) => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        overlayColor: '0.7',
        drawerPosition: 'left',
        drawerType: 'front',
      }}
      drawerContent={(props: any) => {
        return <View />;
      }}
    >
      <RootStack.Screen
        name={routes.MAINSTACK}
        component={StartupStackScreen}
        initialParams={param.route.params}
      />
    </RootStack.Navigator>
  );
};
