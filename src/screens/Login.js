import React, { useState, useEffect } from 'react';
import {
  Text, View, KeyboardAvoidingView,
  TextInput, Button, AsyncStorage,
  ImageBackground, Image,
} from 'react-native'
// import CheckBox from '@react-native-community/checkbox';
import { useForm, Controller } from 'react-hook-form'
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import { connect } from "react-redux";
import { actloginUser, actLocationSet } from "../actions/index"
import { styles, colors } from '../styles'
import { Ionicons } from '@expo/vector-icons';
import Loader from '../components/elements/Loader'



function Login(props) {
  //============ Get IP user
  const [ip, setIP] = React.useState(null);
  // const getIP = async () => {
  //   fetch('https://api.ipify.org?format=json')
  //     .then(response => response.json())
  //     .then(data => setIP(data.ip))
  //     .catch(error => console.log(error));
  // }
  //=============================
  //============ Get Long Lat
  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Vui lòng bật định vị và cấp quyền để tiếp tục');
    }
    let locationC = await Location.getCurrentPositionAsync({});
    props.locationSet(locationC.coords)
  }

  const getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      if (data !== null) {
        setValue("username", data.username)
        setValue("password", data.password)
      }
    } catch (error) {
      alert(error);
    }
  }

  //=========================
  //======= Run fisrt times after load page
  useEffect(() => {
    getLocation();
    //getIP();
    getToken();
  }, []);

  // useEffect(() => {
  //   if (!props.token.fetching && props.token.token === undefined)
  //     Alert.alert('username hoặc password không đúng')
  //   else if (props.token.token) {
  //     // if ({ isSelected }.isSelected == true)

  //     // else removeToken('userData')
  //   }
  // }, [props.token.fetching]);

  //==========================
  //======== Submit login
  // const [isSelected, setSelection] = useState(false);
  const { register, setValue, handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => {
    data = {
      ...data,
      lat: props.token.lat,
      lon: props.token.lon,
      device_brand: Device.brand,
      device_os: Device.osName,
      device_name: Device.modelName,
    }
    if (data.lat === null || data.lon === null)
      getLocation()
    else {
      props.login(data)
      storeToken(data)
    }
  };

  const storeToken = async (data) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      alert("Something went wrong", error);
    }
  }
  
  const removeToken = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch (exception) {
      return false;
    }
  }
  if (props.token.fetching)
    return <Loader />

  if (props.data.fetching)
    return <Loader />

  return (

    <ImageBackground source={require('../images/bg-login.jpg')} style={styles.bglogin}>
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1 }}
        keyboardVerticalOffset={180}
      >
        <View style={styles.container}>
          <View></View>
          <View style={styles.boxlogin}>
            <Image source={require('../images/logo-LGM.png')} style={styles.logologin}></Image>
            {props.token.error ? <Text style={styles.alertlogin}>{props.token.error}</Text> : null}
            <View style={styles.inputView} >
              <View style={styles.iconinput} >
                <Ionicons name="md-person" size={20} color="white" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
              </View>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    placeholder="Tài khoản"
                    style={styles.inputTextBlack}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name="username"
                rules={{ required: true }}
                defaultValue=""
              />
            </View>
            {errors.username && <Text style={styles.alertlogin}>Tài khoản không được để trống</Text>}
            <View style={styles.inputView} >
              <View style={styles.iconinput} >
                <Ionicons name="ios-key" size={20} color="white" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
              </View>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Mật khẩu"
                    style={styles.inputTextBlack}
                    onBlur={onBlur}
                    onChangeText={(value) => { onChange(value) }}
                    value={value}
                  />
                )}
                name="password"
                rules={{ required: true }}
                defaultValue=""
              />
            </View>
            {errors.password && <Text style={styles.alertlogin}>Mật khẩu không được để trống</Text>}
            <View style={styles.loginBtn}>
              <Button
                onPress={handleSubmit(onSubmit)}
                title="ĐĂNG NHẬP"
                color={colors.info}
              >
              </Button>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              {/* <View style={{ flexDirection: 'row', marginLeft: '5%' }}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
                <Text style={{ marginTop: 8, fontSize: 12 }}>Lưu mật khẩu</Text>
              </View> */}
              <Text style={{ marginBottom: 8, fontSize: 12, marginRight: '5%' }}>Quên mật khẩu ?</Text>
            </View>
          </View>
          <View style={styles.boxinfodevice}>
            <Text style={{ fontSize: 9, color: colors.dark, marginLeft: '5%', opacity: 0.7 }}>
              model: {Device.brand}{"\n"}
          position: {props.token.lat},{props.token.lon}{"\n"}
          ip: {ip}
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
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

