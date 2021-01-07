import React, { useState, useEffect } from 'react'
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator
} from 'react-native'

import { Button } from 'react-native-paper';

import { connect } from "react-redux"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { actUpdateShowlist, actSetTodoShowlist, actGetUptrails, actSetActiveStaff } from "../actions"

import { styles, colors } from '../styles'
import { color } from 'react-native-reanimated';
import { SHOWLIST_CLEAR } from '../consts';
//import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { moneyFormat } from '../functions'

function Dashboard(props) {
  //const navigation = useNavigation()

  // useEffect(() => {
  //   if (props.uptrails.justFetching === false) {
  //     props.setActiveStaff({'staff_id':1})
  //     props.getUptrails({ token: props.token, start: "", end: "" })
  //   }
  //   else console.log('ddax tai')
  // }, [props.uptrails.active_staff]);

  const [loading, setLoading] = useState(false)

  const handleShowTodo = () => {

    const list_todo = Object.values(props.data).filter(appl => appl.todo_flag == 1).map(a => a.appl_id);
    props.navigation.navigate('Portfolio', { screen: 'List' });
    props.updateShowlist(list_todo)
    
    console.log('show list:', list_todo)
    //navigation.navigate('ListAppls')
    //props.navigation.navigate('List');
  }

  const handleShow = (list, isTodo) => {
    props.setTodoShowlist(isTodo)
    props.navigation.navigate('Portfolio', { screen: 'List' })
    props.updateShowlist(list)
  }
  
  if (props.fetching || props.data === null) 
  return (
    <View style={[styles.container, {alignItems: 'center'}]}>
      <Text>Loading data... </Text>
      <ActivityIndicator size={100} color={colors.primary}/> 
    </View>
  )
  
  else 
  return (
    <View style={[styles.container, { paddingTop: 20 }]}>
      <View style={{ flex: 3 }}>
        {/* BEGIN Todos */}
        {/* <Text style={styles.header}>Todos</Text> */}

      

        <TouchableOpacity
          style={[cardStyles.container, { flex: 2.5}]}>
          <View style={[styles.row, { flex: 0.4 }]}>
            <Text style={[cardStyles.Text, { color: colors.lightGray }]}>
            {props.uptrails.active_staff} - {props.uptrails.active_infos.fc_name}
            </Text>
          </View>


          <View style={[styles.row, { flex: 0.4 }]}>
            <Text style={[cardStyles.Text, { color: colors.lightGray }]}>
              Danh mục tự chọn
            </Text>
          </View>

          <View style={[styles.row, { flex: 1.618, }]}>
            <View style={[styles.box]}>
              <TouchableOpacity
                //style={{ borderBottomWidth: 1, borderBottomColor: colors.lightGray }}
                onPress={() => handleShow(props.todoCal.todoCase.applIds, true)}>
                <Text style={styles.indexLabel}>Số HĐ tự chọn</Text>
                <Text
                  style={styles.indexValueSmall}
                >
                  {props.todoCal.todoCase.case}
                </Text>

              </TouchableOpacity>
            </View>
            <View style={[styles.box]}>
              <TouchableOpacity
                //style={{ borderBottomWidth: 1, borderBottomColor: colors.lightGray }}
                onPress={() => handleShow(props.todoCal.todoFollowed.applIds, true)}>
                <Text style={styles.indexLabel}>HĐ đã viếng thăm</Text>
                <Text
                  style={styles.indexValueSmall}
                >{props.todoCal.todoFollowed.case}
                </Text>

              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.row, { flex: 0.4 }]}>
            <Text style={[cardStyles.Text, { color: colors.lightGray }]}>
              chi tiết
            </Text>
          </View>
          <View style={[styles.row, { flex: 1.618, }]}>
            <TouchableOpacity
              style={[cardStyles.container, styles.box]}
              onPress={() => handleShow(props.todoCal.todoPaid.applIds, true)}>
              <Text style={styles.indexLabel}>
                <Ionicons name='ios-checkmark-circle' style={[styles.logo, { color: colors.green }]} />
              Đã thu
            </Text>
              <Text
                style={styles.indexValueSmall}
              >
                {props.todoCal.todoPaid.case}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[cardStyles.container, styles.box]}
              onPress={() => handleShow(props.todoCal.todoPtp.applIds, true)}>
              <Text style={styles.indexLabel}>
                <Ionicons name='ios-heart' style={[styles.logo, { color: colors.green }]} />
              PTP
            </Text>
              <Text
                style={styles.indexValueSmall}
              >
                {props.todoCal.todoPtp.case}
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={[cardStyles.container, styles.box]}
              onPress={() => handleShow(props.todoCal.todoBptp.applIds, true)}>

              <Text style={styles.indexLabel}>
                <Ionicons name='ios-close-circle' style={[styles.logo, { color: colors.secondary }]} />
              Hủy-PTP
            </Text>
              <Text
                style={styles.indexValueSmall}
              >
                {props.todoCal.todoBptp.case}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[cardStyles.container, styles.box]}
              onPress={() => handleShow(props.todoCal.todoRevisit.applIds, true)}>

              <Text style={styles.indexLabel}>
                <Ionicons name='ios-cash' style={[styles.logo, { color: colors.secondary }]} />
              Thăm lại
            </Text>
              <Text
                style={styles.indexValueSmall}
              >
                {props.todoCal.todoRevisit.case}
              </Text>
            </TouchableOpacity>
          </View>

        </TouchableOpacity>



        {/* BEGIN ToTal */}
        <TouchableOpacity
          style={[cardStyles.container, { flex: 1.328 }]}
        >
          <View style={[styles.row, { flex: 0.5 }]}>
            <Text style={[cardStyles.Text, { color: colors.lightGray }]}>
              Thông tin danh mục
            </Text>
          </View>

          <View style={[styles.row, { flex: 1.618 }]}>
            <View style={[styles.box]}>
              <TouchableOpacity
                style={[cardStyles.container, styles.box]}
                onPress={() => handleShow(props.totalCal.totalCase.applIds, false)}>
                <Text style={styles.indexLabel}>Tổng số HĐ</Text>
                <Text
                  style={styles.indexValue}
                >{props.totalCal.totalCase.case}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.box]}>
              <TouchableOpacity
                style={[cardStyles.container, styles.box]}
                onPress={() => handleShow(props.treeCal[1].applIds, true)}>
                <Text style={styles.indexLabel}>Đã viếng thăm</Text>
                <Text
                  style={styles.indexValue}
                >{props.treeCal[1].case}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.box]}>
              <TouchableOpacity
                style={[cardStyles.container, styles.box]}
                onPress={() => handleShow(props.totalCal.ptpCase.applIds, true)}>
                <Text style={styles.indexLabel}>PTP</Text>
                <Text
                  style={styles.indexValue}
                >{props.totalCal.ptpCase.case}
                </Text>

              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        {/* END ToTal */}

        {/* BEGIN Paid */}
        <TouchableOpacity
          style={[cardStyles.container, { flex: 1 }]}
          onPress={() => handleShow(props.totalCal.paidAll.applIds, true)}>
          <View style={[styles.row, { flex: 0.618 }]}>
            <Text style={[cardStyles.Text, { color: colors.lightGray }]}>
              Tổng số thu trong tháng
            </Text>
          </View>
          <View style={[styles.row, { flex: 1.618 }]}>
            <View style={[styles.box]}>
              <Text style={styles.indexLabel}>HĐ đã thu</Text>
              <Text
                style={[styles.indexValueSmall, { color: colors.green }]}
              >{props.totalCal.paidMtd.case}
              </Text>

            </View>
            <View style={[styles.box]}>
              <Text style={styles.indexLabel}>Số tiền thu</Text>
              <Text
                style={[styles.indexValueSmall, { color: colors.green }]}
              >{moneyFormat(props.totalCal.paidMtd.value)}
              </Text>

            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[cardStyles.container, { flex: 1 }]}
          onPress={() => handleShow(props.totalCal.paidToday.applIds, true)}>
          <View style={[styles.row, { flex: 0.618 }]}>
            <Text style={[cardStyles.Text, { color: colors.lightGray }]}>
              Tổng số thu trong ngày
            </Text>
          </View>
          <View style={[styles.row, { flex: 1.618 }]}>
            <View style={[styles.box]}>
              <Text style={styles.indexLabel}>HĐ đã thu</Text>
              <Text
                style={[styles.indexValueSmall, { color: colors.green }]}
              >{props.totalCal.paidToday.case}
              </Text>

            </View>
            <View style={[styles.box]}>
              <Text style={styles.indexLabel}>Số tiền thu</Text>
              <Text
                style={[styles.indexValueSmall, { color: colors.green }]}
              >{moneyFormat(props.totalCal.paidToday.value)}
              </Text>

            </View>
          </View>
        </TouchableOpacity>
        {/* END Paid */}


      </View>

      <View style={{ flex: 0.138}}>

      </View>

    </View>


  )
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
  icon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 12,
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
    token: state.token.token.access,
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

