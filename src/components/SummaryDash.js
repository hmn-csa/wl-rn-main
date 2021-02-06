import React, { useState, useEffect, useRef } from 'react'
import {
  View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator
} from 'react-native'
import { connect } from "react-redux"
import { actUpdateShowlist, actSetTodoShowlist } from "../actions"
import { colors } from '../styles'
import { moneyFormat } from '../functions';
import { useNavigation } from '@react-navigation/native';
import { CategorieStack, CalendarStack, DashboardStack, UserStack, PortStack } from '../screens/Stacks'




function SummaryDash(props) {
  const navigation = useNavigation();
  const handleShow = (list, title) => {
    navigation.navigate('Portfolio', { name: title })
    props.updateShowlist(list)
  }
  return (
    <ScrollView >
      <Text style={styles.header_dash}>
        Summary
        </Text>
      <View style={styles.collx_frame}>
        <View style={styles.frame_l}>
          <TouchableOpacity style={styles.main_frame} onPress={() => handleShow(props.totalCal.totalCase.applIds, 'Total Cases')}>
            <Text style={styles.main_value}>
              {props.totalCal.totalCase.case}
            </Text>
            <Text style={styles.title_value}>
              Total case
              </Text>
          </TouchableOpacity>
          <View style={styles.sub_frame}>
            <TouchableOpacity style={styles.sub_frame_l} onPress={() => handleShow(props.totalCal.paidMtd.applIds, 'Total Paid Cases')}>
              <Text style={styles.sub_value}>
                {moneyFormat(props.totalCal.paidMtd.value)}
              </Text>
              <Text style={styles.title_value}>
                Paid MTD
                </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.frame_r}>
          <TouchableOpacity style={styles.main_frame}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleShow(props.totalCal.ptpCase.applIds, 'Total PTP')}>
                <Text style={styles.main_value}>
                  {props.totalCal.ptpCase.case}/
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShow(props.totalCal.followed.applIds, 'Total Followed')} >
                <Text style={styles.main_value}>
                  {props.totalCal.followed.case}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title_value}>
              Total PTP / Visit
              </Text>
          </TouchableOpacity>
          <View style={styles.sub_frame}>
            <TouchableOpacity style={styles.sub_frame_l} onPress={() => handleShow(props.totalCal.paidMtd.applIds, 'Total Paid Cases')}>
              <Text style={styles.sub_value}>
                {props.totalCal.paidMtd.case}
              </Text>
              <Text style={styles.title_value}>
                Collected MTD
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  todo_frame: {
    flexDirection: 'row',
    alignContent: 'stretch',
  },
  frame_l: {
    flex: 1,
    flexDirection: 'column',
  },
  frame_r: {
    flex: 1,
    flexDirection: 'column',
    borderLeftWidth: 0,
    borderLeftColor: '#CCC'
  },
  header_dash: {
    color: colors.info,
    fontWeight: 'bold',
    fontSize: 25,
    paddingLeft: 30,
    marginTop: 10,
    marginBottom: 5
  },
  main_frame: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  sub_frame: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
    alignItems: 'center',
    borderTopWidth: 0,
    borderTopColor: '#CCC'
  },
  sub_frame_l: {
    flex: 1,
  },
  sub_frame_r: {
    flex: 1,
    borderLeftWidth: 0,
    borderLeftColor: '#CCC'
  },
  main_value: {
    fontSize: 35,
    textAlign: 'center',
    color: colors.black,
    marginTop: 5
  },
  sub_value: {
    fontSize: 25,
    textAlign: 'center',
    color: colors.black,
    marginTop: 10
  },
  title_value: {
    textAlign: 'center',
    paddingBottom: 5,
    fontSize: 12,
    color: colors.grey
  },
  collx_frame: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
  },
  past_due_frame: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
  },
  tool_frame: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 20,

  },
  btn_tool: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 20,
    marginRight: 20,
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
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(SummaryDash);

