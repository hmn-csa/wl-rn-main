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
import { useForm, Controller } from 'react-hook-form'
import Calendar_ from '../components/Calendar'


function TodoDash(props) {
  const { register, setValue, handleSubmit, control, errors } = useForm();

  const handleShowTodo = () => {
    const list_todo = Object.values(props.data).filter(appl => appl.todo_flag == 1).map(a => a.appl_id);
    props.navigation.navigate('Portfolio', { screen: 'List' });
    props.updateShowlist(list_todo)
  }

  const handleShow = (list, isTodo) => {
    props.setTodoShowlist(isTodo)
    props.navigation.navigate('Portfolio', { screen: 'List' })
    props.updateShowlist(list)
  }

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
        <Text style={styles.header_dash}>
          Todo list
        </Text>
        <View style={styles.todo_frame}>
          <View style={styles.frame_l}>
            <TouchableOpacity style={styles.main_frame}>
              <Text style={styles.main_value}>
                60
              </Text>
              <Text style={styles.title_value}>
                Case
              </Text>
            </TouchableOpacity>
            <View style={styles.sub_frame}>
              <TouchableOpacity style={styles.sub_frame_l}>
                <Text style={styles.sub_value}>
                  5
                </Text>
                <Text style={styles.title_value}>
                  Paid
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sub_frame_r}>
                <Text style={styles.sub_value}>
                  0
                </Text>
                <Text style={styles.title_value}>
                  PTP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.frame_r}>
            <TouchableOpacity style={styles.main_frame}>
              <Text style={styles.main_value}>
                2
              </Text>
              <Text style={styles.title_value}>
                Visited
              </Text>
            </TouchableOpacity>
            <View style={styles.sub_frame}>
              <TouchableOpacity style={styles.sub_frame_l}>
                <Text style={styles.sub_value}>
                  5
                </Text>
                <Text style={styles.title_value}>
                  Broken PTP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sub_frame_r}>
                <Text style={styles.sub_value}>
                  0
                </Text>
                <Text style={styles.title_value}>
                  Re Visit
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
    borderLeftWidth: 1,
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
    borderTopWidth: 1,
    borderTopColor: '#CCC'
  },
  sub_frame_l: {
    flex: 1,
  },
  sub_frame_r: {
    flex: 1,
    borderLeftWidth: 1,
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
    todoCal: state.todoCal,
    totalCal: state.totalCal,
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


export default connect(mapStateToProps, mapDispatchToProps)(TodoDash);

