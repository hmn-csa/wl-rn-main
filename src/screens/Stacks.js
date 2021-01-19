import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text, StyleSheet } from 'react-native'
import { Remark, Vsf, Skip } from '../components'
import { Button } from 'react-native-paper';
import Tree from './Tree'
import ProductCategories from './ProductCategories'
import ScoreCategories from './ScoreCategories'
import ListAppls from './ListAppls'
import Dashboard from './Dashboard'
import User from './User'
import ListPayment from './ListPayment'
import applMap from './applMap'
import CheckinMap from './CheckinMap'
import { MaterialIcons } from '@expo/vector-icons';
import ListUptrail from './ListUptrail'
import { colors } from '../styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';
const Stack = createStackNavigator()



function UserStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, }}
    >
      <Stack.Screen
        name="User"
        component={User}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />

      <Stack.Screen
        name="ListPayment"
        component={ListPayment}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="checkinMap"
        component={CheckinMap}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />


    </Stack.Navigator>
  )
}

function DashboardStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="ListPayment"
        component={ListPayment}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />

      <Stack.Screen
        name="checkinMap"
        component={CheckinMap}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />

      <Stack.Screen
        name="Uptrail"
        component={ListUptrail}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Stack.Navigator>
  )
}


function TreeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Tree"
      screenOptions={{ headerShown: true, headerTransparent: false }}
    >
      <Stack.Screen
        name="Tree Follow"
        component={Tree}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Stack.Navigator>
  )
}
function ProductStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Tree"
      screenOptions={{ headerShown: true, headerTransparent: false }}
    >
      <Stack.Screen
        name="Product"
        component={ProductCategories}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Stack.Navigator>
  )
}
function SegmentStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Tree"
      screenOptions={{ headerShown: true, headerTransparent: false }}
    >
      <Stack.Screen
        name="Score"
        component={ScoreCategories}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Stack.Navigator>
  )
}

function PortStack(props) {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="List"
        component={ListAppls}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="Uptrail"
        component={ListUptrail}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />

      <Stack.Screen
        name="Remark"
        component={Remark}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="Vsf"
        component={Vsf}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="Skip"
        component={Skip}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="Maps"
        component={applMap}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Stack.Navigator>

  );
}

function CategorieStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Tree"
      screenOptions={{ headerShown: true, headerTransparent: false }}
    >
      <Stack.Screen
        name="Tree Follow"
        component={Tree}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductCategories}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />

      <Stack.Screen
        name="Score"
        component={ScoreCategories}
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
          headerLeft: () => (
            <View style={{ paddingLeft: 15 }}>
              <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())} >
                <MaterialIcons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Stack.Navigator>
  )
}


const buttonStyles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
  },
  button: {
    fontSize: 14,
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    height: '100%',
    backgroundColor: 'green'
  },
  nameTxt: {
    marginLeft: 5,
    fontWeight: '600',
    color: '#222',
    fontSize: 13,
    width: 190,
  },

});


export {
  DashboardStack,
  TreeStack,
  ProductStack,
  SegmentStack,
  PortStack,
  UserStack,
  CategorieStack
}