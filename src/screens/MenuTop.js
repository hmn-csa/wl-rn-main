import React, { useState, useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../styles'
import Tree from './Tree'
import UserSignout from './userSignout'
import UserInfo from './userInfo'
import ProductCategories from './ProductCategories'
import ScoreCategories from './ScoreCategories'
import ClassifyCategories from './ClassifyCategories'
import ListUptrail from './ListUptrail'
import ListUptrailMonth from './ListUptrailMonth'
import { Contract_com, Customer_com, Payment_com, Follow_com } from '../components/Vsf_detail'

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
        component={ClassifyCategories}
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

function Menutop_Uptrail() {
  return (
    <Tab.Navigator
      initialRouteName="Day"
      tabBarOptions={{
        activeTintColor: colors.info,
        inactiveTintColor: colors.black,
        labelStyle: { fontSize: 12, fontWeight: 'bold' },
        style: { backgroundColor: 'white' },
      }}
      swipeEnabled={false}
    >
      <Tab.Screen
        name="Day"
        component={ListUptrail}
        options={{ tabBarLabel: 'Ngày' }}
      />
      <Tab.Screen
        name="Month"
        component={ListUptrailMonth}
        options={{ tabBarLabel: 'Tháng' }}
      />
    </Tab.Navigator>
  );
}



function Menutop_User() {
  return (
    <Tab.Navigator
      initialRouteName="Type"
      tabBarOptions={{
        activeTintColor: colors.info,
        inactiveTintColor: colors.black,
        labelStyle: { fontSize: 12, fontWeight: 'bold' },
        style: { backgroundColor: 'white' },
      }}
    >
      <Tab.Screen
        name="Info"
        component={UserInfo}
        options={{ tabBarLabel: 'Info' }}
      />
      <Tab.Screen
        name="Type"
        component={UserSignout}
        options={{ tabBarLabel: 'Sign' }}
      />

    </Tab.Navigator>
  );
} function Menutop_Vsf() {
  return (
    <Tab.Navigator
      initialRouteName="Contracts"
      tabBarOptions={{
        activeTintColor: colors.info,
        inactiveTintColor: colors.black,
        labelStyle: { fontSize: 12, fontWeight: 'bold' },
        style: { backgroundColor: 'white' },
      }}
    >
      <Tab.Screen
        name="Contracts"
        component={Contract_com}
        options={{ tabBarLabel: 'Hợp đồng' }}
      />
      <Tab.Screen
        name="Customer"
        component={Customer_com}
        options={{ tabBarLabel: 'Khách hàng' }}
      />
      <Tab.Screen
        name="Payment"
        component={Payment_com}
        options={{ tabBarLabel: 'Thanh toán' }}
      />
      <Tab.Screen
        name="Follow"
        component={Follow_com}
        options={{ tabBarLabel: 'Viếng thăm' }}
      />

    </Tab.Navigator>
  );
}



export {
  Menutop_Categories,
  Menutop_Uptrail,
  Menutop_User,
  Menutop_Vsf
};