import React, { useState, useEffect, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { Remark, Vsf, Skip } from '../components'
import Tree from './Tree'
import ProductCategories from './ProductCategories'
import ScoreCategories from './ScoreCategories'
import ListAppls from './ListAppls'
import Dashboard from './Dashboard'
import User from './User'
import ListPayment from './ListPayment'
import applMap from './applMap'
import CheckinMap from './CheckinMap'
import TodoDash from '../components/TodoDash'
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import ListUptrail from './ListUptrail'
import { styles, colors } from '../styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';
import { Menutop_Categories, Menutop_Dashboard } from './MenuTop'
import { Calendar_ } from './Calendar'
import { Colors } from 'react-native-paper'
import { Menutop_Uptrail } from './MenuTop'

const Stack = createStackNavigator()

function UserStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerTitleAlign: 'center', }}
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
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
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
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
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
  const { register, setValue, handleSubmit, control, errors } = useForm();
  const [hidesearch, Sethidesearch] = useState(false);
  const widthAni = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(widthAni, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Sethidesearch(true)
  };

  const styleAni = {
    transform: [{ scaleY: widthAni }],
    flexDirection: 'row'
  }
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerStyle: {
            backgroundColor: colors.info,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerTitle: 'Dashboard',
          headerRight: () => (
            <View style={{ paddingRight: 20, flexDirection: 'row' }}>
              <TouchableOpacity>
                <MaterialIcons name="chat" size={24} color={colors.white} style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="bell-o" size={24} color={colors.white} />
              </TouchableOpacity>
            </View >
          ),
        }}
      />
      < Stack.Screen
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
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      < Stack.Screen
        name="TodoDash"
        component={TodoDash}
      />
      < Stack.Screen
        name="checkinMap"
        component={CheckinMap}
        options={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.info,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center'
          },
          headerRight: () => (
            <View style={{ paddingRight: 20 }}>
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color={colors.info} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      < Stack.Screen
        name="Uptrail"
        component={Menutop_Uptrail}
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
            backgroundColor: colors.primary,
          },
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerRight: () => (
            <View style={{ paddingRight: 20, flexDirection: 'row' }}>
              {/* <TouchableOpacity style={{ marginRight: 10 }} onPress={() =>
                props.navigation.navigate('Portfolio', {
                  screen: 'Maps'
                })
              } >
                <MaterialIcons name="map" size={30} color="white" />
              </TouchableOpacity> */}
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )
        })
        }
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
          headerTitle: "Visit form",
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

function CategorieStack(props) {
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
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
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
            backgroundColor: colors.primary,
          },
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerRight: () => (
            <View style={{ paddingRight: 20, flexDirection: 'row' }}>
              {/* <TouchableOpacity style={{ marginRight: 10 }} onPress={() =>
                props.navigation.navigate('Portfolio', {
                  screen: 'Maps'
                })
              } >
                <MaterialIcons name="map" size={30} color="white" />
              </TouchableOpacity> */}
              <TouchableOpacity>
                <MaterialIcons name="search" size={30} color="white" />
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
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
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
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
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
        component={Vsf}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitle: "Visit form",
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
  UserStack,
  CategorieStack,
  CalendarStack,
}