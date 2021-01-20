import React, { useState, useEffect } from 'react'
import { enableScreens } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Location from 'expo-location'
import * as Device from 'expo-device'
import { connect } from "react-redux"
import axios from "axios"
import { actLocationSet, actGetUptrails, actSetActiveStaff } from "../actions"
import * as constAction from '../consts'
import { colors } from '../styles'
import DrawerNavigator from './DrawerNavigator'

enableScreens()



function MainApp(props) {

  const getLocation = async () => {
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

  const upLocation = async () => {
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
          data: data
        }
        const response = await axios(config);
        //console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     upLocation()
  //   }, 1 * 60 * 1000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <NavigationContainer>
      <DrawerNavigator />
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
