import React, { useState, useEffect } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles'
import { CategorieStack, PortStack, DashboardStack, UserStack } from './Stacks'

const Tab = createMaterialBottomTabNavigator();

function MenuBottom() {
  return (
    <Tab.Navigator
      shifting={true}
      activeColor={colors.danger}
      inactiveColor={colors.black}
      barStyle={{ backgroundColor: 'white' }}
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Dashboard') {
              iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
            }
            else if (route.name === 'Portfolio') {
              iconName = focused ? 'view-list' : 'format-list-checkbox';
            }
            else if (route.name === 'User') {
              iconName = focused ? 'account' : 'account-outline';
            }
            else if (route.name === 'Categories') {
              iconName = focused ? 'folder-open' : 'folder-outline';
            }
            //return <FontAwesome name={iconName} size={20} color={color} style={{ fontWeight: 'bold' }} />;
            return <MaterialCommunityIcons name={iconName} size={25} color={color} />
          },
        })
      }
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Categories" component={CategorieStack} />
      <Tab.Screen name="Portfolio" component={PortStack} />
      <Tab.Screen name="User" component={UserStack} />
    </Tab.Navigator>
  );

}

export default MenuBottom;
