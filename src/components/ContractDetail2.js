
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import {
  View, Text, Image, Button, StyleSheet, Alert, Linking, Platform
} from 'react-native'

import {
  actGetVsfSaga, actSetActiveApplId, actChangeToDo,
  actChangeTodoSaga, calTodoDash,
} from "../actions"
import { styles, colors } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";


import { moneyFormat } from '../functions'

function ContractDetailMap(props) {

  const [contractId, setcontractId] = useState(props.contractId)
  const [content, setContent] = useState(props.data[contractId])
  const [isTodo, setTodoContent] = useState(props.data[contractId].todo_flag)
  const [todoColor, setTodoColor] = useState(props.data[contractId].todo_flag === 1 ? 'white' : '#f7f7f7')
  const [todoIconColor, setTodoIconColor] = useState(props.data[contractId].todo_flag === 1 ? colors.secondary : 'black')

  
  //const [token, setToken] = useState(props.token)
  //console.log(token.token.access)

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
      setTodoColor(responseTodo === 1 ? 'white' : '#f7f7f7')
      setTodoIconColor(responseTodo === 1 ? colors.secondary : 'black')
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

  const handleRemark = () => {
    props.setActiveVsf(content)
    props.navigation.navigate('Remark')

  }

  const handleSkip = () => {
    props.setActiveVsf(content)
    props.navigation.navigate('Skip')
  }

  const handleMap = () => {
    //10.7773952,106.6893312
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

  const todoIcon = (istodo) => {
    if (istodo == 1)
      return <Ionicons
        name="ios-bulb"
        style={[showstyles.logo, { color: colors.primary, textAlign: 'right' }]}
      />
  }
  const paidIcon = (paid) => {
    if (paid > 0){
      //const value = paid.toLocaleString().split(".")[0]
      const valuex =  parseFloat(paid, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
      const value = valuex.substring(0, valuex.length -2)

      return <Text style={[showstyles.nameTxt,{color:colors.green}]}>{value}</Text>
    }
    else return <Text style={[showstyles.nameTxt,{color:colors.secondary,}]}>{paid}</Text>
    
  }

  const ptpIcon = (lastCode) => {
    if (['PTP', 'OBT', 'WFP', 'TER'].includes(lastCode))
      return <Text 
      style={{
        fontWeight:"bold",
        fontSize:15,
        color: colors.green,
        textAlign: 'right'}}>{lastCode}</Text>
    else return <Text 
      style={{
        fontWeight:"bold",
        fontSize:15,
        color: colors.secondary,
        textAlign: 'right'}}>{lastCode}</Text>
  }

  const followIcon = (isFollowed) => {
    if (isFollowed == 1)
      return <Text 
      style={{
        fontWeight:"bold",
        fontSize:9,
        color:'orange',
        textAlign: 'right'}}>Followed</Text>
  }
  
  return (
    <View
      style={{
        backgroundColor: todoColor,
        padding: 5,
        borderWidth: 1,
        borderColor:colors.lightGray,
        borderRadius:10
      }}
    >
      <View style={[styles.row]}>
        <View style={styles.box}>
          <Text style={showstyles.msgTxt}>Hợp đồng:</Text>
        </View>
        <View style={[styles.box, { flex: 3.5 }]}>
          <View style={[styles.row]}>
            <View style={[styles.box, { flex: 3 }]}>
              <Text style={showstyles.nameTxt}>{content.appl_id}</Text>
            </View>
            <View style={[styles.box, { flex: 1 }]}>
              {todoIcon(isTodo)}
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.row]}>
        <View style={styles.box}>
          <Text style={showstyles.msgTxt}>Tên KH:</Text>
        </View>
        <View style={[styles.box, { flex:3.5 }]}>
          <View style={[styles.row]}>
            <View style={[styles.box, { flex: 3 }]}>
              <Text style={showstyles.nameTxt}>{content.cust_name}</Text>
            </View>
            <View style={[styles.box, { flex: 1 }]}>
              {ptpIcon(content.last_action_code)}
            </View>
          </View>
        </View>
      </View>
      
      <View style={[styles.row]}>
        <View style={styles.box}>
            <Text style={showstyles.msgTxt}>Thanh toán:</Text>
        </View>
        <View style={[styles.box, { flex:3.5 }]}>
          <View style={[styles.row]}>
            <View style={[styles.box, { flex: 3 }]}>
              {paidIcon(content.total_pay_amount)}
            </View>
            <View style={[styles.box, { flex: 1 }]}>
              {followIcon(content.followed)}
            </View>
          </View>
        </View>
      </View>
      
      <View style={[styles.row]}>
        <View style={styles.box}>
          <Text style={showstyles.msgTxt}>Đư nợ gốc:</Text>
        </View>
        <View style={[styles.box, { flex: 3.5 }]}>
          <Text style={showstyles.msgTxt} >{moneyFormat(content.principle_outstanding)}</Text>
        </View>
      </View>
      
      <View style={[styles.row]}>
        <View style={styles.box}>
          <Text style={showstyles.msgTxt}>Địa chỉ:</Text>
        </View>
        <View style={[styles.box, { flex: 3.5 }]}>
          <Text style={showstyles.msgTxt} >{content.reg_address}</Text>
        </View>
      </View>


      {/* BEGIN BUTTONS */}
      <View style={[styles.row]}>
        <View style={[styles.box]}>
          <Ionicons
            name='ios-document'
            style={showstyles.logo}
            onPress={handleGetVsf}
          />
        </View>

        <View style={[styles.box]}>
          <Ionicons
            name='ios-search'
            style={showstyles.logo}
            onPress={handleSkip}
          />
        </View>

        <View style={[styles.box]}>
          <Ionicons
            name='ios-add-circle'

            style={[showstyles.logo, { color: todoIconColor }]}
            onPress={handleChangeTodo}
          />
        </View>
        <View style={[styles.box]}>
          <Ionicons
            name="ios-brush"
            style={showstyles.logo}
            onPress={handleRemark}
          />
        </View>
        <View style={[styles.box]}>
          <Ionicons
            name="ios-pin"
            style={showstyles.logo}
            onPress={handleMap}
          />
        </View>
        <View style={[styles.box]}>
          <Ionicons
            name="ios-call"
            style={showstyles.logo}
            onPress={handleCall}
          />
        </View>
        <View style={[styles.box]}></View>
      </View>

    </View>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    apiChangeTodo: (config) => {
      dispatch(actChangeTodoSaga(config));
    },
    changeTodo: (content) => {
      dispatch(actChangeToDo(content));
    },

    apiGetVsf: (config) => {
      dispatch(actGetVsfSaga(config));
    },
    setActiveVsf: (appl_id) => {
      dispatch(actSetActiveApplId(appl_id));
    },

    calTodoDash: (data) => {
      dispatch(calTodoDash(data))
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
    fontWeight: "bold",
    fontSize: 25,
    paddingRight: 8,
    paddingLeft: 8,
  },
  nameTxt: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#222',
    fontSize: 13,
    width:190,
  },
  msgTxt: {
    fontWeight: '400',
    color: colors.textcolor,
    fontSize: 11,
    marginLeft: 10,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ContractDetailMap);