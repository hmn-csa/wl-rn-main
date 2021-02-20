import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  AsyncStorage,
  ImageBackground,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Device from "expo-device";
import { connect } from "react-redux";
import { styles, colors } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../components/elements/Loader";
import { Button } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

import * as constAction from '../consts'

async function savekeychain(key, value) {
  // save pw
  console.log("key", key);
  console.log("value", value);
  await SecureStore.setItemAsync(key, value);

  let result = await SecureStore.getItemAsync(key);
  console.log("luu data keychain", result);
}

async function getValueFor(key) {

  let result = await SecureStore.getItemAsync(key);
  if (!result) {
    //alert("🔐 Here's your value 🔐 \n" + result);
    return result;
  } else {
    alert("No values stored under that key.");
    return null
  } c
}

function Login(props) {
  //============ Get IP user

  // const getIP = async () => {
  //   fetch('https://api.ipify.org?format=json')
  //     .then(response => response.json())
  //     .then(data => setIP(data.ip))
  //     .catch(error => console.log(error));
  // }
  //=============================

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fetching, setFetching] = useState(false)

  const checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    if (compatible) {
      console.log("Compatible Device!");
    } else console.log("Current device does not have the necessary hardware!");
  };

  const checkForBiometrics = async () => {
    let biometricRecords = await LocalAuthentication.isEnrolledAsync();
    if (!biometricRecords) {
      console.log("No Biometrics Found");
    } else {
      console.log("Biometrics Found");
    }
  };


  const handleAuthentication = async () => {
    let result = await LocalAuthentication.authenticateAsync();

    if (result.success) {
      setFetching(true)
      let username = await SecureStore.getItemAsync("username");
      let password = await SecureStore.getItemAsync("password");

      if (!username || !password) {
        alert("Chưa lưu mật khẩu! Vui lòng nhập tài khoản và mật khẩu !");
        setFetching(false)
        return null
      }

      let data = {
        username: username,
        password: password,
        lat: props.token.lat,
        lon: props.token.lat,
        device_brand: Device.brand,
        device_os: Device.osName,
        device_name: Device.modelName,
      }

      if (!data.lat) {
        let coords = await getLocation();
        data = {
          ...data,
          lat: coords.latitude,
          lon: coords.longitude,
        }
      }
      props.login(data);
      setFetching(false)

    } else {
      alert("Xác thưc không thành công");
    }
  };

  //============ Get Long Lat
  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Vui lòng bật định vị và cấp quyền để tiếp tục");
    }
    let locationC = await Location.getCurrentPositionAsync({});
    props.locationSet(locationC.coords);

    return locationC.coords
  };

  const getToken = async () => {
    try {
      let username = await SecureStore.getItemAsync("username")
      let password = await SecureStore.getItemAsync("password")

      if (username) setUsername(username)
      if (password) setPassword(password)

      //console.log(username, password)
    } catch (error) {
      alert(error);
    }
  };

  //======= Run fisrt times after load page
  useEffect(() => {
    getLocation();
    //getToken();
  }, []);

  const onSubmit = async () => {

    setFetching(true)
    let data = {
      username: username,
      password: password,
      lat: props.token.lat,
      lon: props.token.lon,
      device_brand: Device.brand,
      device_os: Device.osName,
      device_name: Device.modelName,
    };

    if (!data.lat) {
      let coords = await getLocation();
      data = {
        ...data,
        lat: coords.latitude,
        lon: coords.longitude,
      }
    }
    props.login(data);
    //savekeychain("username", data.username);
    //savekeychain("password", data.password);
    setFetching(false)
  };


  const renWarning = (value, content) => {
    if (!value && props.token.error)
      return (
        <Text style={styles.alertlogin}>
          {content}
        </Text>
      )
  }

  if (props.data.fetching || fetching) return <Loader />;

  return (
    <ImageBackground
      source={require("../images/bg-login.jpg")}
      style={styles.bglogin}
    >
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1 }}
        keyboardVerticalOffset={180}
      >
        <View style={styles.container}>
          <View></View>
          <View style={styles.boxlogin}>
            <Image
              source={require("../images/logo-LGM.png")}
              style={styles.logologin}
            />

            <View style={styles.inputView}>
              <View style={styles.iconinput}>
                <Ionicons
                  name="md-person"
                  size={20}
                  color="white"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </View>

              <TextInput
                placeholder="Tài khoản"
                style={styles.inputTextBlack}
                onChangeText={(value) => setUsername(value)}
                value={username}
              />

            </View>

            {renWarning(username, "Tài khản không được để trống")}

            <View style={styles.inputView}>
              <View style={styles.iconinput}>
                <Ionicons
                  name="ios-key"
                  size={20}
                  color="white"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </View>

              <TextInput
                placeholder="Mật khẩu"
                style={styles.inputTextBlack}
                onChangeText={(value) => setPassword(value)}
                value={password}
                secureTextEntry={true}
              />
            </View>
            {renWarning(password, "Mật khẩu không được để trống")}

            <View style={styles.loginBtn}>
              <Button
                color={colors.info}
                mode="contained"
                onPress={() => onSubmit()}
              >
                ĐĂNG NHẬP
              </Button>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
              <View style={{ paddingRight: '15%' }}>
                <Button onPress={() => handleAuthentication()}>
                  <MaterialCommunityIcons name="fingerprint" size={40} color="black" />
                </Button>
              </View>
              <Text
                style={{ marginBottom: 8, fontSize: 12, right: 10 }}
              >
                Quên mật khẩu ?
              </Text>
            </View>
          </View>

          <View style={styles.boxinfodevice}>
            <Text
              style={{
                fontSize: 9,
                color: colors.dark,
                marginLeft: "5%",
                opacity: 0.7,
              }}
            >
              model: {Device.brand}
              {"\n"}
              position: {props.token.lat},{props.token.lon}

            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (config) => {
      dispatch({
        type: constAction.API_TOKEN_REQUEST,
        config
      });
    },
    locationSet: (content) => {
      dispatch({
        type: constAction.LOCATION_SET,
        content
      });
    },
  };
};

const icon_style = StyleSheet.create({
  logo: {
    fontSize: 60,
    padding: 5,
    color: colors.grey,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
