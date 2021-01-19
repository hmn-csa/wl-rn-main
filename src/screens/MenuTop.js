import React, { useState, useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../styles'
import { TreeStack, SegmentStack, ProductStack, PortStack, DashboardStack, UserStack } from './Stacks'
const Tab = createMaterialTopTabNavigator();

function Menutop_Categories() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tree Follow" component={TreeStack} />
      <Tab.Screen name="Type" component={PortStack} />
      <Tab.Screen name="Product" component={ProductStack} />
      <Tab.Screen name="Segment" component={SegmentStack} />
    </Tab.Navigator>
  );
}

export {
  Menutop_Categories
};