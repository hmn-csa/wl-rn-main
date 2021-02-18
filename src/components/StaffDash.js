import React, { useState, useEffect, useRef } from 'react'
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Dimensions
} from 'react-native'


import { connect } from "react-redux";
import { FontAwesome } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper'
import { colors, styles as masterStyles } from '../styles'
import * as constAction from '../consts'

import { moneyFormat } from '../functions'

const { width, height } = Dimensions.get("window");
const AVATAR_WIDTH = width / 9
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
    <TouchableOpacity
      style={[styles.block, { flex: 1, marginBottom: 5 }]}
    >

      <View style={[styles.row, { borderBottomWidth: 0.2, borderRadius: 10, marginBottom: 10 }]}>
        <View style={[styles.box, { minWidth: AVATAR_WIDTH, margin: 5, flex: 0.05, }]}>
          <ImageBackground
            style={[styles.pic]}
            imageStyle={{ borderRadius: 90, resizeMode: "cover" }}
            source={renAvatar(props.token.active_infos.avatar)}>
          </ImageBackground>
        </View>
        <View style={[styles.box, { flex: 1, },]}>
          <Text style={[styles.nameTxt,]}
            ellipsizeMode="tail">
            {props.token.active_staff}
          </Text>
          <Text style={[styles.nameTxt, { fontSize: 12 }]}
            ellipsizeMode="tail">
            {props.token.active_infos.fc_name}
          </Text>
        </View>

        <View style={[styles.box, { flex: 2 }]}>
        </View>
      </View>

      {/* ======================*/}


      <View style={[styles.row]}>
        <View style={[styles.box, { padding: 3, flex: 0.618 }]}>
          <Text style={styles.index}>
            <FontAwesome name="file-text" size={12} color={colors.yellow} /> {props.totalCal.totalCase.case}
          </Text>
          <Text style={styles.label}>Tổng HĐ</Text>

        </View>

        <View style={[styles.box, { padding: 1, flex: 1 }]}>
          <Text style={styles.index}>
            <FontAwesome name="dollar" size={12} color={colors.yellow} /> {miniMoneyFormat(props.totalCal.totalCase.value)} tr
          </Text>
          <Text style={styles.label}>Dư nợ</Text>
        </View>

        <View style={[styles.box, { flex: 1.618 }]}>
          <Text style={{ fontSize: 10 }}>
            <FontAwesome name="check" size={10} color={colors.yellow} /> {props.totalCal.followed.case} case - {(props.totalCal.followed.case * 100 / props.totalCal.totalCase.case).toFixed(0)}%
          </Text>
          <ProgressBar
            style={{ marginBottom: 0 }}
            progress={props.totalCal.followed.case / props.totalCal.totalCase.case}
            color={colors.yellow} />
          <Text style={styles.label}>Đã viếng thăm</Text>
        </View>
      </View>

      <View style={[styles.row]}>
        <View style={[styles.box, { padding: 3, flex: 0.618 }]}>
          <Text style={styles.index}>
            <FontAwesome name="file-text" size={12} color={colors.success} /> {props.totalCal.paidMtd.case}
          </Text>
          <Text style={styles.label}>HĐ thu</Text>

        </View>

        <View style={[styles.box, { padding: 1, flex: 1 }]}>
          <Text style={styles.index}>
            <FontAwesome name="dollar" size={12} color={colors.success} /> {moneyFormat(props.totalCal.paidMtd.value)}
          </Text>
          <Text style={styles.label}>Số thu</Text>
        </View>

        <View style={[styles.box, { flex: 1.618 }]}>
          <Text style={{ fontSize: 10 }}>
            <FontAwesome name="check" size={10} color={colors.success} /> {(props.totalCal.paidMtd.value * 100 / props.totalCal.totalCase.value).toFixed(0)}% ROR
          </Text>
          <ProgressBar
            style={{ marginBottom: 0 }}
            progress={props.totalCal.paidMtd.value / props.totalCal.totalCase.value}
            color={colors.success} />
          <Text style={styles.label}>Số thu</Text>
        </View>

      </View>
    </TouchableOpacity>
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



export default connect(mapStateToProps, null)(StaffDash);

