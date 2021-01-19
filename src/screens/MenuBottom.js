import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../styles'
import { CategorieStack, PortStack, DashboardStack, UserStack } from './Stacks'

const Tab = createBottomTabNavigator();

const MenuBottom = () => {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Dashboard') {
              iconName = focused ? 'ios-stats' : 'ios-stats';
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
        activeTintColor: colors.danger, //'tomato',
        style: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          hadowColor: 'transparent',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
          paddingBottom: 10,
          paddingtop: 20
        }
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Categories" component={CategorieStack} />
      <Tab.Screen name="Portfolio" component={PortStack} />
      <Tab.Screen name="User" component={UserStack} />
    </Tab.Navigator>
  );
}

export default MenuBottom;