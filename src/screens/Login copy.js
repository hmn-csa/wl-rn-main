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
// import CheckBox from '@react-native-community/checkbox';
import { useForm, Controller } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Device from "expo-device";
import { connect } from "react-redux";
import { actloginUser, actLocationSet } from "../actions/index";
import { styles, colors } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../components/elements/Loader";
import { Button } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

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
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
    return result;
  } else {
    alert("No values stored under that key.");
  }
}

function Login(props) {
  //============ Get IP user
  const [sccaned, setSccaned] = React.useState(false);

  // const getIP = async () => {
  //   fetch('https://api.ipify.org?format=json')
  //     .then(response => response.json())
  //     .then(data => setIP(data.ip))
  //     .catch(error => console.log(error));
  // }
  //=============================

  const [ip, setIP] = React.useState(null);



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

  // useEffect(() => {
  //   checkDeviceForHardware();
  //   checkForBiometrics();
  //   // handleLoginPress();
  //   // handleAuthentication(props.token);
  // }, []);

  // const handleLoginPress = async () => {
  //   handleAuthentication(props.token);
  // };

  const handleAuthentication = async (cor) => {
    let result = await LocalAuthentication.authenticateAsync();
    console.log("kết quả auth", result);
    if (result.success) {
      // setSccaned(true);

      let username = await SecureStore.getItemAsync("username");
      let password = await SecureStore.getItemAsync("password");
      console.log("datakeychain", username, password);

      let data_login = {
        username: username,
        password: password,
        lat: cor.lat,
        lon: cor.lon,
        device_brand: Device.brand,
        device_os: Device.osName,
        device_name: Device.modelName,
      };
      props.login(data_login);
      storeToken(data_login);
    } else {
      alert("Error! Enter your username and password!");
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
  };

  const getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      if (data !== null) {
        setValue("username", data.username);
        setValue("password", data.password);
      }
    } catch (error) {
      alert(error);
    }
  };

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
      // username: user,
      // password: Pass,
      ...data,
      lat: props.token.lat,
      lon: props.token.lon,
      device_brand: Device.brand,
      device_os: Device.osName,
      device_name: Device.modelName,
    };
    if (data.lat === null || data.lon === null) getLocation();
    else {
      props.login(data);
      storeToken(data);
      savekeychain("username", data.username);
      savekeychain("password", data.password);
    }
  };

  const storeToken = async (data) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      alert("Something went wrong", error);
    }
  };

  const removeToken = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };

  if (props.data.fetching) return <Loader />;

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
            ></Image>
            {props.token.error ? (
              <Text style={styles.alertlogin}>{props.token.error}</Text>
            ) : null}
            <View style={styles.inputView}>
              <View style={styles.iconinput}>
                <Ionicons
                  name="md-person"
                  size={20}
                  color="white"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </View>

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    placeholder="Tài khoản"
                    style={styles.inputTextBlack}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="username"
                rules={{ required: true }}
                defaultValue=""
              />
            </View>
            {errors.username && (
              <Text style={styles.alertlogin}>
                Tài khoản không được để trống
              </Text>
            )}
            <View style={styles.inputView}>
              <View style={styles.iconinput}>
                <Ionicons
                  name="ios-key"
                  size={20}
                  color="white"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </View>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Mật khẩu"
                    style={styles.inputTextBlack}
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(value);
                    }}
                    value={value}
                  />
                )}
                name="password"
                rules={{ required: true }}
                defaultValue=""
              />
            </View>
            {errors.password && (
              <Text style={styles.alertlogin}>
                Mật khẩu không được để trống
              </Text>
            )}
            <View style={styles.loginBtn}>
              <Button
                color={colors.info}
                mode="contained"
                onPress={handleSubmit(onSubmit)}
              >
                ĐĂNG NHẬP
              </Button>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              {/* <View style={{ flexDirection: 'row', marginLeft: '5%' }}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
                <Text style={{ marginTop: 8, fontSize: 12 }}>Lưu mật khẩu</Text>
              </View> */}

              <View style={{ paddingRight: 40 }}>
                <Button onPress={() => handleAuthentication(props.token)}>
                  <FontAwesome5 name="fingerprint" style={icon_style.logo} />
                </Button>
              </View>
              <Text
                style={{ marginBottom: 8, fontSize: 12, marginRight: "5%" }}
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
              {"\n"}
              ip: {ip}
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
      dispatch(actloginUser(config));
    },
    locationSet: (content) => {
      dispatch(actLocationSet(content));
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
