import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert, Image } from 'react-native';
import { connect } from "react-redux";
import {
  actlogoutUser, clearUptrail,
  clearData, clearShowlist
} from "../actions/index"



import { colors } from '../styles';

import { EMPTYAVATAR } from '../images'

function UserInfo(props) {

  const outUsers = () => {
    props.logout()
  };

  const renAvatar = (avatar) => {
    if (!avatar)
      return EMPTYAVATAR
    else return { uri: avatar }
  }

  return (
    <View style={{ flex: 1, }}>

      <View
      >
        <Image
          style={[styles.avatar]}
          source={renAvatar(props.token.active_infos.avatar)}>
        </Image>
        <Text style={styles.name}>{props.token.active_staff} - {props.token.active_infos.fc_name}</Text>
      </View>

      <View style={[styles.row]}>
        <View style={styles.box}>
          <Text style={styles.msgTxt}>Dư nợ gốc:</Text>
        </View>
        <View style={[styles.box, { flex: 3.5 }]}>
          <Text style={[styles.msgTxt, { fontWeight: 'bold', color: colors.info }]} >xxx</Text>
        </View>
      </View>
    </View>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 3
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "10%",
    backgroundColor: "#fb5b5a",
    borderRadius: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  },

  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

