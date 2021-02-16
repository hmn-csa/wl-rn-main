import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet, Text, View, FlatList,
  TouchableOpacity, Alert, Image, ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { Button, TextInput, Dialog, Portal } from 'react-native-paper';
import { connect } from "react-redux";
import {
  calManagerDash, setManagerDash, pullManagercount,
  apiStaffData, updateManagerDash, setMapStaff,
  actGetUptrails, actSetActiveStaff, clearUptrail,
  clearData, clearShowlist
} from "../actions"
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as constAction from '../consts'
import axios from "axios";
import { colors, styles as masterStyles } from '../styles'

import TimeAgo from 'react-native-timeago'

import { EMPTYAVATAR } from '../images';

// onPress={() => {
//   props.navigation.navigate('Dashboard')
//   props.getStaffData({token: props.token.token.access, staff_id: item.staff_id})
// }} 
// ManageStaff

function ManagerStaff(props) {

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('This will run every second!');
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  const [last_checkin, setlast_checkin] = useState(props.manager.last_checkin);
  const [last_uptrail, setlast_uptrail] = useState(props.manager.last_uptrail);

  // useEffect(() => {
  //   setlast_checkin(props.manager.last_checkin);
  // }, [props.manager]);

  useEffect(() => {
    // setlast_uptrail(props.manager.last_uptrail);
    // setlast_checkin(props.manager.last_checkin);
    // console.log('prop uptrail', props.manager.last_uptrail, props.manager.last_checkin)
    // console.log('change uptrail', last_uptrail, last_checkin)

    let data = {
      last_checkin: props.manager.last_checkin,
      last_uptrail: props.manager.last_uptrail,
    }
    //console.log('last data', data)

    if (props.manager.pullcnt > 1)
      updateStaffData(data)
  }, [props.manager.pullcnt]);

  const getStaffData = async () => {


    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/manager?type=info`,
      headers: {
        'Authorization': `Bearer ${props.token.token.access}`
      },
      data: {
        'area': props.token.token.area,
      }
    }

    try {
      const response = await axios(config);

      props.setManager(response.data);

    } catch (error) {
      console.error(error);
    }

  }

  const updateStaffData = async (data) => {
    // let data = {
    //   last_checkin: useRef(last_checkin),
    //   last_uptrail: last_uptrail
    // }
    //console.log(props.manager)

    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/manager?type=update`,
      headers: {
        'Authorization': `Bearer ${props.token.token.access}`
      },
      data: data
    }
    //console.log(config)
    try {
      const response = await axios(config);
      props.updateManager(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  const getStaffDetail = async () => {

    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/manager?type=data`,
      headers: {
        'Authorization': `Bearer ${props.token.token.access}`
      },
      data: {
        'area': props.token.token.area,
      }
    }

    try {
      const response = await axios(config);
      props.calManager(response.data)
    } catch (error) {
      console.error(error);
    }

  }



  useEffect(() => {
    (async () => {
      await getStaffData();
      await getStaffDetail()
    })();
  }, []);

  // useEffect(() => {
  //   getStaffData()
  // }, []);

  // useEffect(() => {
  //   getStaffDetail()
  // }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      //console.log('This will run every second!')
      //getStaffData()
      //getStaffDetail()

      //updateStaffData()
      props.pullManager()
    }, 1 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);


  // pull update data


  const renColor = (checkinData, today) => {
    if (checkinData.length == 0)
      return colors.secondary
    if (checkinData[0].runtime.substring(0, 10) === today)
      return colors.success
    return 'orange'
  }

  const renBtnMap = (item) => {
    if (props.manager.data_done & item.checkin.length > 0)
      return <Button
        icon="map-clock"
        mode="contained"
        onPress={
          () => {
            props.setMap({
              uptrail: item.uptrail,
              checkin: item.checkin,
              staff_id: item.staff_id,
              username: 'aaa'
            })
            props.navigation.navigate('Manager', { screen: 'CheckinMap' })
          }
        }
      >
        checkin map
    </Button>
  }




  const renIconMap = (item) => {
    if (props.manager.data_done & item.checkin.length > 0)
      return <Ionicons
        name="ios-pin"
        style={[masterStyles.logo, { fontSize: 25 }]}
        onPress={
          () => {
            props.setMap({
              uptrail: item.uptrail,
              checkin: item.checkin,
              staff_id: item.staff_id,
              username: 'aaa'
            })
            props.navigation.navigate('Manager', { screen: 'CheckinMap' })
          }
        }
      />
  }


  const renIcon = (checkinData, today) => {
    if (checkinData.length == 0)
      return <Ionicons name='ios-close-circle' style={[{ color: colors.secondary }]} />
    if (checkinData[0].runtime.substring(0, 10) === today)
      return <Ionicons name='ios-checkmark-circle' style={[{ color: colors.success }]} />
    return <Ionicons name='ios-remove-circle' style={[{ color: 'orange' }]} />
  }

  const renCheckin = (checkinData) => {
    const splitTime = (t) => t.substring(0, 10) + " " + t.substring(11, 19)
    if (checkinData.length == 0)
      return <Text>Chưa có</Text>
    else
      return <Text>{checkinData[0].runtime.substring(11, 16)} | <TimeAgo time={checkinData[0].runtime} /></Text> //<Text><Moment fromNow date={checkinData[0].runtime}></Moment></Text>
  }

  const renUptrail = (uptrailData) => {
    const splitTime = (t) => t.substring(0, 10) + " " + t.substring(11, 19)
    if (uptrailData.length == 0)
      return <Text>Chưa uptrail</Text>
    else
      return <TimeAgo time={uptrailData[0].runtime} /> //<Moment fromNow  date={uptrailData[0].runtime}></Moment>
  }


  const renAvatar = (avatar) => {

    if (avatar == null || avatar === "")
      return (
        EMPTYAVATAR
      )
    else return (
      { uri: avatar }
    )
  }

  const renContent = (content) => {
    const moneyFormat = (n) => {
      const money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
      return money.substring(0, money.length - 2)
    }
    if (content !== undefined)
      return { ...content, todayamt: moneyFormat(content.todayamt), paidamt: moneyFormat(content.paidamt) }
    else return {
      visited: 0, // <ActivityIndicator size={10} color='black' /> ,
      paidamt: 0, //<ActivityIndicator size={10} color='black' /> ,
      paidcase: 0, //<ActivityIndicator size={10} color='black' /> ,
      todayamt: 0, //<ActivityIndicator size={10} color='black' /> ,
      todaycase: 0, //<ActivityIndicator size={10} color='black' /> ,
    }
  }

  // set map 

  const handlePressStaff = async (item) => {

    props.clearData()
    props.clearUptrail()
    props.clearShowlist()
    props.setActiveStaff(
      {
        staff_id: item.staff_id,
        info: {
          fc_name: item.info.fc_name
        }
      }
    )
    await props.getStaffData({ token: props.token.token.access, staff_id: item.staff_id })
    // await props.getUptrails(
    //   {
    //     staff_id: staff_id, 
    //     token: props.token.token.access, 
    //     start: "", 
    //     end: "" 
    //   }
    // )

    props.navigation.navigate('Dashboard')
  }


  if (props.status.length == 0)
    return (
      <View style={[masterStyles.container, { alignItems: 'center' }]}>
        <ActivityIndicator size={100} color={colors.primary} />
        <Text>Loading ... </Text>
      </View>
    )

  else return (
    <View style={styles.container} >
      <FlatList
        data={props.status}
        horizontal={false}
        numColumns={1}
        renderItem={({ item }) => {

          const content = renContent(item.content)

          return (
            <TouchableOpacity key={item.staff_id}
              onLongPress={() => handlePressStaff(item)}>

              <View style={[styles.row, { padding: 10, borderBottomWidth: 1, borderRadius: 10, }]}>
                <View style={[styles.box, { flex: 0.35, borderRadius: 30, }]}>
                  {/* {renAvatar(item.info.avatar)} */}
                  <ImageBackground
                    style={[styles.pic, { resizeMode: "cover" }]}
                    imageStyle={{ borderRadius: 30 }}
                    source={renAvatar(item.info.avatar)}>
                    {renIcon(item.checkin, item.today)}
                  </ImageBackground>
                </View>
                <View style={styles.box}>
                  <View>
                    <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.info.fc_name} - {item.info.staff_id}
                      </Text>
                    </View>
                    <View style={styles.msgContainer}>
                      <Text
                        style={[styles.msgTxt, { color: renColor(item.checkin, item.today) }]}>
                        last checkin: {renCheckin(item.checkin)}
                      </Text>
                    </View>

                    <View style={[styles.msgContainer, { marginTop: 5 }]}>
                      <View style={[styles.row, { flex: 1 }]}>
                        <View style={[styles.box, { flex: 0.8 }]}>
                          <Text style={[styles.msgTxt,]}>{item.case} case</Text>
                        </View>
                        <View style={styles.box}>
                          <Text style={[styles.msgTxt,]}>{content.paidcase} paid</Text>
                        </View>

                      </View>
                    </View>
                    <View style={[styles.msgContainer, { marginTop: 1 }]}>
                      <View style={[styles.row, { flex: 1 }]}>
                        <View style={[styles.box, { flex: 0.8 }]}>
                          <Text style={[styles.msgTxt,]}>{content.visited} đã đi</Text>
                        </View>
                        <View style={styles.box}>
                          <Text style={[styles.msgTxt,]}>{content.paidamt}</Text>
                        </View>

                      </View>
                    </View>

                    <View style={[styles.msgContainer, { marginTop: 1 }]}>
                      <View style={[styles.row, { flex: 1 }]}>
                        <View style={[styles.box, { flex: 0.8 }]}>
                          <Text style={[styles.msgTxt,]}>{renIconMap(item)}</Text>
                        </View>
                        <View style={styles.box}>
                        </View>
                      </View>
                    </View>

                  </View>
                </View>

                <View style={[styles.box, { flex: 0.5, borderLeftWidth: 0.1, borderLeftColor: colors.lightGray }]}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      Uptrail Today: {item.uptrail.length}
                    </Text>
                  </View>
                  <View style={styles.msgContainer}>
                    <Text
                      style={[styles.msgTxt, { color: renColor(item.uptrail, item.today) }]}>
                      {renUptrail(item.uptrail)}
                    </Text>
                  </View>


                  <View style={[styles.msgContainer, { marginTop: 5 }]}>
                    <View style={[styles.row, { flex: 1 }]}>
                      <View style={styles.box}>
                        <Text style={[styles.msgTxt,]}>{content.todaycase} paid</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.msgContainer, { marginTop: 5 }]}>
                    <View style={[styles.row, { flex: 1 }]}>
                      <View style={styles.box}>
                        <Text style={[styles.msgTxt,]}>{content.todayamt}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.msgContainer, { marginTop: 1 }]}>
                    <View style={[styles.row, { flex: 1 }]}>
                      <View style={[styles.box, { flex: 0.8 }]}>
                        <Text style={[styles.msgTxt,]}>{renIconMap(item)}</Text>
                      </View>
                      <View style={styles.box}>
                      </View>
                    </View>
                  </View>

                </View>

              </View>


            </TouchableOpacity>
          )
        }} />
    </View>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    manager: state.manager,
    status: state.manager.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    calManager: (data) => {
      dispatch(calManagerDash(data))
    },
    setManager: (data) => {
      dispatch(setManagerDash(data))
    },
    updateManager: (data) => {
      dispatch(updateManagerDash(data))
    },
    getStaffData: (config) => {
      dispatch(apiStaffData(config))
    },
    pullManager: () => {
      dispatch(pullManagercount())
    },
    setMap: (content) => {
      dispatch(setMapStaff(content))
    },
    setActiveStaff: (content) => {
      dispatch(actSetActiveStaff(content))
    },
    getUptrails: (config) => {
      dispatch(actGetUptrails(config))
    },
    clearData: () => {
      dispatch(clearData())
    },
    clearUptrail: () => {
      dispatch(clearUptrail())
    },
    clearShowlist: () => {
      dispatch(clearShowlist())
    },

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',

  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: 'white',
    marginVertical: 5,
    flexBasis: '46%',
    marginHorizontal: 5,
    borderRadius: 10,
  },

  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#222',
    fontSize: 13,
    width: 190,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: colors.textcolor,
    fontSize: 11,
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerStaff);

