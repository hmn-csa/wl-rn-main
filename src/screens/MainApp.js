import React, { useState, useEffect } from 'react'
import { enableScreens } from 'react-native-screens'
//import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import { createDrawerNavigator } from '@react-navigation/drawer'
import { TransitionSpecs } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Location from 'expo-location'
import * as Device from 'expo-device'
import { connect } from "react-redux"
import axios from "axios"
// import ListPayment from './ListPayment'
// import User from './User'
// import Test2 from './test2'
// import Test from './test'
// // import Maps from './Maps'
// import CheckinMap from './CheckinMap2'
import { actLocationSet,  actGetUptrails, actSetActiveStaff } from "../actions"
import * as constAction from '../consts'
import{ styles, colors } from '../styles'
import {CategorieStack, PortStack, DashboardStack, UserStack} from './Stacks'

enableScreens()


const Tab = createBottomTabNavigator();
function MainApp (props) {

  const getLocation = async() => {
    let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        alert('Vui lòng bật định vị và cấp quyền để tiếp tục');
      }
      let locationC = await Location.getCurrentPositionAsync({});
      props.locationSet(locationC.coords)
  }
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        Alert.alert('Vui lòng bật định vị và cấp quyền để tiếp tục');
      }
      let locationC = await Location.getCurrentPositionAsync({});
      props.locationSet(locationC.coords)
    })();
  }, []);

  const [oldlat, setOldlat] = useState(props.token.lat)
  const [oldlon, setOldlon] = useState(props.token.lon)

  const upLocation = async() => {
    if (props.token.token) {

      setOldlat(props.token.lat)
      setOldlon(props.token.lon)
      await getLocation()
      //if (props.token.lat !== oldlat || props.token.lon !== oldlon) {
      let data = { 
        lat: props.token.lat, 
        lon: props.token.lon,
        device_brand: Device.brand,
        device_os: Device.osName,
        device_name: Device.modelName,
      }
      try {
        let config = {
          method: 'post',
          url: `${constAction.WORKLIST_API}/checkin`,
          headers: { 
            'Authorization': `Bearer ${props.token.token.access}`
          },
          data : data
        }
        const response =  await axios(config);
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      upLocation()
    }, 1 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (props.uptrails.justFetching === false) {
      props.setActiveStaff(
        { 
          staff_id:props.token.token.staff_id, 
          info: {
            fc_name: props.token.token.fc_name
          }
        }
      )
      
      props.getUptrails(
        {
          staff_id: props.token.token.staff_id, 
          token: props.token.token.access, 
          start: "", 
          end: "" 
        }
      )

      props.getCheckins(
        {
          staff_id: props.token.token.staff_id, 
          token: props.token.token.access, 
          date: "", 
        }
      )
    }
  }, []);

  return (
   
    <NavigationContainer style={styles.container}>
      
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
            // else if (route.name === 'History') {
            //   iconName = focused ? 'ios-checkbox-outline' : 'ios-checkbox-outline';
            // }
            // You can return any component that you like here! <ion-icon name="folder-open-outline"></ion-icon>
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })
        }
        tabBarOptions={{
          activeTintColor: colors.secondary, //'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Dashboard" component={DashboardStack} />
        <Tab.Screen name="Categories" component={CategorieStack} />
        <Tab.Screen name="Portfolio" component={PortStack} />
        <Tab.Screen name="User" component={ UserStack } />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    uptrails: state.uptrails,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    locationSet: (content) => {
      
      dispatch(actLocationSet(content))
    }, 
    setActiveStaff: (content) => {
      dispatch(actSetActiveStaff(content))
    },
    getUptrails: (config) => {
      dispatch(actGetUptrails(config))
    },

    getCheckins: (config) => {
      dispatch(
        {
          type: constAction.API_GETCHECKIN_REQUEST,
          config
        }
      )
    },
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MainApp);



// export default MainApp;