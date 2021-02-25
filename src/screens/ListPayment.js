import {
  View, Text, Image, ScrollView, Alert, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator
} from 'react-native'
import { Button, Portal, Dialog } from 'react-native-paper';
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import * as constAction from '../consts'

import Timeline from 'react-native-timeline-flatlist'
import { actUpdateShowlist } from "../actions/index"
import { moneyFormat } from '../functions'
import { colors } from "../styles";

function ListPayment(props) {
  // useEffect(() => {
  //   props.getPayments({
  //     token: props.token.token.access,
  //     staff_id: "",
  //     applids: ''.concat(props.paidList.map(item => item.appl_id))
  //   })
  // }, []);

  const [timelinePayment, setTimeline] = useState([])

  const pm2timeline = (arr) => {
    let timeline = []
    for (let i = 0; i < arr.length; i++) {
      timeline.push({
        time: arr[i].rundate.substring(5, 10),
        title: arr[i].cust_name,
        appl_id: arr[i].appl_id,
        description: 'Hợp đồng : ' + arr[i].appl_id,
        money: moneyFormat(arr[i].receipt_amt),
      })
    }
    return timeline
  }

  useEffect(() => {
    setTimeline(pm2timeline(props.payments))
  }, [props.payments]);

  const renderDetail = (rowData, sectionID, rowID) => {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>
    let desc = (
      <View style={styles.descriptionContainer}>
        <Text style={[styles.textDescription]}>{rowData.description}</Text>
      </View>
    )
    let money = (
      <View style={styles.descriptionContainer}>
        <Text style={[styles.textDescription, { color: colors.main }]}>Tiền đóng : {rowData.money}</Text>
      </View>
    )

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
        {money}
      </View>
    )
  }

  const onEventPress = (rowData) => {
    props.updateShowlist([{ appl_id: rowData.appl_id, cust_name: rowData.title }])
    props.navigation.navigate('Portfolio', { screen: 'List' })

  }

  return (
    <View style={styles.container}>
      <Timeline
        style={styles.list}
        data={timelinePayment}
        separator={true}
        circleSize={20}
        innerCircle={'dot'}
        circleColor={colors.main}
        lineColor={colors.main}
        timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
        timeStyle={{ textAlign: 'center', backgroundColor: colors.main, color: 'white', padding: 5, borderRadius: 13 }}
        descriptionStyle={{ color: colors.main }}
        options={{
          style: { paddingTop: 5 }
        }}
        renderDetail={renderDetail}
        onEventPress={onEventPress}
        showTime={true}
      />
    </View>
  )
};

const mapStateToProps = (state) => {
  return {
    payments: state.payments.payments,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getPayments: (config) => {
      dispatch(
        {
          type: constAction.API_PAYMENT_REQUEST,
          config
        }
      )
    },
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    },
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  list: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 10
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  }
});



export default connect(mapStateToProps, mapDispatchToProps)(ListPayment);

