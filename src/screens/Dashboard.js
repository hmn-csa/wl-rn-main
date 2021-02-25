import React, { useState, useEffect, useRef } from 'react'
import {
  View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator
} from 'react-native'
import { connect } from "react-redux"
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { actUpdateShowlist, actSetTodoShowlist, actGetUptrails, actSetActiveStaff } from "../actions"
import { colors } from '../styles'
import { moneyFormat } from '../functions';
import Loader from '../components/elements/Loader'
import Swiper from 'react-native-swiper';
import { StaffDash_com, StaffTodo_com, StaffHeader_com } from '../components/StaffDash'
import { BarChartPM, BarChartFL, LineChartFL } from '../components/Chart'

const { width, height } = Dimensions.get("window");

function Dashboard(props) {
  console.log(props.paymentCal)
  if (props.fetching || !props.data || props.paymentFetching)
    return (
      <Loader />
    )

  else
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <StaffHeader_com />
        <View style={[styles.row, { flex: 1 }]}>
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
        <View style={[styles.row, { flex: 1.382 }]}>
          <Swiper
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={3}
            showsPagination={false}
            autoplayDirection={true}
            navigation={props.navigation}
          >
            {BarChartPM(props.paymentCal, "Thanh toán 10 ngày:")}
            {BarChartPM(props.paymentCal, "Viếng thăm 10 ngày:")}
            {/* {LineChartFL(props.paymentCal)} */}
          </Swiper>
        </View>
        <View style={[styles.row, styles.toolFrame, { flex: 0.382 }]}>
          <TouchableOpacity
            style={styles.toolBtn}
            onPress={() => props.navigation.navigate('ListPayment')}>
            <FontAwesome5 name="dollar-sign" size={30} color={colors.gray} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolBtn}
            onPress={() => props.navigation.navigate('Uptrail')}>
            <FontAwesome5 name="route" size={30} color={colors.gray} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolBtn}
            onPress={() => props.navigation.navigate('Portfolio', { name: 'Total case' })}>
            <FontAwesome5 name="list" size={30} color={colors.gray} />
          </TouchableOpacity>
        </View>
      </View >
    )
}

const styles = StyleSheet.create({
  row: {
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingLeft: 5,
  },
  box: {
    justifyContent: 'center',
    flex: 1
  },
  toolFrame: {
    width: '80%',
    marginVertical: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    marginTop: 10,
  },
  toolBtn: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 15,
    height: 60,
    width: 60,
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    fetching: state.data.fetching,
    data: state.data.data,
    paymentCal: state.payments.paymentCal,
    paymentFetching: state.payments.fetching,
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

