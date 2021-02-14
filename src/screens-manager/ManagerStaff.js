import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet, Text, View, FlatList,
  TouchableOpacity, Alert, Image, ActivityIndicator,
  ImageBackground, Animated, Dimensions
} from 'react-native';
import { connect } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimeAgo from 'react-native-timeago'

import { colors, styles as masterStyles } from '../styles'
import * as constAction from '../consts'
import { moneyFormat } from '../functions'
import { EMPTYAVATAR } from '../images'
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window");


const AVATAR_WIDTH = width / 9


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
      return <Ionicons name='ios-close-circle' style={[{ color: colors.secondary, fontSize: 16 }]} />
    else
      return <Ionicons name='ios-checkmark-circle' style={[{ color: colors.green, fontSize: 16 }]} />
  }

  const renCheckin = (checkinData) => {
    if (!checkinData)
      return <ActivityIndicator size={10} color='black' />
    else if (checkinData.length === 0)
      return <Text style={{ color: colors.secondary, fontSize: 10 }}>Chưa Checkin</Text>
    else {
      const lastCheckin = checkinData[checkinData.length - 1].endtime
      return <Text style={{ color: colors.textcolor, fontSize: 11 }}>Checkin: {lastCheckin.substring(11, 16)} | <TimeAgo time={lastCheckin} /></Text> //<Text><Moment fromNow date={checkinData[0].runtime}></Moment></Text>
    }
  }

  const renUptrail = (uptrailData) => {
    if (!uptrailData)
      return <ActivityIndicator size={10} color='black' />
    else if (uptrailData.length === 0)
      return <Text style={{ color: colors.secondary, fontSize: 10 }}>Chưa Uptrail</Text>
    else {
      const lastUptrail = uptrailData[uptrailData.length - 1].runtime
      return <Text style={{ color: colors.textcolor, fontSize: 11 }}>Uptrail: {uptrailData.length} lần  | <TimeAgo time={lastUptrail} /></Text>
    }
  }


  const renAvatar = (avatar) => {
    if (!avatar)
      return EMPTYAVATAR
    else return { uri: avatar }
  }




  const renderItem = ({ item, index }) => {
    return <TouchableOpacity
      key={item.staff_id}
      style={[styles.block, { flex: 1, }]}
      onPress={() => props.toStaffMode({
        staff_id: item.staff_id,
        token: props.token,
        fc_name: item.info.fc_name,
        avatar: item.info.avatar,
      })} >

      <View style={[styles.row, { borderBottomWidth: 0.2, borderRadius: 10 }]}>
        <View style={[styles.box, { minWidth: AVATAR_WIDTH, margin: 5, flex: 0.05, }]}>
          <ImageBackground
            style={[styles.pic]}
            imageStyle={{ borderRadius: 90, resizeMode: "cover" }}
            source={renAvatar(item.info.avatar)}>
            {renIcon(item.checkin)}
          </ImageBackground>
        </View>
        <View style={[styles.box, { flex: 1, },]}>
          <Text style={[styles.nameTxt,]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.info.staff_id}
          </Text>
          <Text style={[styles.nameTxt, { fontSize: 10.5 }]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.info.fc_name}
          </Text>
        </View>

        <View style={[styles.box, { flex: 2 }]}>
          <View style={[styles.row]}>
            <Text style={[styles.msgTxt,]}>{renCheckin(item.checkin)}</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.msgTxt,]}>{renUptrail(item.uptrail)}</Text>
          </View>

        </View>
      </View>

      {/* ============================ */}

      <View style={[styles.row, { padding: 2, borderRadius: 10, }]}>
        <View style={styles.box}>

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

        <View style={[styles.box, { flex: 0.3 }]}>
        </View>
      </View>

    </TouchableOpacity>
  }

  // ========= render =========== //

  if (props.staff.staffs.length == 0)
    return (
      <View style={[masterStyles.container, { alignItems: 'center' }]}>
        <ActivityIndicator size={100} color={colors.primary} />
        <Text>Loading ... </Text>
      </View>
    )

  else return (
    <View style={[styles.container,]}>

      <View style={[styles.block, { marginTop: 50, }]}>

        <View style={[styles.row]}>
          <View style={[styles.box]}>

            <View style={styles.row}>
              <View style={[styles.box]}>
                <Text style={styles.label}>Thông tin danh mục:</Text>
              </View>
            </View>

            <View style={[styles.row]}>
              <View style={[styles.box, { flex: 0.618, }]}>
                <View style={styles.row}>
                  <View style={[styles.box, { flex: 0.618, }]}>
                    <Text style={styles.indexLabel}>Tổng HĐ: </Text>
                  </View>
                  <View style={[styles.box]}>
                    <Text style={styles.index}>{props.staff.dash.totalCase.case}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.box]}>
                <View style={styles.row}>
                  <View style={[styles.box, { flex: 0.618, }]}>
                    <Text style={styles.indexLabel}>Tổng Pos: </Text>
                  </View>
                  <View style={[styles.box]}>
                    <Text style={styles.index}>{moneyFormat(props.staff.dash.totalCase.pos)}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.row]}>
              <View style={[styles.box, { flex: 0.618, }]}>
                <View style={styles.row}>
                  <View style={[styles.box, { flex: 0.618, }]}>
                    <Text style={styles.indexLabel}>Visited: </Text>
                  </View>
                  <View style={[styles.box]}>
                    <Text style={styles.index}>{props.staff.dash.visited.case}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.box]}>
                <View style={styles.row}>
                  <View style={[styles.box, { flex: 0.618, }]}>
                    <Text style={styles.indexLabel}>% Visited:</Text>
                  </View>
                  <View style={[styles.box]}>
                    <Text style={styles.index}>{(props.staff.dash.visited.case * 100 / props.staff.dash.totalCase.case).toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            </View>

          </View>
        </View>


        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <View style={styles.row}>
              <View style={[styles.box]}>
                <Text style={styles.label}>Thông tin thanh toán:</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.box, { flex: 0.618, }]}>
                <Text style={styles.indexLabel}>Tổng Thu: </Text>
              </View>
              <View style={[styles.box]}>
                <Text style={styles.index}>{props.staff.dash.paidMtd.case} hđ - <Text style={styles.indexSmall}>{moneyFormat(props.staff.dash.paidMtd.value)} vnđ</Text>
                </Text>
              </View>

            </View>

            <View style={styles.row}>
              <View style={[styles.box, { flex: 0.618, }]}>
                <Text style={styles.indexLabel}>Thu trong ngày: </Text>
              </View>
              <View style={[styles.box]}>
                <Text style={styles.index}>{props.staff.dash.paidToday.case} hđ - <Text style={styles.indexSmall}>{moneyFormat(props.staff.dash.paidToday.value)} vnđ</Text>
                </Text>
              </View>

            </View>
          </View>

        </View>



      </View>

      <ScrollView style={[styles.container,]}>
        <FlatList
          data={props.staff.staffs}
          horizontal={false}
          numColumns={1}
          renderItem={renderItem}
        />


      </ScrollView>
    </View >
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
    toStaffMode: (token) => {
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
  block: {
    borderBottomWidth: 0.2,
    borderBottomColor: colors.grey,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 3,
    margin: 2,
  },
  row: {
    width: '95%',
    marginVertical: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    justifyContent: 'center',
    flex: 1
  },
  pic: {
    borderRadius: 30,
    width: AVATAR_WIDTH,
    height: width / 10,
  },
  index: {
    fontWeight: '600',
    fontSize: 14,
  },
  indexSmall: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.textcolor,
  },
  indexLabel: {
    fontSize: 10
  },
  label: {
    fontSize: 10,
    opacity: 0.5
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
    height: 150,
    padding: 2
  },

  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameTxt: {
    fontWeight: '600',
    fontSize: 13,
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
    fontSize: 11,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerStaff);

