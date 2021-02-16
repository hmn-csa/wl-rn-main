import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet, Text, View, FlatList,
  TouchableOpacity, Alert, Image, ActivityIndicator,
  ImageBackground, Animated, Dimensions, ViewBase
} from 'react-native';
import { connect } from "react-redux";
import { FontAwesome } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper'
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
    }, 1 * 60 * 1000)
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

  const miniMoneyFormat = (n) => {
    const money = (parseFloat(n, 10) / 1000000).toFixed(1).toString()
    return money
  }
  // =========== render ============== //
  const renIcon = (checkinData) => {
    if (!checkinData || checkinData.length == 0)
      return <Ionicons name='ios-close-circle' style={[{ color: colors.secondary, fontSize: 16 }]} />
    else
      return <Ionicons name='ios-checkmark-circle' style={[{ color: colors.success, fontSize: 16 }]} />
  }

  const renCheckin = (checkinData) => {
    if (!checkinData)
      return <ActivityIndicator size={10} color='black' />
    else if (checkinData.length === 0)
      return <Text style={{ color: colors.secondary, fontSize: 10 }}>Chưa Checkin</Text>
    else {
      const lastCheckin = checkinData[checkinData.length - 1].endtime
      return <Text style={{ color: colors.success, fontSize: 11 }}>Checkin: {lastCheckin.substring(11, 16)} | <TimeAgo time={lastCheckin} /></Text> //<Text><Moment fromNow date={checkinData[0].runtime}></Moment></Text>
    }
  }

  const renUptrail = (uptrailData) => {
    if (!uptrailData)
      return <ActivityIndicator size={10} color='black' />
    else if (uptrailData.length === 0)
      return <Text style={{ color: colors.secondary, fontSize: 10 }}>Chưa Uptrail</Text>
    else {
      const lastUptrail = uptrailData[uptrailData.length - 1].runtime
      return <Text style={{ color: colors.success, fontSize: 11 }}>Uptrail: {uptrailData.length} lần  | <TimeAgo time={lastUptrail} /></Text>
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
      style={[styles.block, { flex: 1, marginBottom: 5 }]}
      onPress={() => props.toStaffMode({
        staff_id: item.staff_id,
        token: props.token,
        fc_name: item.info.fc_name,
        avatar: item.info.avatar,
      })
      } >

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
          <Text style={[styles.msgTxt,]}>{renCheckin(item.checkin)}</Text>
          <Text style={[styles.msgTxt,]}>{renUptrail(item.uptrail)}</Text>
        </View>
      </View>


      {/* ======================*/}
      <View style={[styles.row]}>
        <View style={[styles.box, { padding: 1, margin: 10 }]}>
          <Text style={{ marginBottom: 10 }}>
            Tổng: <FontAwesome name="file-text" size={12} color={colors.yellow} /> {item.case} HĐ
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Đã đi: <FontAwesome name="check" size={12} color={colors.info} /> {item.visited}
          </Text>
          <Text style={{ marginBottom: 0, }}>
            Paid: <FontAwesome name="dollar" size={12} color={colors.success} /> {item.paidcase}
          </Text>
        </View>

        <View style={[styles.box, { padding: 1, margin: 10 }]}>
          <Text style={{ marginBottom: 10 }}>
            Pos: <FontAwesome name="dollar" size={12} color={colors.yellow} /> {miniMoneyFormat(item.pos)} tr
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Số thu: <FontAwesome name="dollar" size={12} color={colors.info} /> {miniMoneyFormat(item.paidamt)} tr
          </Text>
          <Text style={{ marginBottom: 0, }}>
            Ngày: <FontAwesome name="dollar" size={12} color={colors.success} /> {miniMoneyFormat(item.todayamt)} tr
          </Text>
        </View>


        <View style={[styles.box, { padding: 1, margin: 10, flex: 0.8 }]}>
          <Text style={{ fontSize: 10 }}>
            <FontAwesome name="check" size={10} color={colors.yellow} /> {(item.visited * 100 / item.case).toFixed(1)}% visited
          </Text>

          <ProgressBar
            style={{ marginBottom: 10 }}
            progress={item.visited / item.case}
            color={colors.yellow} />

          <Text style={{ fontSize: 10 }}>
            <FontAwesome name="check" size={10} color={colors.info} /> {(item.paidamt * 100 / item.pos).toFixed(1)}% pos
          </Text>
          <ProgressBar
            style={{ marginBottom: 10 }}
            progress={item.paidamt / item.pos}
            color={colors.info} />

          <Text style={{ fontSize: 10 }}>
            <FontAwesome name="check" size={10} color={colors.success} /> {(item.paidcase * 100 / item.case).toFixed(1)}% case
          </Text>
          <ProgressBar
            style={{ marginBottom: 0 }}
            progress={item.paidcase / item.case}
            color={colors.success} />

        </View>
      </View>
      {/* ======================*/}

    </TouchableOpacity >
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
      <View style={[styles.block, {
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.grey,
      }]}>
        <View style={[styles.row, {
          marginBottom: 5,
          paddingBottom: 0,
          marginTop: 0,
          paddingTop: 0
        }]}>
          <View style={[styles.card, styles.box, { marginBottom: 0, paddingBottom: 0 }]}>

            <View style={[styles.cardHeader, { marginBottom: 10, }]}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Danh mục</Text>
            </View>

            <View style={{ flexDirection: 'row', padding: 5 }}>
              <Text style={{ width: '50%' }}>
                Tổng: <FontAwesome name="file-text" size={15} color={colors.yellow} /> {props.staff.dash.totalCase.case} HĐ
              </Text>
              <Text>
                <FontAwesome name="dollar" size={15} color={colors.yellow} /> {moneyFormat(props.staff.dash.totalCase.pos)} dư nợ gốc
              </Text>
            </View>

            <View style={{ flexDirection: 'row', padding: 5 }}>

              <Text style={{ width: '50%' }}>
                Đã đi: <FontAwesome name="check" size={15} color={colors.yellow} /> {props.staff.dash.visited.case} HĐ
              </Text>
              <Text>
                <FontAwesome name="check" size={15} color={colors.yellow} /> {(props.staff.dash.visited.case * 100 / props.staff.dash.totalCase.case).toFixed(1)}% đã viếng thăm
              </Text>
            </View>

            <View style={{ paddingLeft: '50%', paddingRight: 10, paddingBottom: 0 }}>
              <ProgressBar
                progress={props.staff.dash.visited.case / props.staff.dash.totalCase.case}
                color={colors.yellow} />
            </View>
          </View>
        </View>

        <View style={[styles.row, {
          marginTop: 0,
          paddingTop: 0,
          marginBottom: 0,
          paddingBottom: 0,
        }]}>
          <View style={[styles.card, styles.box, {
            marginTop: 0, paddingTop: 0, marginBottom: 0,
            paddingBottom: 0,
          }]}>
            <View style={[styles.cardHeader, { marginBottom: 10, }]}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Số thu</Text>
            </View>

            <View style={{ flexDirection: 'row', padding: 5 }}>
              <Text style={{ width: '50%' }}>
                Ngày: <FontAwesome name="file-text" size={15} color={colors.info} /> {props.staff.dash.paidToday.case} HĐ
              </Text>
              <Text>
                <FontAwesome name="dollar" size={15} color={colors.success} /> {moneyFormat(props.staff.dash.paidToday.value)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', padding: 5 }}>

              <Text style={{ width: '50%' }}>
                Tổng: <FontAwesome name="check" size={15} color={colors.info} /> {props.staff.dash.paidMtd.case} HĐ
              </Text>
              <Text>
                <FontAwesome name="dollar" size={15} color={colors.success} /> {moneyFormat(props.staff.dash.paidMtd.value)}
              </Text>

            </View>

            <View style={{ flexDirection: 'row' }}>

              <View style={[styles.card, {
                paddingTop: 0,
                paddingBottom: 0,
              }]}>
                <Text>
                  <FontAwesome name="check" size={15} color={colors.info} /> {(props.staff.dash.paidMtd.value * 100 / props.staff.dash.totalCase.pos).toFixed(1)}% pos
                </Text>
                <ProgressBar
                  progress={props.staff.dash.paidMtd.case / props.staff.dash.totalCase.case}
                  color={colors.info}
                />
              </View>
              <View style={[styles.card, {
                paddingTop: 0,
                paddingBottom: 0,
              }]}>
                <Text>
                  <FontAwesome name="check" size={15} color={colors.success} /> {(props.staff.dash.paidMtd.case * 100 / props.staff.dash.totalCase.case).toFixed(1)}% case
                </Text>
                <ProgressBar
                  progress={props.staff.dash.paidMtd.case / props.staff.dash.totalCase.case}
                  color={colors.success}
                />
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
    width: '95%',
    borderBottomWidth: 0.2,
    borderBottomColor: colors.grey,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  row: {
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

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    marginBottom: 5
  },

  card: {
    justifyContent: 'center',
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 5,
    flexBasis: '46%',
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 5
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

