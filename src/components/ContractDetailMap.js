
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import {
  View, Text, Image, Button, StyleSheet,
  Alert, Linking, Platform, Dimensions,
  TouchableOpacity
} from 'react-native'

import * as constAction from '../consts'
import { colors } from '../styles'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

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

  const handleAsyncChangeTodo = () => {
    let todo_value = isTodo === 1 ? 0 : 1
    let config = {
      token: props.token,
      appl_id: content.appl_id,
      todo_value: todo_value
    }
    setTodoContent(todo_value)
    setTodoColor(todo_value === 1 ? colors.danger : colors.grey)
    setTodoIcon(todo_value === 1 ? 'heart' : 'heart-o')
    props.apiChangeTodo(config)
  }

  const handleGetVsf = () => {
    const cur_active = props.vsfs.filter(
      item => item.appl_id === content.appl_id
    )[0]
    if (cur_active) {
      props.setActiveVsf(cur_active)
    }
    else {
      const config = {
        'appl_id': content.appl_id,
        'token_value': props.token
      }
      props.apiGetVsf(config)
    }
    props.navigation.navigate('Vsf')
  }

  const handleGetSkip = () => {
    if (props.skips.map(appl => appl.id_no).includes(content.id_no)) {
      props.setActiveSkip(
        props.skips.filter(appl => appl.id_no === content.id_no)[0]
      )
    }
    else {
      const config = {
        'id_no': content.id_no,
      }
      props.apiGetSkip(config)
    }
    props.navigation.navigate('Skip')

  }

  const cardstyle =
    props.type != 'map' ? {
      backgroundColor: 'white',
      padding: 5,
      borderWidth: 0,
      borderColor: colors.grey,
      borderRadius: 10,
      height: CARD_HEIGHT,
      marginBottom: 10,
      shadowColor: '#CCC',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 1,
    }
      :
      {
        backgroundColor: 'white',
        padding: 5,
        borderWidth: 0,
        borderColor: colors.grey,
        borderRadius: 10,
        height: CARD_HEIGHT,
        marginBottom: 10,
      }

  const handleGetUptrail = () => {
    const config = {
      loadapplid: content.appl_id,
      token: props.token
    }
    props.apiGetUptrail(config)
  }

  const handleRemark = () => {
    props.setActiveVsf(content)
    props.navigation.navigate('Remark')
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

  if (props.data[contractId] === undefined)
    return <View></View>
  return (
    <View
      style={cardstyle}
    >
      <View style={[showstyles.row, { borderBottomWidth: 1, borderColor: '#CCC' }]}>
        <View style={[showstyles.box, { flex: 3.5 }]}>
          <View style={[showstyles.row]}>
            <View style={[showstyles.box, { flex: 3 }]}>
              <Text style={[showstyles.nameTxt]}>{content.cust_name}</Text>
            </View>
            <View style={[showstyles.box, { flex: 1 }]}>
              {ptpIcon(props.data[contractId].last_action_code)}
            </View>
          </View>
        </View>
      </View>
      <View style={[showstyles.row]}>
        <View style={showstyles.box}>
          <Text style={[showstyles.msgTxt]}>App_id:</Text>
        </View>
        <View style={[showstyles.box, { flex: 3.5 }]}>
          <View style={[showstyles.row]}>
            <View style={[showstyles.box, { flex: 3 }]}>
              <Text style={[showstyles.nameTxt, { fontWeight: 'normal' }]}>{content.app_id}</Text>
            </View>
            <View style={[showstyles.box, { flex: 1 }]}></View>
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
      <View style={[showstyles.row]} >
        <View style={showstyles.box}>
          <Text style={showstyles.msgTxt}>Địa chỉ:</Text>
        </View>
        <View style={[showstyles.box, { flex: 3.5, flexShrink: 1 }]}>
          <Text style={showstyles.msgTxt} >{content.reg_address}</Text>
        </View>
      </View>

      {/* BEGIN BUTTONS */}
      <View style={[showstyles.btngroup]}>
        <TouchableOpacity
          style={[showstyles.btn]}
          onPress={handleGetVsf}
        >
          <FontAwesome
            name='file-text-o'
            style={showstyles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[showstyles.btn]}
          onPress={handleGetSkip}
        >
          <FontAwesome
            name='search'
            style={showstyles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[showstyles.btn, { borderColor: todoColor }]}
          onPress={handleAsyncChangeTodo}>
          <FontAwesome
            name={todoIcon}
            style={[showstyles.logo, { color: todoColor }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[showstyles.btn, { borderColor: followedColor }]}
          onPress={handleRemark}
        >
          <FontAwesome
            name="pencil"
            style={[showstyles.logo, { color: followedColor }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[showstyles.btn]}
          onPress={handleMap}>
          <FontAwesome5
            name="directions"
            style={showstyles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[showstyles.btn]}
          onPress={handleCall}>
          <FontAwesome
            name="phone"
            style={showstyles.logo}
          />
        </TouchableOpacity>
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
    token: state.token.token.access,
    vsfs: state.vsf.vsfs,
    skips: state.vsf.skips,
  }
}


const showstyles = StyleSheet.create({
  logo: {
    fontSize: 15,
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