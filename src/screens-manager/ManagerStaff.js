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
import Loader from "../components/elements/Loader";
const { width, height } = Dimensions.get("window");

const AVATAR_WIDTH = width / 9


const miniMoneyFormat = (n) => {
  const money = (parseFloat(n, 10) / 1000000).toFixed(1).toString()
  return money
}



function ManagerStaff(props) {


  function StaffDash({ item }) {
    const renAvatar = (avatar) => {
      if (!avatar)
        return EMPTYAVATAR
      else return { uri: avatar }
    }

    const renIcon = (checkinData) => {
      if (!checkinData || checkinData.length == 0)
        return <Ionicons name='ios-close-circle' style={[{ color: colors.secondary, fontSize: 16 }]} />
      else
        return <Ionicons name='ios-checkmark-circle' style={[{ color: colors.main, fontSize: 16 }]} />
    }

    const renCheckin = (checkinData) => {
      if (!checkinData)
        return <ActivityIndicator size={10} color='black' />
      else if (checkinData.length === 0)
        return <Text style={{ color: colors.secondary, fontSize: 10 }}>Chưa Checkin</Text>
      else {
        const lastCheckin = checkinData[checkinData.length - 1].endtime
        return <Text style={{ color: colors.main, fontSize: 11 }}>Checkin: {lastCheckin.substring(11, 16)} | <TimeAgo time={lastCheckin} /></Text> //<Text><Moment fromNow date={checkinData[0].runtime}></Moment></Text>
      }
    }

    const renUptrail = (uptrailData) => {
      if (!uptrailData)
        return <ActivityIndicator size={10} color='black' />
      else if (uptrailData.length === 0)
        return <Text style={{ color: colors.secondary, fontSize: 10 }}>Chưa Uptrail</Text>
      else {
        const lastUptrail = uptrailData[uptrailData.length - 1].runtime
        return <Text style={{ color: colors.main, fontSize: 11 }}>Uptrail: {uptrailData.length} lần  | <TimeAgo time={lastUptrail} /></Text>
      }
    }


    return (
      <TouchableOpacity
        key={item.staff_id}
        style={[styles.block, {
          flex: 1,
          marginBottom: 5,
        }]}
        onPress={() => props.toStaffMode({
          staff_id: item.staff_id,
          token: props.token,
          fc_name: item.info.fc_name,
          avatar: item.info.avatar,
        })
        } >

        <View style={[styles.row, {
          borderBottomWidth: 0.2,
          borderRadius: 10,
          borderColor: !item.checkin || item.checkin.length == 0 ? colors.secondary : colors.main
        }]}>
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


        <View style={[styles.row]}>
          <TouchableOpacity style={[styles.box, { flex: 0.618 }]}
          >
            <Text style={[styles.indexSmall, { color: 'black' }]}>
              {miniMoneyFormat(item.pos)} tr
          </Text>
            <Text style={styles.index}>
              {item.case}
            </Text>
            <Text style={styles.label}>Tổng HĐ</Text>
          </TouchableOpacity>

          <View style={[styles.box, { flex: 0.618 }]}>
            <Text style={styles.indexSmall}>
              + {!item.uptrail ? 0 : item.uptrail.length}
            </Text>
            <TouchableOpacity >
              <Text style={styles.index}>
                {item.visited}
              </Text>
              <Text style={styles.label}>Đã viếng thăm</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.box, { flex: 1, paddingTop: 20 }]}>
            <Text style={[styles.indexBar]}>
              {(item.visited * 100 / item.case).toFixed(1)}%
          </Text>
            <ProgressBar
              style={{ marginBottom: 0 }}
              progress={item.visited / item.case}
              color={colors.main} />
            <Text style={styles.label}>Tỉ lệ viếng thăm</Text>
          </View>
        </View>

        {/* ======================*/}

        <View style={[styles.row]}>
          <View style={[styles.box, { flex: 0.618, paddingTop: 6 }]}>
            <Text style={styles.indexSmall}>
              + {item.paidtodaycase} HĐ
          </Text>
            <TouchableOpacity>
              <Text style={styles.index}>
                {item.paidcase}
              </Text>
              <Text style={styles.label}>HĐ có số thu</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.box, { flex: 0.618, paddingTop: 6 }]}>
            <Text style={[styles.indexSmall,]}>
              + {miniMoneyFormat(item.todayamt)} tr
          </Text>
            <TouchableOpacity >
              <Text style={[styles.index, { color: colors.main, fontWeight: 'bold' }]}>
                {miniMoneyFormat(item.paidamt)} tr
            </Text>
              <Text style={[styles.label]}>Tổng số thu</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.box, { flex: 1, paddingTop: 20 }]}>
            <Text style={[styles.indexBar]}>
              {(item.paidcase * 100 / item.case).toFixed(1)}%
          </Text>
            <ProgressBar
              style={{ marginBottom: 0 }}
              progress={item.paidamt / item.pos}
              color={colors.main} />
            <Text style={styles.label}>Tỉ lệ thu hồi nợ</Text>
          </View>
        </View>
        {/* ======================*/}


      </TouchableOpacity>
    )
  }
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

  const renderPort = () => {

    return (
      <View style={[{ backgroundColor: 'white', borderRadius: 15, marginBottom: 5 }]}>
        <TouchableOpacity
          style={[styles.block, { flex: 1, padding: 10 }]}
        >
          <View style={[styles.cardHeader,]}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.main }}>TỔNG DANH MỤC:</Text>
          </View>
          <View style={[styles.row]}>
            <TouchableOpacity style={[styles.box, { flex: 0.618 }]}
            >
              <Text style={[styles.indexSmall, { color: 'black' }]}>
                {miniMoneyFormat(props.staff.dash.totalCase.pos)} tr
              </Text>
              <Text style={styles.index}>
                {props.staff.dash.totalCase.case}
              </Text>
              <Text style={styles.label}>Tổng HĐ</Text>
            </TouchableOpacity>

            <View style={[styles.box, { flex: 0.618 }]}>
              <Text style={styles.indexSmall}>
              </Text>
              <TouchableOpacity >
                <Text style={styles.index}>
                  {props.staff.dash.visited.case}
                </Text>
                <Text style={styles.label}>Đã viếng thăm</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.box, { flex: 1, paddingTop: 20 }]}>
              <Text style={[styles.indexBar]}>
                {(props.staff.dash.visited.case * 100 / props.staff.dash.totalCase.case).toFixed(1)}%
              </Text>
              <ProgressBar
                style={{ marginBottom: 0 }}
                progress={props.staff.dash.visited.case / props.staff.dash.totalCase.case}
                color={colors.main} />
              <Text style={styles.label}>Tỉ lệ viếng thăm</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.block, { flex: 1, padding: 10 }]}
        >
          <View style={[styles.cardHeader,]}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.main }}>TỔNG SỐ THU:</Text>
          </View>
          <View style={[styles.row]}>
            <TouchableOpacity style={[styles.box, { flex: 0.618 }]}
            >
              <Text style={styles.indexSmall}>
                + {props.staff.dash.paidToday.value} HĐ
              </Text>
              <Text style={styles.index}>
                {props.staff.dash.paidMtd.case}
              </Text>
              <Text style={styles.label}>Tổng HĐ</Text>
            </TouchableOpacity>

            <View style={[styles.box, { flex: 0.618 }]}>
              <Text style={styles.indexSmall}>
                + {miniMoneyFormat(props.staff.dash.paidToday.value)} tr
              </Text>
              <TouchableOpacity >
                <Text style={styles.index}>
                  {miniMoneyFormat(props.staff.dash.paidMtd.value)} tr
                </Text>
                <Text style={styles.label}>Tổng số thu</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.box, { flex: 1, paddingTop: 20 }]}>
              <Text style={[styles.indexBar]}>
                {(props.staff.dash.paidMtd.value * 100 / props.staff.dash.totalCase.pos).toFixed(1)}%
              </Text>
              <ProgressBar
                style={{ marginBottom: 0 }}
                progress={props.staff.dash.paidMtd.value / props.staff.dash.totalCase.pos}
                color={colors.main} />
              <Text style={styles.label}>Tỉ lệ thu hổi nợ</Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>
    )
  }

  if (props.staff.staffs.length == 0)
    return (
      <Loader />
    )

  else return (
    <ScrollView style={[styles.container,]} >

      {renderPort()}

      <FlatList
        data={props.staff.staffs}
        horizontal={false}
        numColumns={1}
        renderItem={StaffDash}
      />

    </ScrollView>
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
    width: '98%',
    borderBottomWidth: 0.2,
    borderBottomColor: colors.lightgray,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
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
    fontSize: 16,
  },
  indexSmall: {
    fontWeight: '600',
    fontSize: 12,
    color: colors.main,
    left: 20,
  },
  indexBar: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.main,
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
  },

  card: {
    justifyContent: 'center',
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

