import React, { useState, useEffect, useRef } from 'react'
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Dimensions
} from 'react-native'
import { CircleTA } from './CircleProgress'
import { connect } from "react-redux";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper'
import { colors, styles as masterStyles } from '../styles'
import * as constAction from '../consts'

import { moneyFormat } from '../functions'

const { width, height } = Dimensions.get("window");
const AVATAR_WIDTH = width / 8
import { EMPTYAVATAR } from '../images'



function StaffDash(props) {
  const renAvatar = (avatar) => {
    if (!avatar)
      return EMPTYAVATAR
    else return { uri: avatar }
  }

  const miniMoneyFormat = (n) => {
    const money = (parseFloat(n, 10) / 1000000).toFixed(1).toString()
    return money
  }

  return (
    <View
      style={[styles.block, { flex: 1, marginBottom: 5 }]}
    >
      <View style={[styles.row, { borderBottomWidth: 0.2, borderBottomColor: colors.grey, borderRadius: 10, marginBottom: 10, paddingBottom: 5, paddingTop: 5 }]}>
        <View style={[styles.box, { minWidth: AVATAR_WIDTH, flex: 0.05, marginBottom: 5, marginTop: -5 }]}>
          <ImageBackground
            style={[styles.pic]}
            imageStyle={{ borderRadius: 90, resizeMode: "cover" }}
            source={renAvatar(props.token.active_infos.avatar)}>
          </ImageBackground>
        </View>
        <View style={[styles.box, { flex: 1, marginLeft: 10, marginBottom: 5, marginTop: -5 },]}>
          <Text style={[styles.nameTxt, { color: colors.grey }]}
            ellipsizeMode="tail">
            {props.token.active_staff}
          </Text>
          <Text style={[styles.nameTxt, { fontSize: 12 }]}
            ellipsizeMode="tail">
            {props.token.active_infos.fc_name}
          </Text>
        </View>
        <View style={[styles.box, { flex: 2, alignItems: 'center' }]}>
          <CircleTA />
        </View>
      </View>

      {/* ======================*/}

      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
        Tổng danh mục
      </Text>
      <View style={[styles.row]}>
        <View style={[styles.box, { padding: 3, flex: 0.8 }]}>
          <Text style={styles.index}>
            <FontAwesome name="file-text" size={12} color={colors.info} /> {props.totalCal.totalCase.case}
          </Text>
          <Text style={styles.label}>Tổng HĐ</Text>
        </View>

        <View style={[styles.box, { padding: 1, flex: 1.618 }]}>
          <Text style={styles.index, { fontSize: 10, fontWeight: 'bold', position: 'absolute', top: -5, left: 30, color: colors.success }}>
            + 0
          </Text>
          <Text style={styles.index}>
            <FontAwesome5 name="running" size={12} color={colors.info} /> {props.totalCal.followed.case}
          </Text>
          <Text style={styles.label}>Đã viếng thăm</Text>
        </View>

        <View style={[styles.box, { flex: 1.5 }]}>
          <Text style={{ fontSize: 10 }}>
            <FontAwesome name="check" size={10} color={colors.info} /> {(props.totalCal.followed.case * 100 / props.totalCal.totalCase.case).toFixed(0)}%
          </Text>
          <ProgressBar
            style={{ marginBottom: 0 }}
            progress={props.totalCal.followed.case / props.totalCal.totalCase.case}
            color={colors.info} />
          <Text style={styles.label}>Tỉ lệ viếng thăm</Text>
        </View>
      </View>

      {/* ======================*/}

      <View style={[styles.row]}>
        <View style={[styles.box, { padding: 3, flex: 0.8, paddingTop: 6 }]}>
          <Text style={styles.index, { fontSize: 10, fontWeight: 'bold', position: 'absolute', top: -5, left: 30, color: colors.success }}>
            + 4
          </Text>
          <Text style={styles.index}>
            <FontAwesome5 name="money-bill-wave" size={12} color={colors.info} /> {props.totalCal.paidMtd.case}
          </Text>
          <Text style={styles.label}>HĐ có số thu</Text>
        </View>

        <View style={[styles.box, { padding: 1, flex: 1.618, paddingTop: 6 }]}>
          <Text style={styles.index, { fontSize: 10, fontWeight: 'bold', position: 'absolute', top: -5, left: 60, color: colors.success }}>
            + {moneyFormat(props.totalCal.paidMtd.value)}
          </Text>
          <Text style={styles.index}>
            <FontAwesome name="dollar" size={12} color={colors.info} /> {moneyFormat(props.totalCal.paidMtd.value)}
          </Text>
          <Text style={styles.label}>Tổng số thu</Text>
        </View>

        <View style={[styles.box, { flex: 1.5 }]}>
          <Text style={{ fontSize: 10 }}>
            <FontAwesome name="check" size={10} color={colors.info} /> {(props.totalCal.paidMtd.value * 100 / props.totalCal.totalCase.value).toFixed(0)}%
          </Text>
          <ProgressBar
            style={{ marginBottom: 0 }}
            progress={props.totalCal.paidMtd.value / props.totalCal.totalCase.pos}
            color={colors.info} />
          <Text style={styles.label}>Tỉ lệ thu hồi nợ</Text>
        </View>
      </View>
      {/* ======================*/}

      <View style={[styles.row]}>
        <View style={[styles.box, { padding: 3, flex: 0.8 }]}>
          <Text style={styles.index}>
            <MaterialCommunityIcons name="calendar-clock" size={14} color={colors.info} /> 8
          </Text>
          <Text style={styles.label}>Lịch hẹn lại</Text>
        </View>

        <View style={[styles.box, { padding: 1, flex: 1.618 }]}>
          <Text style={styles.index}>
            <MaterialCommunityIcons name="calendar-remove" size={14} color={colors.danger} /> 8
          </Text>
          <Text style={styles.label}>Quá hạn lịch hẹn</Text>
        </View>

        <View style={[styles.box, { flex: 1.5 }]}>
          <Text style={{ fontSize: 10 }}>
            <FontAwesome name="check" size={10} color={colors.info} /> {(props.totalCal.paidMtd.value * 100 / props.totalCal.totalCase.value).toFixed(0)}%
          </Text>
          <ProgressBar
            style={{ marginBottom: 0 }}
            progress={0.4}
            color={colors.info} />
          <Text style={styles.label}>Tỉ lệ viếng thăm có số thu</Text>
        </View>
      </View>
    </View >
  )
}


