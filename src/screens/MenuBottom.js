import React, { useState, useEffect } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../styles'
import { CategorieStack, PortStack, DashboardStack, UserStack } from './Stacks'
import ListAppls from './ListAppls'
import Dashboard from './Dashboard'
import User from './User'
import { Menutop_Categories } from './MenuTop'

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
            if (route.name === 'Dashboard')
              iconName = 'bar-chart';
            else if (route.name === 'Portfolio')
              iconName = 'list';
            else if (route.name === 'User')
              iconName = 'user';
            else if (route.name === 'Categories')
              iconName = 'folder-open';
            return <FontAwesome name={iconName} size={25} color={color} style={{ fontWeight: 'bold' }} />;
          },
        })
      }
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Categories" component={Menutop_Categories} />
      <Tab.Screen name="Portfolio" component={PortStack} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
}

export default MenuBottom;