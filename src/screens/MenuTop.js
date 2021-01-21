import React, { useState, useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../styles'
import { TreeStack, SegmentStack, ProductStack, PortStack, DashboardStack, UserStack } from './Stacks'
import Tree from './Tree'
import ProductCategories from './ProductCategories'
import ScoreCategories from './ScoreCategories'
import ListAppls from './ListAppls'
import Dashboard from './Dashboard'
import User from './User'



const Tab = createMaterialTopTabNavigator();

function Menutop_Categories() {
  return (
    <Tab.Navigator
      initialRouteName="Tree Follow"
      tabBarOptions={{
        activeTintColor: colors.info,
        inactiveTintColor: colors.black,
        labelStyle: { fontSize: 12, fontWeight: 'bold' },
        style: { backgroundColor: 'white' },

      }}
    >
      <Tab.Screen
        name="Tree Follow"
        component={Tree}
        options={{ tabBarLabel: 'Tree Follow' }}
      />
      <Tab.Screen
        name="Type"
        component={ProductCategories}
        options={{ tabBarLabel: 'Type' }}
      />
      <Tab.Screen
        name="Product"
        component={ProductCategories}
        options={{ tabBarLabel: 'Product' }}
      />
      <Tab.Screen
        name="Segment"
        component={ScoreCategories}
        options={{ tabBarLabel: 'Segment' }}
      />
    </Tab.Navigator>
  );
}

export {
  Menutop_Categories
};