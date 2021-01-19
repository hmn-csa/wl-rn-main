import React, { useState, useEffect } from 'react'
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator
} from 'react-native'

import { Button } from 'react-native-paper';

import { connect } from "react-redux"
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons, Entypo, MaterialIcons} from '@expo/vector-icons';
import { styles, colors } from '../styles'
import { color } from 'react-native-reanimated';
import { SHOWLIST_CLEAR } from '../consts';
//import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { moneyFormat } from '../functions'

function ManagerDash(props) {
  //const navigation = useNavigation()



  if (props.fetching || props.data === null)
    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        <Text>Loading data... </Text>
        <ActivityIndicator size={100} color={colors.primary} />
      </View>
    )
  else
    return (
      <View style={[styles.container, { paddingTop: 20 }]}>
        <View style={{ flex: 3 }}>

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
                  >{props.staff.dash.totalCase.case}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.box]}>
                <TouchableOpacity
                  style={[cardStyles.container, styles.box]}
                  onPress={() => handleShow(props.treeCal[1].applIds, true)}>
                  <Text style={styles.indexLabel}>Pos</Text>
                  <Text
                    style={styles.indexValue}
                  >{moneyFormat(props.staff.dash.totalCase.pos)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.box]}>
                <TouchableOpacity
                  style={[cardStyles.container, styles.box]}
                  onPress={() => handleShow(props.totalCal.ptpCase.applIds, true)}>
                  <Text style={styles.indexLabel}>Visited</Text>
                  <Text
                    style={styles.indexValue}
                  >{props.staff.dash.visited.case}
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
                >{props.staff.dash.paidMtd.case}
                </Text>

              </View>
              <View style={[styles.box]}>
                <Text style={styles.indexLabel}>Số tiền thu</Text>
                <Text
                  style={[styles.indexValueSmall, { color: colors.green }]}
                >{moneyFormat(props.staff.dash.paidMtd.value)}
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
                >{props.staff.dash.paidToday.case}
                </Text>

              </View>
              <View style={[styles.box]}>
                <Text style={styles.indexLabel}>Số tiền thu</Text>
                <Text
                  style={[styles.indexValueSmall, { color: colors.green }]}
                >{moneyFormat(props.staff.dash.paidToday.value)}
                </Text>

              </View>
            </View>
          </TouchableOpacity>
          {/* END Paid */}


        </View>

        <View style={{ flex: 0.8 }}>
          {/* BEGIN Payment */}
          <View style={[styles.row, {padding: 10, }]}>
            <TouchableOpacity style={[styles.box, cardStyles.iconContainer ]} 
            onPress={() => props.navigation.navigate('ListPayment')}>
              <MaterialIcons
                name='attach-money'
                style={cardStyles.icon}
                
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.box, cardStyles.iconContainer ]}
            onPress={() => props.navigation.navigate( 'Uptrail')}>
              <MaterialIcons
                name='contacts'
                style={cardStyles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.box, cardStyles.iconContainer ]} 
            onPress={() => props.navigation.navigate( 'checkinMap')}>
              <Entypo
                name='location'
                style={cardStyles.icon}
                
              />
              
            </TouchableOpacity>
            
          </View>
          {/* END ToTal */}
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

