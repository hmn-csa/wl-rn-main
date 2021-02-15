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
import { Button } from 'react-native-paper';
import TodoDash from '../components/TodoDash'
import SummaryDash from '../components/SummaryDash'
import Calendar from '../components/Calendar'
import { BarChartPM, LineChartFL } from '../components/Chart'
function Dashboard(props) {
  if (props.fetching || props.data === null)
    return (
      <Loader />
    )

  else
    return (
      <ScrollView style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
      }}>
        <Swiper
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={6}
          style={{ height: 155 }}
          showsPagination={false}
          autoplayDirection={true}
          navigation={props.navigation}
        >
          <TodoDash />
          <SummaryDash />
        </Swiper>
        <View style={{ flex: 1 }}>
          <BarChartPM />
        </View>
        <View style={{ flex: 1 }}>
          <LineChartFL />
        </View>

        {/* <View style={styles.tool_frame}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholder=" Nhập mã HD..."
                style={{
                  width: '90%', paddingLeft: 5,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderRightWidth: 0,
                  borderWidth: 1,
                  borderColor: colors.grey
                }}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="searchall"
            defaultValue=""
          />
          <View style={{
            marginRight: 10, borderTopRightRadius: 5, borderBottomRightRadius: 5,
            borderWidth: 1, borderLeftWidth: 0, borderColor: colors.grey
          }}>
            <FontAwesome name="search" size={15} color="rgba(0,0,0,0.4)" style={{ margin: 5 }} />
          </View>
        </View> */}
        <View style={styles.tool_frame}>
          <TouchableOpacity
            style={styles.btn_tool}
            onPress={() => props.navigation.navigate('ListPayment')}>
            <FontAwesome5 name="search-dollar" size={24} color={colors.gray} style={{ padding: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_tool}
            onPress={() => props.navigation.navigate('Uptrail')}>
            <FontAwesome5 name="map-marked-alt" size={24} color={colors.gray} style={{ padding: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_tool}>
            <FontAwesome name="calendar" size={24} color={colors.gray} style={{ padding: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_tool}
            onPress={() => props.navigation.navigate('Portfolio', { screen: 'Uptrail' })}>
            <MaterialCommunityIcons name="map-clock" size={24} color={colors.gray} style={{ padding: 15 }} />
          </TouchableOpacity>
        </View>
      </ScrollView >
    )
}

const styles = StyleSheet.create({
  tool_frame: {
    width: '80%',
    marginVertical: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 10
  },
  btn_tool: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 20,
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

