import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { connect } from "react-redux";
import {
  actlogoutUser, clearUptrail,
  clearData, clearShowlist
} from "../actions/index"



import { Calendar, CalendarList, Agenda } from 'react-native-calendars'

import CalendarStrip from 'react-native-calendar-strip'
import treeReducers from '../reducers/treeReducers';

function User(props) {
  const outUsers = () => {
    props.logout()
  };

  const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
  const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
  const workout = { key: 'workout', color: 'green' };

  const onDayPress = day => {
    setSelected(day.dateString);
  };

  const CustomHeader = React.forwardRef((props, ref) => {
    return (
      <View
        ref={ref}
        {...props}
        style={{
          backgroundColor: '#FCC',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginHorizontal: -4,
          padding: 8
        }}
      >
        <Text>Lịch làm việc</Text>
        {/* <TouchableOpacity onPress={() => console.warn('Tapped!')}>
          <Text>Tap Me</Text>
        </TouchableOpacity> */}
      </View>
    );
  });

  const data = {
    1: 'xxx'
  }

  return (
    <View style={{ flex: 1, }}>
      <Text style={styles.logo}>HMN APP</Text>
      <Button
        style={styles.loginBtn}
        title='SIGOUT'
        onPress={outUsers}
      />



      <Calendar
        // Collection of dates that have to be marked. Default = {}
        // markedDates={{
        //   '2021-01-16': { selected: true, marked: true, selectedColor: 'blue' },
        //   '2021-01-17': { marked: true },
        //   '2021-01-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
        //   '2021-01-19': { disabled: true, disableTouchEvent: true },
        //   '2021-o1-25': { dots: [vacation, massage, workout], selected: true, selectedColor: 'red' },
        //   '2021-01-26': { dots: [massage, workout], disabled: true }
        // }}
        customHeader={CustomHeader}
        dayComponent={({ date, state }) => {
          return (
            <View style={{
              backgroundColor: 'orange',
              borderRadius: 0,
              width: 35,
              height: 35
            }}>
              <Text >
                {date.day}</Text>
              <Text> {data[date.day]}</Text>
            </View>
          );
        }}

        markedDates={{
          '2021-01-01': {
            customStyles: {
              container: {
                backgroundColor: 'white',
                elevation: 2
              },
              text: {
                color: 'red'
              }
            }
          },
          '2021-01-08': {
            selected: true
          },
          '2021-01-09': {
            customStyles: {
              container: {
                backgroundColor: 'red',
                elevation: 4
              },
              text: {
                color: 'white'
              }
            }
          },
          '2021-01-14': {
            customStyles: {
              container: {
                backgroundColor: 'green'
              },
              text: {
                color: 'white'
              }
            }
          },
          '2021-01-15': {
            customStyles: {
              container: {
                backgroundColor: 'black',
                elevation: 2
              },
              text: {
                color: 'yellow'
              }
            }
          },
          '2018-01-21': {
            disabled: true
          },
          '2021-01-28': {
            customStyles: {
              text: {
                color: 'black',
                fontWeight: 'bold'
              }
            }
          },
          '2021-01-30': {
            customStyles: {
              container: {
                backgroundColor: 'pink',
                elevation: 4,
                borderColor: 'purple',
                borderWidth: 5
              },
              text: {
                marginTop: 3,
                fontSize: 11,
                color: 'black'
              }
            }
          },
          '2021-01-31': {
            customStyles: {
              container: {
                backgroundColor: 'orange',
                borderRadius: 0
              }
            }
          }
        }}

        minDate={'2021-01-01'}
        markingType={'custom'}
        pastScrollRange={0}
        futureScrollRange={0}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2021-01-31'}
        hideExtraDays

      />

      <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={{
          '2021-01-19': [{ name: 'item 1 - any js object 19' }],
          '2021-01-17': [{ name: 'item 2 - any js object', height: 80 }],
          '2021-01-18': [],
          '2021-01-22': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
        }}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={(month) => { console.log('trigger items loading') }}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
        // Callback that gets called on day press
        onDayPress={(day) => { console.log('day pressed', day) }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={(day) => { console.log('day changed') }}
        // Initially selected day
        // selected={'2012-05-16'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={'2021-01-16'}
        // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'2021-01-30'}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={0}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={0}
        // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          return (
            <TouchableOpacity
              style={[styles.item,]}
              onPress={() => Alert.alert(item.name)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
        renderDay={(day, item) => { return (<View />); }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => { return (<View />); }}
        // Specify how agenda knob should look like
        renderKnob={() => { return (<View />); }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => { return (<View />); }}
        // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
        // Hide knob button. Default = false
        hideKnob={true}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={{
          '2021-01-19': { selected: true, marked: true },
          '2021-01-17': { marked: true },
          '2021-01-18': { disabled: true }
        }}
        // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        disabledByDefault={true}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={true}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
        refreshControl={null}
        // Agenda theme
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue'
        }}
        // Agenda container style
        style={{}}
      />


    </View>


  )


}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actlogoutUser())
      dispatch(clearShowlist())
      dispatch(clearUptrail())
      dispatch(clearData())
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "10%",
    backgroundColor: "#fb5b5a",
    borderRadius: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  loginText: {
    color: "white"
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
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(User);

