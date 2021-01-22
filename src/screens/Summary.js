import React, { useState, useEffect } from 'react'
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator
} from 'react-native'
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { styles, colors } from '../styles'
import { moneyFormat } from '../functions';
import Loader from '../components/elements/Loader'
import { Button } from 'react-native-paper';
import { actUpdateShowlist, actSetTodoShowlist, actGetUptrails, actSetActiveStaff } from "../actions"
import { connect } from "react-redux"



function Summary(props) {
  const [SlideActive, setSlideActive] = useState("summary")
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
  return (
    <View style={{ padding: 5 }}>
      <View>
        <Text>
          Summary
      </Text>
      </View>

    </View>
  );
}



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
export default connect(mapStateToProps, mapDispatchToProps)(Summary);
