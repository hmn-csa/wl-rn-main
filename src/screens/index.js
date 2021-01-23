//file: src/App.js
import React, { useState, useEffect } from "react";
import { Button } from 'react-native-paper';

//Kết nối vơi redux
import { connect } from "react-redux";
import { View, StyleSheet } from 'react-native';
//import ContainerShow from './containers/ContainerShow'

import Login from './Login'
import MainApp from './MainApp'
// import ManagerApp from './ManagerApp'
import ManagerApp from '../screens-manager/ManagerApp'
import ManagerView from '../screens-manager'

import * as constAction from "../consts/index";

function MyApp(props) {
  //console.log(props.token.token)
  if (props.token.token === null || props.token.token === undefined)
    return (
      <View style={styles.container}>
        <Login />
      </View>
    )
  else if (props.token.token.role === 'FC')
    return (
      <View style={styles.container}>
        <MainApp />
      </View>
    )
  else if (props.token.token.role === 'manager_lv1') {
    if (props.staff.mode_staff)
      return (
        <View style={styles.container}>
          
          <MainApp />
          <Button onPress={() => props.outStaffMode()}>
            X
          </Button>
        </View>
      )
    else return <ManagerApp />
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    staff: state.staff,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    outStaffMode: () => {
      dispatch({
        type: constAction.OUT_STAFF_MODE,
      })
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);