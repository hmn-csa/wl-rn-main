import React, { useState, useEffect } from 'react';
import { 
  Text, View, StyleSheet, 
  TextInput, Alert, ActivityIndicator
} from 'react-native'
import { Button } from 'react-native-paper';
import { useForm, Controller, FormProvider } from 'react-hook-form'
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import { connect } from "react-redux";
import { actloginUser, actLocationSet } from "../actions/index"
import { styles, BACKGROUND_LOGIN, colors } from '../styles'
import * as Updates from 'expo-updates';



function Login(props) {

  

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

  const { register, setValue, handleSubmit, control } = useForm();

  const onSubmit = async(data) => {
    // console.log(data)

    data = {...data, 
      lat: props.token.lat, 
      lon: props.token.lon,
      device_brand: Device.brand,
      device_os: Device.osName,
      device_name: Device.modelName,
    }
    console.log(data)
    if (data.username == null || data.password == null)
    Alert.alert('username, password không được để trống')
    else if  (data.lat == null || data.lon == null) {
      getLocation()
    }
    else {
      await props.login(data)
      if (props.token.token === undefined) 
        Alert.alert('username hoặc password không đúng')
    }
  };


  if (props.token.fetching)
    return (
      <View style={[styles.container, {alignItems: 'center'}]}>
        <Text>Loading ... </Text>
        <ActivityIndicator size={100} color={colors.primary}/> 
      </View>
    )
  if (props.data.fetching)
    return (
      <View style={[styles.container, {alignItems: 'center'}]}>
        <Text>Loading data... </Text>
        <ActivityIndicator size={100} color={colors.primary}/> 
      </View>
    )
  return (
    <View style={[styles.container, 
      {alignItems: 'center', backgroundColor: BACKGROUND_LOGIN}]}>

      <Text style={styles.sologan}>HMN APP</Text>
      <View style={styles.inputView} >
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              placeholder="User..." 
              style={styles.inputText}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="username"
        />
      </View>
      
      <View style={styles.inputView} >
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              secureTextEntry
              placeholder="Password..." 
              style={styles.inputText}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="password"
        />
      </View>
      
      
        <Button
          style={styles.loginBtn}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
        Đăng nhập
        </Button>
        
      
    </View>
  );
};


const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (config) => {
      dispatch(actloginUser(config))
    }, 
    locationSet: (content) => {
      dispatch(actLocationSet(content))
    }, 
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Login);

