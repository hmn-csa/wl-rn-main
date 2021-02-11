import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, ScrollView, TextInput } from 'react-native';
import { connect } from "react-redux";
import {
  actlogoutUser, clearUptrail,
  clearData, clearShowlist
} from "../actions/index"

import { Button } from 'react-native-paper';
import * as constAction from '../consts'

import { colors } from '../styles';

import { EMPTYAVATAR } from '../images'

function UserSignout(props) {

  const [changePw, setChangePw] = useState(false)
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  const handleChangePw = () => {
    if (newPw !== "") {
      if (confirmPw !== newPw) {
        alert("Mật khẩu xác thực chưa đúng")
      }
      else {
        let config = {
          token: props.token.token.access,
          new_password: newPw
        }
        props.changePw(config)
        alert("Mật khẩu mới thành công")
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

  const renChangPassword = (changePw) => {

    if (changePw) {
      return (
        <View style={[
          {
            width: '88%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 10
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
              width: "85%",
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
    <ScrollView >
      {/* <Text style={styles.logo}>HMN APP</Text> */}

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 130,
            height: 130,
            borderRadius: 63,
            borderWidth: 4,
            borderColor: "white",
            marginTop: 10,
            marginBottom: 10,
          }}
          source={renAvatar(props.token.active_infos.avatar)}>
        </Image>
        <Text style={styles.name}>{props.token.active_staff} - {props.token.active_infos.fc_name}</Text>
      </View>

      <View style={styles.loginBtn}>
        <Button
          mode="contained"
          icon="key-change"
          color={colors.info}
          contentStyle={{ marginLeft: 2 }}
          onPress={
            () => {
              changePw ? setChangePw(false) : setChangePw(true)
            }}

        >
          Đổi mật khẩu
        </Button>
      </View>
      {renChangPassword(changePw)}
      <View style={styles.loginBtn}>
        <Button
          mode="contained"
          icon="logout"
          color={colors.info}
          contentStyle={{ marginLeft: 2 }}
          onPress={() => outUsers()}
        >
          ĐĂNG XUẤT
        </Button>
      </View>
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
      dispatch(actlogoutUser())
      dispatch(clearShowlist())
      dispatch(clearUptrail())
      dispatch(clearData())
    },

    changePw: (config) => {
      dispatch(
        {
          type: constAction.API_CHANGEPW_REQUEST,
          config
        }
      )
    }
  }
}

const styles = StyleSheet.create({
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
    marginBottom: 10
  },
  inputTextBlack: {
    height: 50,
    color: "black"
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(UserSignout);

