import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, ScrollView, TextInput, ImageBackground } from 'react-native';
import { connect } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

import * as constAction from '../consts'
import { colors } from '../styles';
import { EMPTYAVATAR } from '../images'



function UserSignout(props) {

  const [changePw, setChangePw] = useState(false)
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  const [avatar, setAvatar] = useState(
    !props.token.active_infos.avatar ? EMPTYAVATAR :
      { uri: props.token.active_infos.avatar }
  )

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleChangePw = () => {
    if (newPw !== "") {
      if (confirmPw !== newPw) {
        alert("Mật khẩu xác thực chưa đúng")
      }
      else {
        let config = {
          token: props.token.token.access,
          newPw: newPw
        }
        console.log(config)
        props.changePw(config)
      }
    }
    else alert("Nhập vào mật khẩu mới")
  }

  const outUsers = () => {
    props.logout()
  };

  const renAvatar = (avatar) => {
    if (!avatar)
      return EMPTYAVATAR
    else return { uri: avatar }
  }

  const pickAvatar = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      base64: true,
      quality: 0.2,
    })

    if (!result.cancelled) {
      setAvatar(result)
      props.changeAvatar({
        token: props.token.token.access,
        avatar: "data:image/png;base64," + result.base64
      })
    }
  };

  const renChangPassword = (changePw) => {

    if (changePw) {
      return (
        <View style={[
          {
            width: '85%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 10,
            backgroundColor: 'white'
          },]} >
          <View style={styles.inputView} >
            <TextInput
              secureTextEntry={true}
              placeholder="Mật khẩu mới"
              style={styles.inputTextBlack}
              value={newPw}
              onChangeText={value => setNewPw(value)}
            />
          </View>
          <View style={styles.inputView} >
            <TextInput
              secureTextEntry={true}
              style={[styles.inputTextBlack]}
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPw}
              onChangeText={value => setConfirmPw(value)}
            />
          </View>
          <Button
            mode="contained"
            style={{
              width: "75%",
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            color={colors.secondary}
            contentStyle={{ marginLeft: 2 }}
            onPress={() => handleChangePw()}
          >
            Xác nhận
            </Button>


        </View>
      )
    }
    else {
      return (
        <View>
        </View>
      )
    }
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }} >

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}>

        <ImageBackground
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 130,
            height: 130,
            borderRadius: 63,
            borderWidth: 0,
            borderColor: "white",
            marginBottom: 10,
            marginTop: 10,
            resizeMode: "cover"
          }}
          imageStyle={{ borderRadius: 90, resizeMode: "cover" }}
          source={avatar}>
          <Entypo name="image"
            size={22}
            color="black"
            style={{
              marginLeft: 100,
              marginTop: 105,
              backgroundColor: 'white'
            }}
            onPress={() => pickAvatar()}
          />
        </ImageBackground>

        <Text style={styles.name}>{props.token.active_staff} - {props.token.active_infos.fc_name}</Text>
      </View>

      <View style={[styles.row, { flex: 1, padding: 5 }]}>
        <View style={[styles.box, { flex: 1 }]}>
          <Text style={[styles.msgTxt]}>Tài khoản:</Text>
        </View>
        <View style={[styles.box, { flex: 1.2 }]}>
          <Text style={[styles.msgTxt]}>{props.token.active_staff}</Text>
        </View>
      </View>

      <View style={[styles.row, { flex: 1, padding: 5 }]}>
        <View style={[styles.box, { flex: 1 }]}>
          <Text style={[styles.msgTxt]}>Họ tên:</Text>
        </View>
        <View style={[styles.box, { flex: 1.2 }]}>
          <Text style={[styles.msgTxt]}>{props.token.active_infos.fc_name}</Text>
        </View>
      </View>

      <View style={[styles.row, { flex: 1, padding: 5 }]}>
        <View style={[styles.box, { flex: 1 }]}>
          <Text style={[styles.msgTxt]}>Sđt:</Text>
        </View>
        <View style={[styles.box, { flex: 1.2 }]}>
          <Text style={[styles.msgTxt]}>{props.token.active_infos.phone}</Text>
        </View>
      </View>


      <View style={[styles.row, { flex: 1, padding: 5 }]}>
        <View style={[styles.box, { flex: 1 }]}>
          <Text style={[styles.msgTxt]}>team lead:</Text>
        </View>
        <View style={[styles.box, { flex: 1.2 }]}>
          <Text style={[styles.msgTxt]}>{props.token.active_infos.team_lead}</Text>
        </View>
      </View>

      <View style={[styles.row, { flex: 1, padding: 5 }]}>
        <View style={[styles.box, { flex: 1 }]}>
          <Text style={[styles.msgTxt]}>Địa chỉ:</Text>
        </View>
        <View style={[styles.box, { flex: 1.2 }]}>
          <Text style={[styles.msgTxt]}>{props.token.active_infos.address}</Text>
        </View>
      </View>

      <Button
        mode="contained"
        icon="key-change"
        color={colors.info}
        labelStyle={styles.buttonLabel}
        style={styles.loginBtn}
        onPress={
          () => {
            changePw ? setChangePw(false) : setChangePw(true)
          }}

      >
        Đổi mật khẩu
        </Button>
      {renChangPassword(changePw)}
      <Button
        mode="contained"
        icon="logout"
        color={colors.info}
        style={styles.loginBtn}
        labelStyle={styles.buttonLabel}
        onPress={() => outUsers()}
      >
        ĐĂNG XUẤT
        </Button>

    </ScrollView>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch({ type: constAction.TOKEN_REMOVE })
    },

    changePw: (config) => {
      dispatch({
        type: constAction.API_CHANGEPW_REQUEST,
        config
      })
    },

    changeAvatar: (config) => {
      dispatch({
        type: constAction.API_CHANGE_AVATAR_REQUEST,
        config
      })
    },

  }
}


const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "85%",
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
  },
  inputView: {
    width: "85%",
    backgroundColor: colors.light,
    height: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
    paddingLeft: 20,
    borderRadius: 5,
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  loginBtn: {
    width: "85%",
    marginLeft: 'auto',
    marginRight: '7.5%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: "white",
    backgroundColor: colors.light,
    borderColor: colors.grey,
    borderWidth: 0.3,
  },
  inputTextBlack: {
    height: 50,
    color: "black"
  },
  buttonLabel: {
    color: colors.main,
    fontSize: 12,
    fontWeight: "800",
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(UserSignout);