function StaffTodo(props) {
  const renAvatar = (avatar) => {
    if (!avatar)
      return EMPTYAVATAR
    else return { uri: avatar }
  }

  const miniMoneyFormat = (n) => {
    const money = (parseFloat(n, 10) / 1000000).toFixed(1).toString()
    return money
  }

  return (
    <View
      style={[styles.block, { flex: 1 }]}
    >
      {/* ======================*/}
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
        Danh mục tự chọn
      </Text>
      <View style={[styles.row]}>
        <View style={[styles.box, { padding: 3, flex: 0.8 }]}>
          <Text style={styles.index}>
            <FontAwesome name="file-text" size={12} color={colors.info} /> {props.totalCal.totalCase.case}
          </Text>
          <Text style={styles.label}>Tổng HĐ</Text>
        </View>

        <View style={[styles.box, { padding: 1, flex: 1.618 }]}>
          <Text style={styles.index, { fontSize: 10, fontWeight: 'bold', position: 'absolute', top: -5, left: 30, color: colors.success }}>
            + 0
          </Text>
          <Text style={styles.index}>
            <FontAwesome5 name="running" size={12} color={colors.info} /> {props.totalCal.followed.case}
          </Text>
          <Text style={styles.label}>Đã viếng thăm</Text>
        </View>

        <View style={[styles.box, { flex: 1.5 }]}>
          <Text style={{ fontSize: 10 }}>
            <FontAwesome name="check" size={10} color={colors.info} /> {(props.totalCal.followed.case * 100 / props.totalCal.totalCase.case).toFixed(0)}%
          </Text>
          <ProgressBar
            style={{ marginBottom: 0 }}
            progress={props.totalCal.followed.case / props.totalCal.totalCase.case}
            color={colors.info} />
          <Text style={styles.label}>Tỉ lệ viếng thăm</Text>
        </View>
      </View>

      {/* ======================*/}

      <View style={[styles.row]}>
        <View style={[styles.box, { padding: 3, flex: 0.8, paddingTop: 6 }]}>
          <Text style={styles.index, { fontSize: 10, fontWeight: 'bold', position: 'absolute', top: -5, left: 30, color: colors.success }}>
            + 4
          </Text>
          <Text style={styles.index}>
            <FontAwesome5 name="money-bill-wave" size={12} color={colors.info} /> {props.totalCal.paidMtd.case}
          </Text>
          <Text style={styles.label}>HĐ có số thu</Text>
        </View>

        <View style={[styles.box, { padding: 1, flex: 1.618, paddingTop: 6 }]}>
          <Text style={styles.index, { fontSize: 10, fontWeight: 'bold', position: 'absolute', top: -5, left: 60, color: colors.success }}>
            + {moneyFormat(props.totalCal.paidMtd.value)}
          </Text>
          <Text style={styles.index}>
            <FontAwesome name="dollar" size={12} color={colors.info} /> {moneyFormat(props.totalCal.paidMtd.value)}
          </Text>
          <Text style={styles.label}>Tổng số thu</Text>
        </View>

        <View style={[styles.box, { flex: 1.5 }]}>
          <Text style={{ fontSize: 10 }}>
            <FontAwesome name="check" size={10} color={colors.info} /> {(props.totalCal.paidMtd.value * 100 / props.totalCal.totalCase.value).toFixed(0)}%
          </Text>
          <ProgressBar
            style={{ marginBottom: 0 }}
            progress={props.totalCal.paidMtd.value / props.totalCal.totalCase.pos}
            color={colors.info} />
          <Text style={styles.label}>Tỉ lệ thu hồi nợ</Text>
        </View>
      </View>
      {/* ======================*/}

      <View style={[styles.row]}>
        <View style={[styles.box, { padding: 3, flex: 0.8 }]}>
          <Text style={styles.index}>
            <MaterialCommunityIcons name="calendar-clock" size={14} color={colors.info} /> 8
          </Text>
          <Text style={styles.label}>Lịch hẹn lại</Text>
        </View>

        <View style={[styles.box, { padding: 1, flex: 1.618 }]}>
          <Text style={styles.index}>
            <MaterialCommunityIcons name="calendar-remove" size={14} color={colors.danger} /> 8
          </Text>
          <Text style={styles.label}>Quá hạn lịch hẹn</Text>
        </View>

        <View style={[styles.box, { flex: 1.5 }]}>
          <Text style={{ fontSize: 10 }}>
            <FontAwesome name="check" size={10} color={colors.info} /> {(props.totalCal.paidMtd.value * 100 / props.totalCal.totalCase.value).toFixed(0)}%
          </Text>
          <ProgressBar
            style={{ marginBottom: 0 }}
            progress={0.4}
            color={colors.info} />
          <Text style={styles.label}>Tỉ lệ viếng thăm có số thu</Text>
        </View>
      </View>
    </View >
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    totalCal: state.data.totalCal,
    token: state.token,
  };
};


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
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  row: {
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingLeft: 5,
  },
  box: {
    justifyContent: 'center',
    flex: 1
  },
  pic: {
    borderRadius: 30,
    width: 50,
    height: 50,
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
    fontSize: 9,
    opacity: 0.5,

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
    fontSize: 16,
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

const StaffDash_com = connect(mapStateToProps, null)(StaffDash)
const StaffTodo_com = connect(mapStateToProps, null)(StaffTodo)

export {
  StaffDash_com,
  StaffTodo_com
}

