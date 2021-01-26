import React, { useState, useEffect, useRef } from 'react'
import {
  View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator
} from 'react-native'
import { connect } from "react-redux"
import { actUpdateShowlist, actSetTodoShowlist } from "../actions"
import { colors } from '../styles'
import { moneyFormat } from '../functions';
import { useNavigation } from '@react-navigation/native';



function TodoDash(props) {
  const navigation = useNavigation();
  const handleShow = (list, title) => {
    navigation.navigate('Portfolio', { name: title });
    props.updateShowlist(list)
  }
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
          <TouchableOpacity style={styles.main_frame} onPress={() => handleShow(props.todoCal.todoCase.applIds, 'Todo list')}>
            <Text style={styles.main_value}>
              {props.todoCal.todoCase.case}
            </Text>
            <Text style={styles.title_value}>
              Case
              </Text>
          </TouchableOpacity>
          <View style={styles.sub_frame}>
            <TouchableOpacity style={styles.sub_frame_l} onPress={() => handleShow(props.todoCal.todoPaid.applIds, 'Todo Paid Case')}>
              <Text style={styles.sub_value}>
                {props.todoCal.todoPaid.case}
              </Text>
              <Text style={styles.title_value}>
                Paid
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sub_frame_r} onPress={() => handleShow(props.todoCal.todoPtp.applIds, 'Todo PTP')}>
              <Text style={styles.sub_value}>
                {props.todoCal.todoPtp.case}
              </Text>
              <Text style={styles.title_value}>
                PTP
                </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.frame_r} >
          <TouchableOpacity style={styles.main_frame} onPress={() => handleShow(props.todoCal.todoFollowed.applIds, 'Todo Followed')}>
            <Text style={styles.main_value}>
              {props.todoCal.todoFollowed.case}
            </Text>
            <Text style={styles.title_value}>
              Visited
              </Text>
          </TouchableOpacity>
          <View style={styles.sub_frame}>
            <TouchableOpacity style={styles.sub_frame_l} onPress={() => handleShow(props.todoCal.todoBptp.applIds, 'Todo Broken PTP')}>
              <Text style={styles.sub_value}>
                {props.todoCal.todoBptp.case}
              </Text>
              <Text style={styles.title_value}>
                Broken PTP
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sub_frame_r} onPress={() => handleShow(props.todoCal.todoRevisit.applIds, 'Todo Revisit')}>
              <Text style={styles.sub_value}>
                {props.todoCal.todoRevisit.case}
              </Text>
              <Text style={styles.title_value}>
                Revisit
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
    borderLeftColor: 'rgba(0,0,0,0.1)'
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
    borderTopColor: 'rgba(0,0,0,0.1)'
  },
  sub_frame_l: {
    flex: 1,
  },
  sub_frame_r: {
    flex: 1,
    borderLeftWidth: 0,
    borderLeftColor: 'rgba(0,0,0,1)'
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
    data: state.data.data,
    todoCal: state.todoCal,
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


export default connect(mapStateToProps, mapDispatchToProps)(TodoDash);

