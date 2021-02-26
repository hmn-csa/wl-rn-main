import React, { useState, useEffect, useRef } from 'react'
import {
  View, Text, Image, StyleSheet,
  Alert, Linking, Platform, Dimensions,
  TouchableOpacity, TextInput
} from 'react-native'

import { colors } from '../styles'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import * as constAction from '../consts'
import { connect } from "react-redux"
import Uptrail from "../components/Uptrail";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import CalendarStrip from "react-native-calendar-strip";
import {
  Button, Dialog, Portal,
} from 'react-native-paper';


function Calendar_(props) {

  const [activeItem, setActiveItem] = useState({})
  const [items, setItems] = useState(props.calendar)


  const dateObj = new Date()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const today = year + '-' + month + '-' + day;

  const [visible, setVisible] = useState(false);

  const renSelectDate = () => {
    const d = new Date(activeItem.scheduled_date_change);
    const year = d.getFullYear(); // 2019
    const date = d.getDate();
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    const days = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    const dayName = days[d.getDay()];
    const monthName = months[d.getMonth()];
    const dateformatted = !activeItem.scheduled_date_change ? "" : `${dayName}, ${date} ${monthName} ${year}`;

    return (
      <View
        style={{ borderColor: "lightgray", borderWidth: 1, borderRadius: 10 }}
      >
        <CalendarStrip
          scrollable
          style={{ height: 60, marginRight: 0, paddingLeft: 0 }}
          calendarColor={"white"}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: "black",
          }}
          highlightDateNumberStyle={{ color: "red" }}
          highlightDateNameStyle={{ color: 'red', fontWeight: 'bold' }}
          calendarHeaderStyle={{ color: "#787571" }}
          dateNumberStyle={{ color: "#787571" }}
          dateNameStyle={{ color: "black" }}
          iconContainer={{ flex: 0.1 }}
          selectedDate={activeItem.scheduled_date_change}
          onDateSelected={(date) => {
            setActiveItem({ ...activeItem, scheduled_date_change: date.format("YYYY-MM-DD") })
          }}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 40,
          }}
        >
          <Text>{dateformatted}</Text>


        </TouchableOpacity>
      </View>
    );
  };

  const handleRemove = (tranformItem) => {
    Alert.alert(
      `Xác nhận xoá lịch hẹn`,
      `${tranformItem.cust_name}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'OK', onPress: () => {
            props.removeCalendar(tranformItem)
            loadItems()
          },
        }
      ],
      { cancelable: true }
    );
  }

  const handleUpdate = (tranformItem) => {
    props.updateCalendar({
      ...tranformItem,
      //task_done: tranformItem.task_done ? false : true,
    })
    loadItems()
  }

  // useEffect(() => {
  //   setItems(props.calendar)
  //   console.log('effect calendar')
  // }, [props.calendar])

  const _renderItem = (item) => {

    const tranformItem = {
      ...item,
      runtime: item.runtime,
      pay_amount: item.scheduled_amt,
      next_visit_time: item.scheduled_date,
      task_done: item.task_done ? true : false,
      token: props.token,
      staff_id: props.active_staff,
      scheduled_date_change: item.scheduled_date,
    }

    return (
      <View style={{ backgroundColor: 'white', marginBottom: 10, borderRadius: 15 }}>
        <Uptrail
          key={tranformItem.runtime}
          item={tranformItem}
          navigation={props.navigation}
          style={{ borderWidth: 0, borderColor: 'white', marginBottom: 5, paddingBottom: 0, borderRadius: 0 }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <View style={[{ textAlign: 'left' }]}>
            <TouchableOpacity
              style={[{ flexDirection: 'row', borderColor: colors.main, borderWidth: 0, left: 15 }]}
              onPress={() => handleUpdate({
                ...tranformItem,
                task_done: tranformItem.task_done ? false : true,
              })}
            >
              <AntDesign
                name="checksquare"
                style={{
                  color: tranformItem.task_done ? colors.main : "gray",
                  fontSize: 24,
                }}
              />
              <Text style={{
                paddingTop: 5,
                fontSize: 10,
                color: tranformItem.task_done ? colors.main : "gray",
              }}>{tranformItem.task_done ? "Đã hoàn thành" : "Chưa hực hiện "}</Text>
            </TouchableOpacity>

          </View>
          <View style={[{ textAlign: 'right' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2, marginRight: 10 }}>
              <TouchableOpacity
                style={[styles.btn, { marginRight: 10, borderColor: colors.main }]}
                onPress={() => {
                  setActiveItem(tranformItem)
                  console.log(activeItem)
                  setVisible(true)
                }}
              >
                <FontAwesome
                  name="pencil"
                  style={{
                    color: colors.main,
                    fontSize: 16
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, { borderColor: colors.secondary }]}
                onPress={() => handleRemove(tranformItem)}
              >
                <FontAwesome
                  name="remove"
                  style={{
                    color: colors.secondary,
                    fontSize: 16
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View >
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        {/* <Text>This is empty date!</Text> */}
      </View>
    );
  }

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  const loadItems = (day) => {
    setTimeout(() => {
      console.log('load calendar')
      setItems({})
      setItems(props.calendar)
    }, 1000)
  }

  const renderPortal = () => {
    console.log('ren portal')
    return (
      <Portal style={[styles.row, { padding: 10 }]}>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{ width: null, height: 'auto' }}>
          <Dialog.Content>
            <View style={styles.rowz} >
              <Text style={[styles.header]}>{activeItem.cust_name}</Text>
              <Text style={[styles.smallHeader]}>{activeItem.appl_id}</Text>

              <View>
                {renSelectDate()}

                <Text style={styles.title}>Ghi chú</Text>

                <View style={styles.row}>
                  <TextInput
                    style={[styles.row, styles.selectInput]}
                    placeholder="ghi chú"
                    value={activeItem.remark}
                    onChangeText={value => {
                      setActiveItem({ ...activeItem, remark: value })
                    }}
                    //onChangeText={setPayAmount}
                    clearButtonMode="always"
                  />
                </View>
                <Text style={styles.title}>Số tiền dự thu</Text>

                <View style={styles.row}>
                  <TextInput
                    style={[styles.row, styles.selectInput]}
                    keyboardType='numeric'
                    placeholder="Số tiền dự thu"
                    value={activeItem.scheduled_amt}
                    onChangeText={value => {
                      setActiveItem({ ...activeItem, scheduled_amt: value })
                    }}
                    clearButtonMode="always"
                  />
                </View>
              </View>

            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity
              style={styles.closeBtn, { marginRight: 20 }}
              onPress={() => setVisible(false)}>
              <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                console.log(activeItem)
                handleUpdate(activeItem)
                setVisible(false)
              }}>
              <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>Ok</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        selected={today}
        renderItem={_renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        loadItemsForMonth={loadItems}
        refreshing={true}
        selectedColor={colors.main}
        //markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        theme={{ agendaKnobColor: colors.main, agendaTodayColor: colors.primary }}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      // hideExtraDays={false}
      />
      {renderPortal()}
    </View>
  )
}


const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 25,
    justifyContent: "center",
    color: "red",
    marginLeft: "auto",
    marginRight: "auto",
  },
  smallHeader: {
    fontWeight: "bold",
    fontSize: 14,
    justifyContent: "center",
    color: "grey",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
    paddingTop: 5
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  row: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btn: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  selectInput: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: "lightgray",
    backgroundColor: "white",
    color: "gray",
    padding: 5,
    height: 40
  },
});



const mapStateToProps = (state, ownProps) => {
  return {
    calendar: state.calendar.calendar,
    token: state.token.token.access,
    active_staff: state.token.active_staff
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeCalendar: (content) => {
      dispatch(
        {
          type: constAction.USER_CALENDAR_REMOVE,
          content
        }
      )
    },
    updateCalendar: (content) => {
      dispatch(
        {
          type: constAction.USER_CALENDAR_UPDATE,
          content
        }
      )
    },

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Calendar_);
