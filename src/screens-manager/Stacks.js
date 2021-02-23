import React, { useState, useEffect, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'


import { styles, colors } from '../styles'
import ManagerStaff from './ManagerStaff'
import ManagerMap from './ManagerMap'

const Stack = createStackNavigator()


function StaffStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerTitleAlign: 'center', }}
    >
      <Stack.Screen
        name="Staff-Dashboard"
        component={ManagerStaff}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
        }}
      />

    </Stack.Navigator>
  )
}

function MapCheckinStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerTitleAlign: 'center', }}
    >
      <Stack.Screen
        name="Lộ trình di chuyển"
        component={ManagerMap}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
        }}
      />

    </Stack.Navigator>
  )
}

export {
  StaffStack,
  MapCheckinStack
}