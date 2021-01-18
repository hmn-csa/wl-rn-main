import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet, Text, View, FlatList,
  TouchableOpacity, Alert, Image, ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { connect } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimeAgo from 'react-native-timeago'

import { colors, styles as masterStyles } from '../styles'
import * as constAction from '../consts'
import { moneyFormat } from '../functions'
import { EMPTYAVATAR } from '../images';


function ManagerStaff(props) {

  // =========== hooks ============== //
  useEffect(() => {
    const interval = setInterval(() => {
      props.countManager()
    }, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    let config = {
      token: props.token,
      last_pull: props.staff.last_pull
    }
    if (config.last_pull !== null)
    props.pullManager(config)
  }, [props.staff.pullcnt])


  // =========== render ============== //
  const renIcon = (checkinData) => {
    if (!checkinData || checkinData.length == 0)
      return <Ionicons name='ios-close-circle' style={[{ color: colors.secondary }]} />
    else
      return <Ionicons name='ios-checkmark-circle' style={[{ color: colors.green }]} />
  }

  const renCheckin = (checkinData) => {
    if (!checkinData)
      return <ActivityIndicator size={10} color='black' />
    else if (checkinData.length === 0)
      return <Text>Chưa có</Text>
    else {
      const lastCheckin = checkinData[checkinData.length - 1].endtime
      return <Text>{lastCheckin.substring(11, 16)} | <TimeAgo time={lastCheckin} /></Text> //<Text><Moment fromNow date={checkinData[0].runtime}></Moment></Text>
    }
  }

  const renUptrail = (uptrailData) => {
    if (!uptrailData)
      return <ActivityIndicator size={10} color='black' />
    else if (uptrailData.length === 0)
      return <Text>Chưa có</Text>
    else {
      const lastUptrail = uptrailData[uptrailData.length - 1].runtime
      return <Text>{uptrailData.length} lần  | <TimeAgo time={lastUptrail} /></Text>
    }
  }


  const renAvatar = (avatar) => {
    if (!avatar)
      return EMPTYAVATAR 
    else return { uri: avatar }
  }

  
  const renderItem = ({ item, index })  => { 
    return <TouchableOpacity 
    key={item.staff_id}
    onPress={() => props.toStaffMode({
      staff_id:item.staff_id, 
      token: props.token, 
      fc_name: item.info.fc_name,
    })} >

    <View style={[styles.row, { padding: 10, borderBottomWidth: 1, borderRadius: 10, }]}>
      <View style={[styles.box, { flex: 0.35, borderRadius: 30, }]}>
        {/* {renAvatar(item.info.avatar)} */}
        <ImageBackground
          style={[styles.pic, { resizeMode: "cover" }]}
          imageStyle={{ borderRadius: 50 }}
          source={renAvatar(item.info.avatar)}>
          {renIcon(item.checkin)}
        </ImageBackground>
      </View>
      <View style={styles.box}>
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.info.fc_name} - {item.info.staff_id}
            </Text>
          </View>

          <View style={[styles.msgContainer, { marginTop: 5 }]}>
            <View style={[styles.row, { flex: 1 }]}>
              <View style={[styles.box, { flex: 0.3 }]}>
                <Text style={[styles.msgTxt,]}>
                checkin:
                </Text>
              </View>
              <View style={[styles.box, { flex: 0.8 }]}>
                <Text style={[styles.msgTxt,]}>{renCheckin(item.checkin)}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.msgContainer, { marginTop: 5 }]}>
            <View style={[styles.row, { flex: 1 }]}>
              <View style={[styles.box, { flex: 0.3 }]}>
                <Text style={[styles.msgTxt,]}>
                  Uptrail:
                </Text>
              </View>
              <View style={[styles.box, { flex: 0.8 }]}>
                <Text style={[styles.msgTxt,]}>{renUptrail(item.uptrail)}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.msgContainer, { marginTop: 5 }]}>
            <View style={[styles.row, { flex: 1 }]}>
              <View style={[styles.box, { flex: 0.3 }]}>
                <Text style={[styles.msgTxt,]}>{item.case} case</Text>
              </View>
              <View style={[styles.box, { flex: 0.4 }]}>
                <Text style={[styles.msgTxt,]}>{item.paidcase} paid</Text>
              </View>
              <View style={[styles.box, { flex: 0.4 }]}>
                <Text style={[styles.msgTxt,]}>{item.paidtodaycase}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.msgContainer, { marginTop: 5 }]}>
            <View style={[styles.row, { flex: 1 }]}>
            <View style={[styles.box, { flex: 0.3 }]}>
                <Text style={[styles.msgTxt,]}>{item.visited} đã đi</Text>
              </View>
              <View style={[styles.box, { flex: 0.4 }]}>
                <Text style={[styles.msgTxt,]}>{moneyFormat(item.paidamt)}</Text>
              </View>

              <View style={[styles.box, { flex: 0.4 }]}>
                <Text style={[styles.msgTxt,]}>{moneyFormat(item.todayamt)}</Text>
              </View>

            </View>
          </View>

          <View style={[styles.msgContainer, { marginTop: 1 }]}>
            <View style={[styles.row, { flex: 1 }]}>
              <View style={[styles.box, { flex: 0.8 }]}>
                <Text style={[styles.msgTxt,]}></Text>
              </View>
              <View style={styles.box}>
              </View>
            </View>
          </View>

        </View>
      </View>
    </View>

  </TouchableOpacity>
  }

  if (props.staff.staffs.length == 0)
    return (
      <View style={[masterStyles.container, { alignItems: 'center' }]}>
        <ActivityIndicator size={100} color={colors.primary} />
        <Text>Loading ... </Text>
      </View>
    )

  else return (
    <View style={styles.container} >
      <FlatList
        data={props.staff.staffs}
        horizontal={false}
        numColumns={1}
        renderItem={renderItem} />
    </View>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token.token.access,
    staff: state.staff,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    countManager: () => {
      dispatch({
        type: constAction.STAFF_CHECKIN_COUNT,
      })
    },
    pullManager: (config) => {
      dispatch({
        type: constAction.STAFF_CHECKIN_PULL,
        config
      })
    }, 
    toStaffMode : (token) => {
      dispatch({
        type: constAction.SET_STAFF_MODE,
        token
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',

  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  pic: {
    borderRadius: 30,
    width: 80,
    height: 80,
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: 'white',
    marginVertical: 5,
    flexBasis: '46%',
    marginHorizontal: 5,
    borderRadius: 10,
  },

  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#222',
    fontSize: 13,
    width: 190,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5 
  },
  msgTxt: {
    fontWeight: '400',
    color: colors.textcolor,
    fontSize: 11,
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerStaff);

