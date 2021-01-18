import React, { useRef } from 'react'
import { enableScreens } from 'react-native-screens'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';

import{ styles, colors } from '../styles'

import ManagerDash from './ManagerDash'
import ManagerStaff from './ManagerStaff'
import ManagerMap from './ManagerMap'

enableScreens()

const Tab = createBottomTabNavigator();
function MagagerApp () {


  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator
        screenOptions={
          ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'ManagerStaff') {
              iconName = focused ? 'ios-stats' : 'ios-stats';
            } else if (route.name === 'ManagerMap') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'Portfolio') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'User') {
              iconName = focused ? 'ios-person' : 'ios-person';
            } else if (route.name === 'Categories') {
              iconName = focused ? 'ios-folder' : 'ios-folder';
            } 
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })
        }
        tabBarOptions={{
          activeTintColor: colors.secondary, 
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="ManagerDash" component={ManagerDash} />
        <Tab.Screen name="ManagerStaff" component={ManagerStaff} />
        <Tab.Screen name="ManagerMap" component={ManagerMap} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}





export default MagagerApp;