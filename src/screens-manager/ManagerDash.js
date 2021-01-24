import React, { useState, useEffect } from 'react'
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator
} from 'react-native'

import { Button } from 'react-native-paper';

import { connect } from "react-redux"
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { styles, colors } from '../styles'
import { color } from 'react-native-reanimated';
import { SHOWLIST_CLEAR } from '../consts';
//import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { moneyFormat } from '../functions'

function ManagerDash(props) {
  //const navigation = useNavigation()



}

const cardStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 13,
    margin: 5,
    padding: 5,
    shadowColor: colors.white,
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 24,
    // justifyContent: 'center',
  },
  wrapper: {
    flex: 0.5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  content: {
    flex: 0.7,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  dot: {
    backgroundColor: '#3FE77B',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    color: '#FFF',
    fontSize: 7,
    letterSpacing: 0.29,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  subText: {
    color: '#B1BCFD',
    fontSize: 10,
    letterSpacing: 0.29,
    paddingTop: 5,
  },

  icon: {
    fontWeight: "bold",
    fontSize: 40,
    padding: 5,
    color: colors.grey
  },

  iconContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    margin: 15,
  },

})

const mapStateToProps = (state, ownProps) => {
  return {
    staff: state.staff,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    },
    setTodoShowlist: (content) => {
      dispatch(actSetTodoShowlist(content))
    },
    setActiveStaff: (content) => {
      dispatch(actSetActiveStaff(content))
    },
    initDashboard: () => {
      dispatch(actInitDashboard())
    },
    getUptrails: (config) => {
      dispatch(actGetUptrails(config))
    },
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(ManagerDash);

