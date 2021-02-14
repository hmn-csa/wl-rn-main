import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, ScrollView, TextInput } from 'react-native';
import { connect } from "react-redux";
import {
  actlogoutUser, clearUptrail,
  clearData, clearShowlist
} from "../actions/index"

import { Button } from 'react-native-paper';


import { colors, styles } from '../styles';

import { EMPTYAVATAR } from '../images'

function User(props) {

  const [changePw, setChangePw] = useState(false)

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
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          },]} >

          <TextInput
            placeholder="Tài khoản"
            style={styles.inputTextBlack}
          />
          <TextInput
            mode="Flat"
            style={{ color: colors.primary }}
            label="Mật khẩu mới 2"
          />
          <TextInput
            mode="flat"
            style={{ color: colors.primary }}
            label="Nhập lại mật khẩu mới"
          />
          <Button
            mode="contained"
            color={colors.secondary}
            contentStyle={{ marginLeft: 2 }}
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
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(User);

