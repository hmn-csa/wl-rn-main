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
  return (
    <View style={[styles.row, { borderBottomWidth: 0.2, borderBottomColor: '#CCC', paddingTop: 10, paddingBottom: 5, backgroundColor: 'white', paddingLeft: 20 }]}>
      <View style={[styles.box, { minWidth: AVATAR_WIDTH, flex: 0.05, marginBottom: 5, }]}>
        <ImageBackground
          style={[styles.pic]}
          imageStyle={{ borderRadius: 90, resizeMode: "cover" }}
          source={renAvatar(props.token.active_infos.avatar)}>
        </ImageBackground>
      </View>
      <View style={[styles.box, { flex: 1, marginLeft: 10, marginBottom: 5, marginTop: -5 },]}>
        <Text style={[styles.nameTxt, { color: colors.main }]}
          ellipsizeMode="tail">
          {props.token.active_staff}
        </Text>
        <Text style={[styles.nameTxt, { fontSize: 12 }]}
          ellipsizeMode="tail">
          {props.token.active_infos.fc_name}
        </Text>
      </View>
      <View style={[styles.box, { flex: 1.618, alignItems: 'center' }]}>
        <CircleTA />
      </View>
    </View>
  )
}

function StaffDash(props) {
  const navigation = useNavigation();

  const handleShow = (list, title) => {
    navigation.navigate('Portfolio', { name: title })
    props.updateShowlist(list)
  }


  return (
    <View
      style={[styles.block,]}
    >
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
        Tổng danh mục
      </Text>
      <View style={[styles.row]}>
        <TouchableOpacity style={[styles.box, { flex: 0.8 }]}
          onPress={() => handleShow(props.totalCal.totalCase.applIds, 'Tổng HD')}
        >
          <Text style={styles.index}>
            {props.totalCal.totalCase.case}
          </Text>
          <Text style={styles.label}>Tổng HĐ</Text>
        </TouchableOpacity>

        <View style={[styles.box, { flex: 1.618 }]}>
          <TouchableOpacity onPress={() => handleShow(props.totalCal.followed.applIds, 'Viếng thăm hôm nay')}>
            <Text style={styles.indexSmall}>
              + {props.totalCal.followedToday.case}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShow(props.totalCal.followed.applIds, 'HD đã viếng thăm')}>
            <Text style={styles.index}>
              {props.totalCal.followed.case}
            </Text>
            <Text style={styles.label}>Đã viếng thăm</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box, { flex: 1 }]}>
          <Text style={styles.indexBar}>
            {(props.totalCal.followed.case * 100 / props.totalCal.totalCase.case).toFixed(0)}%
          </Text>
          <ProgressBar
            style={{ marginBottom: 0 }}
            progress={props.totalCal.followed.case / props.totalCal.totalCase.case}
            color={colors.main} />
          <Text style={styles.label}>Tỉ lệ viếng thăm</Text>
        </View>
      </View>

      {/* ======================*/}

      <View style={[styles.row, { marginTop: 25 }]}>
        <View style={[styles.box, { flex: 0.8 }]}>
          <TouchableOpacity onPress={() => handleShow(props.totalCal.paidToday.applIds, 'Có số thu hôm nay')}>
            <Text style={styles.indexSmall}>
              + {props.totalCal.paidToday.case}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShow(props.totalCal.paidMtd.applIds, 'HD có số thu')}>
            <Text style={styles.index}>
              {props.totalCal.paidMtd.case}
            </Text>
            <Text style={styles.label}>HĐ có số thu</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box, { flex: 1.618 }]}>
          <TouchableOpacity onPress={() => handleShow(props.totalCal.paidToday.applIds, 'Có số thu hôm nay')}>
            <Text style={[styles.indexSmall,]}>
              + {moneyFormat(props.totalCal.paidToday.value)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShow(props.totalCal.paidMtd.applIds, 'HD có số thu')}>
            <Text style={[styles.index, { color: colors.main }]}>
              {moneyFormat(props.totalCal.paidMtd.value)}
            </Text>
            <Text style={[styles.label]}>Tổng số thu</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box, { flex: 1 }]}>
          <Text style={styles.indexBar}>
            {(props.totalCal.paidMtd.value * 100 / props.totalCal.totalCase.value).toFixed(0)}%
          </Text>
          <ProgressBar
            style={{ marginBottom: 0 }}
            progress={props.totalCal.paidMtd.value / props.totalCal.totalCase.pos}
            color={colors.main} />
          <Text style={styles.label}>Tỉ lệ thu hồi (pos)</Text>
        </View>
      </View>
      {/* ======================*/}

      <View style={[styles.row,]}>
        <View style={[styles.box, { flex: 0.8 }]}>
          <TouchableOpacity onPress={() => handleShow(props.totalCal.revisit.applIds, 'Hẹn viếng thăm lại')}>
            <Text style={styles.index}>
              {props.totalCal.revisit.case}
            </Text>
            <Text style={styles.label}>Nên hẹn lại</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box, { flex: 1.618 }]}>
          <TouchableOpacity onPress={() => handleShow(props.totalCal.Bptp.applIds, 'Quá hạn lịch hẹn')}>
            <Text style={[styles.index, { color: colors.secondary }]}>
              {props.totalCal.Bptp.case}
            </Text>
            <Text style={[styles.label, { color: colors.secondary }]}>Quá hạn lịch hẹn</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.box, { flex: 1 }]}>
          <Text style={styles.indexBar}>
            {(props.totalCal.paidMtd.case * 100 / props.totalCal.totalCase.case).toFixed(0)}%
          </Text>
          <ProgressBar
            style={{ marginBottom: 0 }}
            progress={0.4}
            color={colors.main} />
          <Text style={styles.label}>Tỷ lệ thu hồi (case)</Text>
        </View>
      </View>
    </View >
  )
}


const mapStateToPropsHeader = (state, ownProps) => {
  return {
    token: state.token,
  };
};

const mapStateToPropsTotal = (state, ownProps) => {
  return {
    showlists: state.showlists.applIds,
    totalCal: state.data.totalCal,
  };
};

const mapStateToPropsTodo = (state, ownProps) => {
  return {
    showlists: state.showlists.applIds,
    totalCal: state.data.todoCal,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    updateShowlist: (content) => {
      dispatch({
        type: constAction.UPDATE_SHOWLIST,
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
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 'auto',
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  row: {
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: "auto",
    paddingVertical: 'auto',
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
    fontSize: 15,
    fontWeight: '700',
    position: 'absolute',
    top: -20,
    left: 40,
    color: colors.main
  },
  indexLabel: {
    fontSize: 16
  },
  label: {
    fontSize: 10,
    color: colors.gray
  },
  indexBar: {
    paddingTop: 12,
    fontWeight: '600',
    fontSize: 16,
    color: colors.main,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    marginBottom: 5
  },

  card: {
    justifyContent: 'center',
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

const StaffDash_com = connect(mapStateToPropsTotal, mapDispatchToProps)(StaffDash)
const StaffTodo_com = connect(mapStateToPropsTodo, mapDispatchToProps)(StaffDash)
const StaffHeader_com = connect(mapStateToPropsHeader, mapDispatchToProps)(StaffHeader)

export {
  StaffDash_com,
  StaffTodo_com,
  StaffHeader_com
}

