import React, { useState, useEffect, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text, StyleSheet, TextInput, Animated, Dimensions, StatusBar, Button } from 'react-native'
import { Remark, Vsf, Skip, Search } from '../components'
import ListAppls from './ListAppls'
import Dashboard from './Dashboard'
import UserSignout from './userSignout'
import ListPayment from './ListPayment'
import applMap from './applMap'
import CheckinMap from './CheckinMap'
import TodoDash from '../components/TodoDash'
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Menutop_Categories, Menutop_Dashboard } from './MenuTop'
import Calendar_ from './Calendar'
import { Menutop_Uptrail, Menutop_User, Menutop_Vsf } from './MenuTop'
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import * as constAction from '../consts'
import { connect } from "react-redux"


const Stack = createStackNavigator()
const DEVICE_WIDTH = Dimensions.get(`window`).width;


function UserStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerTitleAlign: 'center', }}
    >
      <Stack.Screen
        name="User"
        component={UserSignout}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
          // headerRight: () => (
          //   <View style={{ paddingRight: 22 }}>
          //     <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())} >
          //       <MaterialIcons name="menu" size={30} color="white" />
          //     </TouchableOpacity>
          //   </View>
          // ),
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
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
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
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
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
  const [hidesearch, Sethidesearch] = useState(true);
  const navigation = useNavigation();
  const [valueee, Setvalueee] = useState(true);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerTitle: 'Dashboard',
          headerRight: () => (
            <View style={{ paddingRight: 20, flexDirection: 'row' }}>
              <TouchableOpacity>
                <MaterialIcons name="chat" size={20} color={colors.main} style={{ marginRight: 15 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="bell-o" size={20} color={colors.main} />
              </TouchableOpacity>
            </View >
          ),
        }}
      />
      <Stack.Screen
        name="ListPayment"
        component={ListPayment}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
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
        name="TodoDash"
        component={TodoDash}
      />
      <Stack.Screen
        name="checkinMap"
        component={CheckinMap}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color={colors.main} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="Uptrail"
        component={Menutop_Uptrail}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
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
        name="Portfolio"
        component={ListAppls}
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTitleAlign: 'center',
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerRight: () => (
            hidesearch === true ?
              <View style={{ paddingRight: 20, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { Setvalueee(''), Sethidesearch(false) }} style={{ marginHorizontal: 10 }}>
                  <FontAwesome name="search" size={20} color={colors.main} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginRight: 10, marginLeft: 10 }}
                  onPress={() => props.navigation.navigate('Maps')} >
                  <MaterialIcons name="map" size={25} color={colors.main}
                    style={{ borderRadius: 20 }} />
                </TouchableOpacity>
              </View>
              :
              <View style={{ paddingRight: 20, flexDirection: 'row', alignItems: 'center' }}>
                <SearchBar
                  placeholder="Tìm kiếm..."
                  style={{ height: 20, backgroundColor: 'white' }}
                  onChangeText={(search) => {
                    Setvalueee(search),
                      props.sendSearch(search)
                  }}
                  searchIcon={<TouchableOpacity onPress={() => { Sethidesearch(true), Setvalueee('') }}><FontAwesome5 name="arrow-left" size={20} color="grey" /></TouchableOpacity>}
                  value={valueee}
                  showCancel={true}
                  lightTheme={true}
                  leftIconContainerStyle={{ width: 50 }}
                  // platform='android'
                  cancelIcon={<TouchableOpacity onPress={() => { Sethidesearch(true), Setvalueee('') }}><FontAwesome5 name="arrow-left" size={20} color="grey" /></TouchableOpacity>}
                  containerStyle={{ backgroundColor: 'white' }}
                  inputContainerStyle={{ backgroundColor: 'white', width: DEVICE_WIDTH - 50, height: 30, right: 0 }}
                  onCancel={() => { Sethidesearch(true), Setvalueee('') }}
                  onSubmitEditing={() => {
                    Sethidesearch(true),
                      props.sendSearch({ valueee }.valueee)
                  }}
                />
                <TouchableOpacity
                  style={{}}
                  onPress={() => props.navigation.navigate('Maps')} >
                  <MaterialIcons name="map" size={25} color={colors.main}
                    style={{ borderRadius: 20 }} />
                </TouchableOpacity>
              </View>
          ),
        })
        }
      />
      <Stack.Screen
        name="Remark"
        component={Remark}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
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
        component={Menutop_Vsf}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitle: "Visit form",
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },

        }}
      />
      <Stack.Screen
        name="Skip"
        component={Skip}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
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
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        })}
      />

      <Stack.Screen
        name="Search-appl"
        component={Search}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Stack.Navigator >
  )
}


function CalendarStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{ headerShown: true, headerTransparent: false, headerTitleAlign: 'center', }}
    >
      <Stack.Screen
        name="Calendar"
        component={Calendar_}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
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

function CategorieStack(props) {
  const [hidesearch, Sethidesearch] = useState(true);
  const navigation = useNavigation();
  const [valueee, Setvalueee] = useState(true);
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{ headerShown: true, headerTransparent: false, headerTitleAlign: 'center', }}
    >
      <Stack.Screen
        name='Categories'
        component={Menutop_Categories}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      >
      </Stack.Screen>
      <Stack.Screen
        name="Portfolio"
        component={ListAppls}
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTitleAlign: 'center',
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerRight: () => (
            hidesearch === true ?
              <View style={{ paddingRight: 20, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { Setvalueee(''), Sethidesearch(false) }} style={{ marginHorizontal: 10 }}>
                  <FontAwesome name="search" size={20} color={colors.main} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginRight: 10, marginLeft: 10 }}
                  onPress={() => props.navigation.navigate('Maps')} >
                  <MaterialIcons name="map" size={25} color={colors.main}
                    style={{ borderRadius: 20 }} />
                </TouchableOpacity>
              </View>
              :
              <View style={{ paddingRight: 20, flexDirection: 'row', alignItems: 'center' }}>
                <SearchBar
                  placeholder="Tìm kiếm..."
                  style={{ height: 20, backgroundColor: 'white' }}
                  onChangeText={(search) => {
                    Setvalueee(search),
                      props.sendSearch(search)
                  }}
                  searchIcon={<TouchableOpacity onPress={() => { Sethidesearch(true), Setvalueee('') }}><FontAwesome5 name="arrow-left" size={20} color="grey" /></TouchableOpacity>}
                  value={valueee}
                  showCancel={true}
                  lightTheme={true}
                  // platform='android'
                  leftIconContainerStyle={{ width: 50 }}
                  cancelIcon={<TouchableOpacity onPress={() => { Sethidesearch(true), Setvalueee('') }}><FontAwesome5 name="arrow-left" size={20} color="grey" /></TouchableOpacity>}
                  containerStyle={{ backgroundColor: 'white', borderWidth: 0, }}
                  inputContainerStyle={{ backgroundColor: 'white', borderWidth: 0, width: DEVICE_WIDTH - 50, height: 30, right: 0 }}
                  onCancel={() => { Sethidesearch(true), Setvalueee('') }}
                  onSubmitEditing={() => {
                    Sethidesearch(true),
                      props.sendSearch({ valueee }.valueee)
                  }}
                />
                <TouchableOpacity
                  style={{}}
                  onPress={() => props.navigation.navigate('Maps')} >
                  <MaterialIcons name="map" size={25} color={colors.main}
                    style={{ borderRadius: 20 }} />
                </TouchableOpacity>
              </View>
          )
        })
        }
      />
      <Stack.Screen
        name="Uptrail"
        component={Menutop_Uptrail}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
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
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
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
        component={Menutop_Vsf}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitle: "Visit form",
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
        }}
      />
      <Stack.Screen
        name="Skip"
        component={Skip}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
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
            backgroundColor: colors.white,
          },
          headerTintColor: colors.main,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Stack.Navigator >
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    sendSearch: (content) => {
      dispatch({
        type: constAction.SEND_VALUE_SEARCH,
        content
      })
    },
  }
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

const Dashboard_st = connect(null, mapDispatchToProps)(DashboardStack)
const Categorie_st = connect(null, mapDispatchToProps)(CategorieStack)


export {
  Dashboard_st,
  UserStack,
  Categorie_st,
  CalendarStack,
}