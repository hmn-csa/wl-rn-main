//file: src/App.js
import React, { useState, useEffect } from "react";

//Kết nối vơi redux
import { connect } from "react-redux";
import { View, StyleSheet} from 'react-native';
//import ContainerShow from './containers/ContainerShow'

import Login from './Login'
// import MainApp from './MainApp'
// import ManagerApp from './ManagerApp'
import ManagerApp from '../screens-manager/ManagerApp'


function MyApp(props) {
  console.log(props.token.token)
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
  else if(props.token.token.role === 'manager_lv1')
    return (
      <View style={styles.container}>
        <ManagerApp />
      </View>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
  };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps, null)(MyApp);