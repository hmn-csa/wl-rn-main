
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import {
  View, Text, Image, Button, StyleSheet, Alert, Linking, Platform, Dimensions
} from 'react-native'

import {
  actGetVsfSaga, actSetActiveApplId, actChangeToDo,
  actChangeTodoSaga, calTodoDash,
} from "../actions"
import * as constAction from '../consts'
import { colors } from '../styles'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4.5;
import { moneyFormat } from '../functions'

function ContractDetailMap(props) {
  const [contractId, setcontractId] = useState(props.contractId)
  const [content, setContent] = useState(props.data[contractId])
  const [isTodo, setTodoContent] = useState(props.data[contractId].todo_flag)
  const [todoColor, setTodoColor] = useState(props.data[contractId].todo_flag === 1 ? colors.danger : colors.grey)
  const [followedColor, setFollowedColor] = useState(props.data[contractId].followed === 1 ? colors.info : colors.grey)
  const [todoIcon, setTodoIcon] = useState(props.data[contractId].todo_flag === 1 ? 'heart' : 'heart-o')


  const handleÁyncChangeTodo = () => {
    let todo_value = isTodo === 1 ? 0 : 1
    let config = {
      'appl_id': content.appl_id,
      'todo_value': todo_value
    }
    const response = await axios(config);
    const responseTodo = response.data.todo_flag
    props.apiChangeTodo(config)
    props.changeTodo({ appl_id: content.appl_id, todo_flag: todo_value })
    setTodoContent(todo_value)
    setTodoColor(todo_value === 1 ? colors.danger : colors.grey)
    setTodoIcon(todo_value === 1 ? 'heart' : 'heart-o')
    props.calTodoDash(props.data)

  }
  const handleChangeTodo = async () => {
    const todo_new = isTodo === 1 ? 0 : 1
    let config = {
      method: 'put',
      url: `https://beta-fc.lgm.com.vn/rn-ver/api/appls-list/`,
      headers: {
        'Authorization': `Bearer ${props.token.token.access}`
      },
      data: {
        'appl_id': content.appl_id,
        'todo_value': todo_new
      }
    }
    try {
      const response = await axios(config);
      const responseTodo = response.data.todo_flag

      setTodoContent(responseTodo)
      props.changeTodo({ appl_id: content.appl_id, todo_flag: responseTodo })
      setTodoColor(responseTodo === 1 ? colors.danger : colors.grey)
      setTodoIcon(responseTodo === 1 ? 'heart' : 'heart-o')
      props.calTodoDash(props.data)
    } catch (error) {
      console.error(error);
    }
  }

  const handleGetVsf = () => {
    if (props.vsf.vsfs.map(appl => appl.appl_id).includes(content.appl_id)) {
      props.setActiveVsf(content)
      props.navigation.navigate('Vsf')
    }
    else {
      const config = {
        'appl_id': content.appl_id,
        'token_value': props.token.token.access
      }
      props.apiGetVsf(config)
      props.navigation.navigate('Vsf')
    }
  }

  const handleGetSkip = () => {
    if (props.vsf.skips.map(appl => appl.id_no).includes(content.id_no)) {
      props.setActiveSkip(
        props.vsf.skips.filter(appl => appl.id_no === content.id_no)[0]
      )
      props.navigation.navigate('Skip')
    }
    else {
      const config = {
        'id_no': content.id_no,
      }
      props.apiGetSkip(config)
      props.navigation.navigate('Skip')
    }
  }

  const handleRemark = () => {
    props.setActiveVsf(content)
    props.navigation.navigate('Remark')
  }
  const handleSkip = () => {
    props.setActiveVsf(content)
    props.navigation.navigate('Skip')
  }

  const handleMap = () => {
    props.setActiveVsf(content)
    const mapUrl = `https://www.google.com/maps/dir//${content.lat},${content.lon}`
    Linking.openURL(mapUrl)
  }

  const handleCall = () => {
    props.setActiveVsf(content);
    const phoneNumber = `tel:${content.act_mobile}`;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${content.act_mobile}`;
    }
    return Linking.openURL(phoneNumber)
  }

  // const todoIcon = (istodo) => {
  //   // if (istodo == 1)
  //   //   return <Ionicons
  //   //     name="ios-bulb"
  //   //     style={[showstyles.logo, { color: colors.primary, textAlign: 'right' }]}
  //   //   />
  // }
  const paidIcon = (paid) => {
    if (paid > 0) {
      const valuex = parseFloat(paid, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
      const value = valuex.substring(0, valuex.length - 2)
      return <Text style={[showstyles.nameTxt, { color: colors.success, fontWeight: 'bold' }]}>{value}</Text>
    }
    else return <Text style={[showstyles.nameTxt, { color: colors.danger, fontWeight: 'bold' }]}>{paid}</Text>
  }
  const ptpIcon = (lastCode) => {
    if (['PTP', 'OBT', 'WFP', 'TER'].includes(lastCode))
      return <Text
        style={{
          fontWeight: "bold",
          fontSize: 15,
          color: colors.success,
          textAlign: 'right'
        }}>{lastCode}</Text>
    else return <Text
      style={{
        fontWeight: "bold",
        fontSize: 15,
        color: colors.danger,
        textAlign: 'right'
      }}>{lastCode}</Text>
  }

  const followIcon = (isFollowed) => {
    if (isFollowed == 1)
      return <Text
        style={{
          fontWeight: "bold",
          fontSize: 9,
          color: colors.warning,
          textAlign: 'right'
        }}>Followed</Text>
  }
  if (props.data[contractId] === undefined)
    return <View></View>
  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 5,
        borderWidth: 0,
        borderColor: colors.grey,
        // borderTopColor: todoColor,
        borderRadius: 10,
        height: CARD_HEIGHT,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowRadius: 50,
        elevation: 5,
      }}
    >
      <View style={[showstyles.row, { borderBottomWidth: 1, borderColor: '#CCC' }]}>
        <View style={[showstyles.box, { flex: 3.5 }]}>
          <View style={[showstyles.row]}>
            <View style={[showstyles.box, { flex: 3 }]}>
              <Text style={[showstyles.nameTxt]}>{content.cust_name}</Text>
            </View>
            <View style={[showstyles.box, { flex: 1 }]}>
              {ptpIcon(content.last_action_code)}
            </View>
          </View>
        </View>
      </View>
      <View style={[showstyles.row]}>
        <View style={showstyles.box}>
          <Text style={[showstyles.msgTxt]}>Hợp đồng:</Text>
        </View>
        <View style={[showstyles.box, { flex: 3.5 }]}>
          <View style={[showstyles.row]}>
            <View style={[showstyles.box, { flex: 3 }]}>
              <Text style={[showstyles.nameTxt, { fontWeight: 'normal' }]}>{content.appl_id}</Text>
            </View>
            <View style={[showstyles.box, { flex: 1 }]}>
            </View>
          </View>
        </View>
      </View>
      <View style={[showstyles.row]}>
        <View style={showstyles.box}>
          <Text style={showstyles.msgTxt}>Thanh toán:</Text>
        </View>
        <View style={[showstyles.box, { flex: 3.5 }]}>
          <View style={[showstyles.row]}>
            <View style={[showstyles.box, { flex: 3 }]}>
              {paidIcon(content.total_pay_amount)}
            </View>
            {/* <View style={[showstyles.box, { flex: 1 }]}>
              {followIcon(content.followed)}
            </View> */}
          </View>
        </View>
      </View>
      <View style={[showstyles.row]}>
        <View style={showstyles.box}>
          <Text style={showstyles.msgTxt}>Dư nợ gốc:</Text>
        </View>
        <View style={[showstyles.box, { flex: 3.5 }]}>
          <Text style={[showstyles.msgTxt, { fontWeight: 'bold', color: colors.info }]} >{moneyFormat(content.principle_outstanding)}</Text>
        </View>
      </View>
      <View style={[showstyles.row]}>
        <View style={showstyles.box}>
          <Text style={showstyles.msgTxt}>Địa chỉ:</Text>
        </View>
        <View style={[showstyles.box, { flex: 3.5 }]}>
          <Text style={showstyles.msgTxt} >{content.reg_address}</Text>
        </View>
      </View>
      {/* BEGIN BUTTONS */}
      <View style={[showstyles.btngroup]}>
        <View style={[showstyles.btn]}>
          <FontAwesome
            name='file-text-o'
            style={showstyles.logo}
            onPress={handleGetVsf}
          />
        </View>
        <View style={[showstyles.btn]}>
          <FontAwesome
            name='search'
            style={showstyles.logo}
            onPress={handleGetSkip}
          />
        </View>
        <View style={[showstyles.btn]}>
          <FontAwesome
            name={todoIcon}
            style={[showstyles.logo, { color: todoColor }]}
            onPress={handleChangeTodo}
          />
        </View>
        <View style={[showstyles.btn]}>
          <FontAwesome
            name="pencil"
            style={[showstyles.logo, { color: followedColor }]}
            onPress={handleRemark}
          />
        </View>
        <View style={[showstyles.btn]}>
          <FontAwesome5
            name="directions"
            style={showstyles.logo}
            onPress={handleMap}
          />
        </View>
        <View style={[showstyles.btn]}>
          <FontAwesome
            name="phone"
            style={showstyles.logo}
            onPress={handleCall}
          />
        </View>
      </View>
    </View >
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    apiChangeTodo: (config) => {
      dispatch({
        type: constAction.API_TODO_REQUEST,
        config
      });
    },
    changeTodo: (content) => {
      dispatch({
        type: constAction.CHANGE_TODO,
        content
      });
    },
    apiGetVsf: (config) => {
      dispatch({
        type: constAction.API_VSF_REQUEST,
        config
      });
    },

    apiGetSkip: (config) => {
      dispatch({
        type: constAction.API_SKIP_REQUEST,
        config
      });
    },
    setActiveVsf: (content) => {
      dispatch({
        type: constAction.APPLID_VSF_ACTIVE,
        content
      });
    },
    setActiveSkip: (content) => {
      dispatch({
        type: constAction.IDNO_SKIP_ACTIVE,
        content
      });
    },
    calTodoDash: (data) => {
      dispatch({
        type: constAction.CAL_TODO_DASH,
        data
      })
    },
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data.data,
    token: state.token,
    vsf: state.vsf
  }
}


const showstyles = StyleSheet.create({
  logo: {
    fontSize: 12,
    padding: 8,
    color: colors.grey
  },
  nameTxt: {
    marginLeft: 10,
    color: colors.black,
    fontSize: 11,
    width: 190,
    fontWeight: 'bold'
  },
  msgTxt: {
    color: colors.black,
    fontSize: 11,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
  },
  btngroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '80%',
    marginTop: 15,
    marginBottom: 5
  },
  btn: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(ContractDetailMap);