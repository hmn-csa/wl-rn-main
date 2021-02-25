import React, { useState, useEffect, useRef } from 'react'
import {
  View, Text, Image, Button, StyleSheet,
  Alert, Linking, Platform, Dimensions,
  TouchableOpacity
} from 'react-native'

import { colors } from '../styles'
// import Calendar from '../components/Calendar'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import * as constAction from '../consts'
import { connect } from "react-redux"

import Uptrail from "../components/Uptrail";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import userInfo from './userInfo';

const ITEMS = {
  '2021-05-12T10:30:01': [{ name: 'item 1 - any js object' }],
  '2021-05-14': [{ name: 'item 2 - any js object', height: 80 }],
  '2021-05-24': [],
  '2021-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
}


function CalendarItem(props) {

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
      task_done: tranformItem.task_done ? false : true,
    })
    loadItems()
  }

  const [item, setItem] = userState({
    ...props.item, runtime: item.runtime,
    pay_amount: item.scheduled_amt,
    next_visit_time: item.scheduled_date
  })


  return (
    <View style={{ backgroundColor: 'white', marginBottom: 10, borderRadius: 15 }}>
      <Uptrail
        key={item.runtime}
        item={item}
        navigation={props.navigation}
        style={{ borderWidth: 0, borderColor: 'white', marginBottom: 5, paddingBottom: 0, borderRadius: 0 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <View style={[{ textAlign: 'left' }]}>
          <TouchableOpacity
            style={[{ flexDirection: 'row', borderColor: colors.main, borderWidth: 0, left: 15 }]}
            onPress={() => handleUpdate(item)}
          >
            <AntDesign
              name="checksquare"
              style={{
                color: item.tash_done ? colors.main : "gray",
                fontSize: 24,
              }}
            />
            <Text style={{
              paddingTop: 5,
              fontSize: 10,
              color: item.tash_done ? colors.main : "gray",
            }}>{item.tash_done ? "Đã hoàn thành" : "Chưa hực hiện "}</Text>
          </TouchableOpacity>

        </View>
        <View style={[{ textAlign: 'right' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2, marginRight: 10 }}>
            <TouchableOpacity
              style={[styles.btn, { marginRight: 10, borderColor: colors.main }]}>
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
              onPress={() => handleRemove(item)}
            >
              <FontAwesome
                name="remove"
                style={{
                  color: colors.secondary,
                  fontSize: 16
                }}
              />
            </TouchableOpacity>

            {/* <FontAwesome name="remove"
              size={24}
              style={{
                color: "grey",
              }}
              onPress={() => {
                props.removeCalendar(tranformItem)
                loadItems()
              }}
            /> */}
          </View>
        </View>
      </View>
    </View>
  );
}

function Calendar_(props) {

  const calendarRef = useRef(null)


  const [items, setItems] = useState(props.calendar)

  const dateObj = new Date()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const today = year + '-' + month + '-' + day;




  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
      //onPress={() => Alert.alert(item.cust_name)}
      >
        <Text>{item.cust_name}</Text>
        <Text>{item.appl_id}</Text>
        <Text>{item.rundate}</Text>
        <Text>{item.scheduled_date}</Text>
        <Text>{item.scheduled_amt}</Text>
        <Text>{item.remark}</Text>


      </TouchableOpacity>
    );
  }

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
      task_done: tranformItem.task_done ? false : true,
    })
    loadItems()
    console.log(items)
  }

  // useEffect(() => {
  //   setItems(props.calendar)
  //   console.log('effect calendar')
  // }, [props.calendar])

  const _renderItem = (item) => {


    var tranformItem = {
      ...item,
      runtime: item.runtime,
      pay_amount: item.scheduled_amt,
      next_visit_time: item.scheduled_date
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
              onPress={() => handleUpdate(tranformItem)}
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
                style={[styles.btn, { marginRight: 10, borderColor: colors.main }]}>
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

              {/* <FontAwesome name="remove"
                size={24}
                style={{
                  color: "grey",
                }}
                onPress={() => {
                  props.removeCalendar(tranformItem)
                  loadItems()
                }}
              /> */}
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

  // const loadItems = (day) => {
  //   for (let i = -15; i < 31; i++) {
  //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //     const strTime = timeToString(time);
  //     console.log(strTime)
  //     if (ITEMS[strTime]) {
  //       setItems(ITEMS[strTime])
  //     }

  //   }

  // }

  const loadItems = (day) => {
    setTimeout(() => {
      console.log('load calendar')
      setItems({})
      setItems(props.calendar)
    }, 100)
  }

  return (
    <Agenda
      items={items}
      selected={today}
      renderItem={_renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      loadItemsForMonth={loadItems}
      refreshing={true}
      ref={calendarRef}
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
  )
}


const styles = StyleSheet.create({
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
});



const mapStateToProps = (state, ownProps) => {
  return {
    calendar: state.calendar.calendar,
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

connect(mapStateToProps, mapDispatchToProps)(CalendarItem);

export default connect(mapStateToProps, mapDispatchToProps)(Calendar_);
