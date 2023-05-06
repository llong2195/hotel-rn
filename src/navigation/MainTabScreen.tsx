import React from 'react';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import R from '../components/R';
import HomeScreen from '../screens/MainStack/HomeScreen/HomeScreen';
import PostedManagedScreen from '../screens/MainStack/PostedManagedScreen/PostedManageScreen';
import ProfileScreen from '../screens/MainStack/ProfileScreen/ProfileScreen';
import MenuBarButton from './MenuBarButton';
import {routes} from './Routes';

const MainTab = createBottomTabNavigator();
export const MainTabScreen = () => {
  let insets = useSafeAreaInsets();
  return (
    <MainTab.Navigator
      initialRouteName={routes.HOMETABBAR}
      screenOptions={{
        headerShown: false,
        // activeBackgroundColor: R.colors.mainColor,
        tabBarInactiveBackgroundColor: 'white',
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarLabelPosition: 'below-icon',
        // tabBarLabelStyle: {
        //     marginBottom: 2,
        //     // color: colors.textDesColor,
        //     fontSize: 10
        // },
        // tabStyle:{ backgroundColor: '#A130F8' },
        tabBarStyle: {
          bottom: 0,
          height: R.TABBAR_HEIGHT + insets.bottom,
          backgroundColor: 'white',
        },
      }}
    >
      <MainTab.Screen
        name={routes.HOMETABBAR}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <MenuBarButton
                focused={focused}
                type={0}
                bottom={insets.bottom}
              />
            );
          },
        }}
        component={HomeScreen}
      />
      <MainTab.Screen
        name={routes.POSTED_MANAGED_SCREEN}
        options={{
          tabBarLabel: 'Manage',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <MenuBarButton
                focused={focused}
                type={1}
                bottom={insets.bottom}
              />
            );
          },
        }}
        component={PostedManagedScreen}
      />
      <MainTab.Screen
        name={routes.PROFILE_SCREEN}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <MenuBarButton
                focused={focused}
                type={2}
                bottom={insets.bottom}
              />
            );
          },
        }}
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
