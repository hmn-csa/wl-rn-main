import {
  View, Text, Image, ScrollView, Alert, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator
} from 'react-native'
import { Button, Portal, Dialog } from 'react-native-paper';
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { styles, colors } from '../styles'
import axios from "axios"
import DatePicker from 'react-native-datepicker'

import { actGetUptrails, actUpdateShowlist } from "../actions/index"

import Uptrail from '../components/Uptrail'
import * as constAction from '../consts'
// function Uptrail

function ListUptrail(props) {



  const [reDate, setRedate] = useState(null)
  const [uptrailStatus, setUptrailStatus] = useState(false);

  const getMoreUptrails = async () => {
    if (props.uptrails.uptrails.length > 0) {
      const lastE = props.uptrails.uptrails[props.uptrails.uptrails.length - 1]
      if (reDate !== null) {
        if (Date.parse(reDate) < Date.parse(lastE.runtime.substring(0, 10))) {
          //console.log(reDate)
          setUptrailStatus(true)
          await props.getUptrails(
            { staff_id: props.uptrails.active_staff, token: props.token, start: reDate, end: lastE.runtime.substring(0, 19) }
          )
        }
      } else {
        setUptrailStatus(true)
        await props.getUptrails(
          { staff_id: props.uptrails.active_staff, token: props.token, start: '', end: lastE.runtime.substring(0, 19) }
        )
      }
    }
    else {
      setUptrailStatus(true)
      await props.getUptrails(
        { staff_id: props.uptrails.active_staff, token: props.token, start: "", end: "" }
      )
    }
    setUptrailStatus(false)
  }

  const renMoreLoading = () => {
    if (props.uptrails.moreFetching)
      return (
        <View style={[styles.container, { alignItems: 'center' }]}>
          <Text>Loading ... </Text>
          <ActivityIndicator size={5} color={colors.primary} />
        </View>
      )
    return <View></View>
  }
  // ---------------------------------------
  const getMoreUptrails2 = () => {
    let loadfrom = props.uptrails.uptrails[props.uptrails.uptrails.length - 1].runtime
    let config = {
      staff_id: props.token.active_staff,
      token: props.token.token.access,
      loadfrom: loadfrom
    }
    console.log(config)
    props.getMoreUptrails(config)
  }


  if (props.uptrails.fetching || uptrailStatus)
    return <View style={[styles.container, { alignItems: 'center' }]}>
      <Text>Loading ... </Text>
      <ActivityIndicator size={100} color={colors.primary} />
    </View>

  else if (props.uptrails.uptrails.length > 0)
    return (
      <ScrollView>

        {props.uptrails.uptrails.map(item =>
          <Uptrail
            key={item.runtime}
            runtime={item.runtime}
            code={item.code}
            appl_id={item.appl_id}
            cust_name={item.cust_name}
            pay_amount={item.pay_amount}
            remark={item.remark}
            trust_address={item.trust_address}
            next_visit_time={item.next_visit_time}
            image1={item.image1}
            image2={item.image2}
            image3={item.image3}
            navigation={props.navigation}
          />)
        }
        {renMoreLoading()}
        <View style={[styles.row, { marginTop: 10 }]}>
          <DatePicker
            style={[styles.box, { backgroundColor: colors.secondary, borderRadius: 10, }]}
            date={reDate}
            mode="date"
            placeholder="từ ngày"
            format="YYYY-MM-DD"
            // minDate="2016-05-01"
            // maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 4,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => setRedate(date)}
          />

          <Button
            mode="contained"
            onPress={getMoreUptrails2}
            style={[styles.box, buttonStyles.button]}>
            lấy thêm
      </Button>
        </View>
      </ScrollView>
    )
  else
    return (
      <View style={[{ alignItems: 'center' }]}>
        <Text>không có Uptrail</Text>

      </View>
    )

};

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    uptrails: state.uptrails,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getUptrails: (config) => {
      dispatch(actGetUptrails(config))
    },
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    },
    getMoreUptrails: (config) => {
      dispatch({
        type: constAction.MORE_UPTRAIL_REQUEST,
        config
      })
    }
  }
}

const buttonStyles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 2,

  },
  button: {
    marginLeft: 2,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

const stylesTrail = StyleSheet.create({
  container: {
    backgroundColor: "#DCDCDC",
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUptrail);

