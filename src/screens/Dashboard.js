import React, { useState, useEffect, useRef } from 'react'
import {
  View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator
} from 'react-native'
import { connect } from "react-redux"
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { actUpdateShowlist, actSetTodoShowlist, actGetUptrails, actSetActiveStaff } from "../actions"
import { colors } from '../styles'
import { moneyFormat } from '../functions';
import Loader from '../components/elements/Loader'
import Swiper from 'react-native-swiper';
import { StaffDash_com, StaffTodo_com, StaffHeader_com } from '../components/StaffDash'
import { BarChartPM, BarChartFL } from '../components/Chart'

function Dashboard(props) {
  if (props.fetching || props.data === null)
    return (
      <Loader />
    )

  else
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <StaffHeader_com />
        <View style={{ flex: 3 }}>
          <Swiper
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={6}
            showsPagination={false}
            autoplayDirection={true}
            navigation={props.navigation}
          >
            <StaffDash_com />
            <StaffTodo_com />
          </Swiper>
        </View>
        <View style={{ flex: 4 }}>
          <Swiper
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={3}
            showsPagination={false}
            autoplayDirection={true}
            navigation={props.navigation}
          >
            <BarChartPM />
            <BarChartFL />
          </Swiper>
        </View>
        <View style={styles.tool_frame}>
          <TouchableOpacity
            style={styles.btn_tool}
            onPress={() => props.navigation.navigate('ListPayment')}>
            <FontAwesome5 name="dollar-sign" size={20} color={colors.gray} style={{ padding: 10, paddingLeft: 15, paddingRight: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_tool}
            onPress={() => props.navigation.navigate('Uptrail')}>
            <FontAwesome5 name="route" size={20} color={colors.gray} style={{ padding: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_tool}
            onPress={() => props.navigation.navigate('Portfolio', { name: 'Tổng HD' })}>
            <FontAwesome name="list-alt" size={20} color={colors.gray} style={{ padding: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  tool_frame: {
    width: '80%',
    marginVertical: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    marginTop: 10,
    flex: 1
  },
  btn_tool: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 15,
    height: 45
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    fetching: state.data.fetching,
    data: state.data.data,
    showlists: state.showlists.applIds,
    todoCal: state.data.todoCal,
    totalCal: state.data.totalCal,
    treeCal: state.treeCal,
    uptrails: state.uptrails,
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







export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

