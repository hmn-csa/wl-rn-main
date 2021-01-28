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
import { colors } from '../styles';

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
          backgroundColor: 'pink',
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
    1: '12tr'
  }

  return (
    <View style={{ flex: 1, }}>
      {/* <Text style={styles.logo}>HMN APP</Text> */}
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
              backgroundColor: 'pink',
              borderRadius: 0,
              width: 40,
              height: 40
            }}>
              <View style={[styles.row,]}>
                <View style={styles.box}>
                  <Text >{date.day}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <Text style={{ fontSize: 9 }}> {data[date.day]}</Text>
                <Text style={{ fontSize: 9 }}> {data[date.day]}</Text>
              </View>
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
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 3
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
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

