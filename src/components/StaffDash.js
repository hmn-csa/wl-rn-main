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
import { useNavigation } from '@react-navigation/native';
import { moneyFormat } from '../functions'

const { width, height } = Dimensions.get("window");
const AVATAR_WIDTH = width / 8
import { EMPTYAVATAR } from '../images'

function StaffHeader(props) {
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
    <View style={[styles.row, { borderBottomWidth: 0.2, borderBottomColor: '#CCC', paddingTop: 20, paddingBottom: 15, backgroundColor: 'white', paddingLeft: 20 }]}>
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
  )
}

function StaffDash(props) {
  const renAvatar = (avatar) => {
    if (!avatar)
      return EMPTYAVATAR
    else return { uri: avatar }
  }
  const navigation = useNavigation();
  const handleShow = (list, title) => {
    navigation.navigate('Portfolio', { name: title })
    props.updateShowlist(list)
  }
  const miniMoneyFormat = (n) => {
    const money = (parseFloat(n, 10) / 1000000).toFixed(1).toString()
    return money
  }

  return (
    <View
      style={[styles.block, { flex: 1, justifyContent: 'space-between' }]}
    >
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
        Tổng danh mục
      </Text>
      <View style={[styles.row]}>
        <TouchableOpacity style={[styles.box, { padding: 3, flex: 0.8 }]}
          onPress={() => handleShow(props.totalCal.totalCase.case, 'Tổng HD')}
        >
          <Text style={styles.index}>
            {props.totalCal.totalCase.case}
          </Text>
          <Text style={styles.label}>Tổng HĐ</Text>
        </TouchableOpacity>

        <View style={[styles.box, { padding: 1, flex: 1.618 }]}>
          <Text style={styles.indexSmall}>
            + 0
          </Text>
          <TouchableOpacity onPress={() => handleShow(props.totalCal.followed.case, 'HD đã viếng thăm')}>
            <Text style={styles.index}>
              {props.totalCal.followed.case}
            </Text>
            <Text style={styles.label}>Đã viếng thăm</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box, { flex: 1.2 }]}>
          <Text style={{ fontSize: 12 }}>
            {(props.totalCal.followed.case * 100 / props.totalCal.totalCase.case).toFixed(0)}%
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
          <Text style={styles.indexSmall}>
            + 4
          </Text>
          <TouchableOpacity onPress={() => handleShow(props.totalCal.paidMtd.case, 'HD có số thu')}>
            <Text style={styles.index}>
              {props.totalCal.paidMtd.case}
            </Text>
            <Text style={styles.label}>HĐ có số thu</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box, { flex: 1.618, paddingTop: 6 }]}>
          <Text style={[styles.indexSmall, { left: 60 }]}>
            + {moneyFormat(props.totalCal.paidMtd.value)}
          </Text>
          <TouchableOpacity onPress={() => handleShow(props.totalCal.paidMtd.case, 'HD có số thu')}>
            <Text style={[styles.index, { color: colors.info, fontWeight: 'bold' }]}>
              {moneyFormat(props.totalCal.paidMtd.value)}
            </Text>
            <Text style={[styles.label]}>Tổng số thu</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box, { flex: 1.2 }]}>
          <Text style={{ fontSize: 12 }}>
            {(props.totalCal.paidMtd.value * 100 / props.totalCal.totalCase.value).toFixed(0)}%
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
            8
          </Text>
          <Text style={styles.label}>Lịch hẹn lại</Text>
        </View>

        <View style={[styles.box, { flex: 1.618 }]}>
          <Text style={[styles.index, { color: colors.danger }]}>
            8
          </Text>
          <Text style={[styles.label, { color: colors.danger }]}>Quá hạn lịch hẹn</Text>
        </View>

        <View style={[styles.box, { flex: 1.2 }]}>
          <Text style={{ fontSize: 14 }}>
            {(props.totalCal.paidMtd.value * 100 / props.totalCal.totalCase.value).toFixed(0)}%
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
      style={[styles.block, { flex: 1, justifyContent: 'space-between' }]}
    >
      {/* ======================*/}
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
        Danh mục tự chọn
      </Text>
      <View style={[styles.row]}>
        <TouchableOpacity onPress={() => handleShow(props.todoCal.TotalCase.case, 'Danh mục tự chọn')} style={[styles.box, { padding: 3, flex: 0.8 }]}>
          <Text style={styles.index}>
            {props.totalCal.totalCase.case}
          </Text>
          <Text style={styles.label}>Tổng HĐ</Text>
        </TouchableOpacity>

        <View style={[styles.box, { padding: 1, flex: 1.618 }]}>
          <Text style={styles.indexSmall}>
            + 0
          </Text>
          <Text style={styles.index}>
            {props.totalCal.followed.case}
          </Text>
          <Text style={styles.label}>Đã viếng thăm</Text>
        </View>

        <View style={[styles.box, { flex: 1.2 }]}>
          <Text style={{ fontSize: 12 }}>
            {(props.totalCal.followed.case * 100 / props.totalCal.totalCase.case).toFixed(0)}%
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
          <Text style={styles.indexSmall}>
            + 4
          </Text>
          <Text style={styles.index}>
            {props.totalCal.paidMtd.case}
          </Text>
          <Text style={styles.label}>HĐ có số thu</Text>
        </View>

        <View style={[styles.box, { flex: 1.618, paddingTop: 6 }]}>
          <Text style={[styles.indexSmall, { left: 60 }]}>
            + {moneyFormat(props.totalCal.paidMtd.value)}
          </Text>
          <Text style={[styles.index, { color: colors.info, fontWeight: 'bold' }]}>
            {moneyFormat(props.totalCal.paidMtd.value)}
          </Text>
          <Text style={[styles.label]}>Tổng số thu</Text>
        </View>

        <View style={[styles.box, { flex: 1.2 }]}>
          <Text style={{ fontSize: 12 }}>
            {(props.totalCal.paidMtd.value * 100 / props.totalCal.totalCase.value).toFixed(0)}%
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
            8
          </Text>
          <Text style={styles.label}>Lịch hẹn lại</Text>
        </View>

        <View style={[styles.box, { flex: 1.618 }]}>
          <Text style={[styles.index, { color: colors.danger }]}>
            8
          </Text>
          <Text style={[styles.label, { color: colors.danger }]}>Quá hạn lịch hẹn</Text>
        </View>

        <View style={[styles.box, { flex: 1.2 }]}>
          <Text style={{ fontSize: 14 }}>
            {(props.totalCal.paidMtd.value * 100 / props.totalCal.totalCase.value).toFixed(0)}%
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
    fetching: state.data.fetching,
    data: state.data.data,
    showlists: state.showlists.applIds,
    todoCal: state.data.todoCal,
    totalCal: state.data.totalCal,
    treeCal: state.treeCal,
    uptrails: state.uptrails,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShowlist: (content) => {
      dispatch({
        type: constAction.SET_TODO_SHOWLIST,
        content,
      })
    },
    setTodoShowlist: (content) => {
      dispatch({
        type: constAction.SET_TODO_SHOWLIST,
        content,
      })
    },
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
    fontWeight: 'bold',
    fontSize: 22,
  },
  indexSmall: {
    fontSize: 14,
    fontWeight: 'bold',
    position: 'absolute',
    top: -10,
    left: 40,
    color: colors.success
  },
  indexLabel: {
    fontSize: 12
  },
  label: {
    fontSize: 9,
    color: colors.gray
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

const StaffDash_com = connect(mapStateToProps, mapDispatchToProps)(StaffDash)
const StaffTodo_com = connect(mapStateToProps, mapDispatchToProps)(StaffTodo)
const StaffHeader_com = connect(mapStateToProps, mapDispatchToProps)(StaffHeader)

export {
  StaffDash_com,
  StaffTodo_com,
  StaffHeader_com
}

