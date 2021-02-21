import {
  View, Text, Image, ScrollView, Alert, FlatList,
  StyleSheet, TouchableOpacity, Dimensions, Modal
} from 'react-native'
import { Button, Portal, Dialog } from 'react-native-paper';
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { styles, colors } from '../styles'
import { actGetUptrails, actUpdateShowlist } from "../actions/index"
const { width, height } = Dimensions.get("window");
import * as consts from '../consts'
import { set, color } from 'react-native-reanimated';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import ImageView from 'react-native-image-view';




function ImageShow(props) {
  const [image, setimage] = useState(props.image)
  if (image !== null)
    return (
      <View style={[styles.row, { padding: 5, height: 160, width: 160 }]}>
        <Image
          style={[styles.row, { height: 150, width: 150 }]}
          source={{ uri: image }} />
      </View>
    )
  return (
    <View></View>
  )

}


function Uptrail(props) {
  const [item, setItem] = useState(props.item)
  const [runtime, setRuntime] = useState(item.runtime)
  const [code, setCode] = useState(item.code)
  const [appl_id, setAppl_id] = useState(item.appl_id)
  const [cust_name, setCust_name] = useState(item.cust_name)
  const [pay_amount, setPayamount] = useState(item.pay_amount)
  const [remark, setRemark] = useState(item.remark)
  const [trust_address, setTrust_address] = useState(item.trust_address)
  const [next_visit_time, setnext_visit_time] = useState(item.next_visit_time)
  const [image1, setimage1] = useState((item.image1 === null || item.image1 === "") ? null : item.image1)
  const [image2, setimage2] = useState((item.image2 === null || item.image2 === "") ? null : item.image2)
  const [image3, setimage3] = useState((item.image3 === null || item.image3 === "") ? null : item.image3)
  const [openwide, setOpenwide] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [visibleAddress, setVisibleAddress] = useState(false);
  // const showDialogImage = () => setVisibleImage(true);
  // const hideDialogImage = () => setVisibleImage(false);
  const [activateImage, setActivateImage] = useState({ uri: null });
  //const splitTime = (t) => t.substring(0, 10) + " " + t.substring(11, 19)
  const splitDate = (t) => t.substring(0, 10)
  const splitTime = (t) => t.substring(11, 19)
  const payAmount = (n) => {
    if (n != null & parseFloat(n, 10) > 0) {
      const money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
      return <View style={{ flexDirection: 'row', backgroundColor: 'rgba(255,216,89,0.3)', borderRadius: 30, padding: 8, paddingTop: 2, paddingBottom: 2 }}>
        <View>
          <Text style={{ fontSize: 12 }}>Hứa trả:</Text>
        </View>
        <View>
          <Text style={{ fontSize: 12 }}> {money.substring(0, money.length - 2)}</Text>
        </View>
      </View>
    }
  }

  const nextTime = (t) => {
    if (t != null)
      return t.substring(0, 10)
  }

  const handleShow = (list) => {
    props.updateShowlist(list)
    props.navigation.navigate('Portfolio', { screen: 'List' })
  }


  const reVisit = (next_visit_time) => {
    if (next_visit_time != null)
      return <View style={{ flexDirection: 'row', backgroundColor: 'rgba(255,216,89,0.3)', borderRadius: 30, padding: 8, paddingTop: 2, paddingBottom: 2 }}>
        <View>
          <Text style={{ fontSize: 12 }}>Ngày hẹn: </Text>
        </View>
        <View>
          <Text style={{ fontSize: 12 }}>{nextTime(next_visit_time)}</Text>
        </View>
      </View>
  }

  const NotePM = (result) => {
    if (result == 'paid')
      return (
        <View style={{ flexDirection: 'row', backgroundColor: 'rgba(9,135,101,0.3)', borderRadius: 30, padding: 8, paddingTop: 2, paddingBottom: 2 }}>
          <Text style={{ fontSize: 12, color: colors.success, fontWeight: 'bold' }}>Đã thanh toán</Text>
        </View>
      )
    else
      return (
        <View style={{ flexDirection: 'row', backgroundColor: 'rgba(249,60,26,0.3)', borderRadius: 30, padding: 8, paddingTop: 2, paddingBottom: 2 }}>
          <Text style={{ fontSize: 12, color: colors.danger, fontWeight: 'bold' }}>Chưa thanh toán</Text>
        </View>
      )
  }

  const NoteAddress = (result) => {
    if (result == 'Per')
      return (
        <TouchableOpacity
          style={{ flexDirection: 'row', borderColor: 'rgba(9,135,101,0.8)', borderWidth: 1, borderRadius: 30, padding: 8, paddingTop: 2, paddingBottom: 2 }}
          onPress={() => setVisibleAddress(true)}>
          <FontAwesome5 name="home" style={{ paddingTop: 3 }} size={10} color={colors.success} /><Text style={{ fontSize: 12, color: colors.success, fontWeight: 'bold' }}> Hộ khẩu</Text>
        </TouchableOpacity>
      )
    else
      return (
        <TouchableOpacity
          style={{ flexDirection: 'row', borderColor: 'rgba(249,60,26,0.8)', borderWidth: 1, borderRadius: 30, padding: 8, paddingTop: 2, paddingBottom: 2 }}
          onPress={() => setVisibleAddress(true)}>
          <FontAwesome5 name="home" style={{ paddingTop: 3 }} size={10} color={colors.danger} /><Text style={{ fontSize: 12, color: colors.danger, fontWeight: 'bold' }}> Khác</Text>
        </TouchableOpacity>
      )
  }

  const renCode = (code) => {
    if (['PTP', 'F_OBT', 'WFP', 'TER'].includes(code))
      return <Text
        style={[stylesTrail.remarkCode, { color: colors.success, }]}>{code}</Text>
    else return <Text
      style={[stylesTrail.remarkCode, { color: colors.secondary, }]}>{code}</Text>
  }
  const getCodeLabel = (code) => {
    var result = consts.REMARK_CODE.filter(obj => {
      return obj.value === code
    })
    return (result[0].label)
  }

  const haveimages = (image1, image2, image3) => {
    if (image1 !== null || image2 !== null || image3 !== null)
      return true
    else
      return false
  }
  const images = (image1, image2, image3) => {
    if (image1 !== null || image2 !== null || image3 !== null)
      return (
        <View style={[buttonStyles.buttons, { backgroundColor: null }]}>
          <TouchableOpacity
            style={[buttonStyles.button, { backgroundColor: null, }]}
            onPress={() => {
              setActivateImage({ uri: image1 })
              setIsVisibleImage(true)
            }}
          >
            <Image
              source={{ uri: image1 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[buttonStyles.button, { backgroundColor: null }]}
            onPress={() => {
              setActivateImage({ uri: image2 })
              setIsVisibleImage(true)
            }}
          >
            <Image
              source={{ uri: image2 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[buttonStyles.button, { backgroundColor: null }]}
            onPress={() => {
              setActivateImage({ uri: image3 })
              setIsVisibleImage(true)
            }}
          >
            <Image
              source={{ uri: image3 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10
              }}
            />
          </TouchableOpacity>
        </View>
      )
  }
  const renderImg = [
    {
      source: {
        uri: activateImage.uri,
      },
      title: 'Paris',
      width: 806,
      height: 720,
    },
  ];


  const cardStyle = props.type === "marker" ? {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
    borderColor: colors.lightGray,
    padding: 10,
  } : {
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 15,
      borderColor: colors.lightGray,
      margin: 5,
      padding: 10,
    }
  return (
    <View
      style={cardStyle}
      onPress={() => {
        openwide ? setOpenwide(false) : setOpenwide(true)
      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
        <View>
          <Text style={[stylesTrail.nameTxt]}>{splitDate(runtime)}</Text>
        </View>
        <View>
          <Text style={[stylesTrail.nameTxt, { textAlign: 'right' }]}>{splitTime(runtime)}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
        <View>
          <Text style={[stylesTrail.nameTxt, { fontWeight: 'bold', color: colors.info }]}>{getCodeLabel(code)}</Text>
        </View>
        <View>
          {['PTP', 'OBT', 'WFP', 'TER'].includes(code) ? NotePM('paid') : NotePM('nopaid')}
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
        <View>
          <Text style={[stylesTrail.nameTxt,]}>{cust_name}</Text>
        </View>
        <View>
          <Text style={[stylesTrail.nameTxt, { textAlign: 'right' }]}>{appl_id}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
        <View>
          <Text style={[stylesTrail.nameTxt]}>{payAmount(pay_amount)}</Text>
        </View>
        <View>
          <Text style={[stylesTrail.nameTxt, { textAlign: 'right' }]}>{reVisit(next_visit_time)}</Text>
        </View>
      </View>
      {remark != "" ?
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <View>
            <Text style={[stylesTrail.nameTxt]}>Ghi chú : {remark}</Text>
          </View>
        </View>
        : null}

      <View style={[stylesTrail.btngroup]}>
        {haveimages(image1, image2, image3) == true ?
          <TouchableOpacity style={[stylesTrail.btn, { borderColor: colors.info }]} onPress={() => { setVisible(true) }}>
            <FontAwesome5
              name='images'
              style={[stylesTrail.logo, { color: colors.info }]}
            />
            {/* <Text style={{ padding: 5, fontSize: 12, color: colors.info, fontWeight: 'bold' }}> Hình ảnh</Text> */}
          </TouchableOpacity>
          :
          <View style={[stylesTrail.btn]}>
            <FontAwesome5
              name='images'
              style={[stylesTrail.logo]}
            />
            {/* <Text style={{ padding: 5, fontSize: 12, color: colors.grey, fontWeight: 'bold' }}> Hình ảnh</Text> */}
          </View>
        }


        <View>
          {['PTP', 'OBT', 'WFP', 'TER'].includes(code) ? NoteAddress('Per') : NoteAddress('Other')}
        </View>
      </View>
      <Portal style={[styles.container, { height: 500 }]}>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ borderRadius: 10 }}>
          <Dialog.Content style={{ padding: 0 }}>
            {images(image1, image2, image3)}
          </Dialog.Content>
          <Dialog.Actions style={{ padding: 0 }}>
            <TouchableOpacity
              style={{ borderTopWidth: 1, borderColor: colors.grey, width: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 5 }}
              onPress={hideDialog}>
              <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>Đóng</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <ImageView
        images={renderImg}
        imageIndex={0}
        isVisible={isVisibleImage}
        onClose={() => setIsVisibleImage(false)}
        animationType="slide"
        isSwipeCloseEnabled={false}
      />

      <Portal style={{ height: 500 }}>
        <Dialog visible={visibleAddress} onDismiss={visibleAddress} style={{ borderRadius: 10 }}>
          <Dialog.Content>
            <Text>
              {trust_address}
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{ padding: 0 }}>
            <TouchableOpacity
              style={{ borderTopWidth: 1, borderColor: colors.grey, width: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 5 }}
              onPress={() => setVisibleAddress(false)}>
              <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>Đóng</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View >
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token.token.access,
    uptrails: state.uptrails.uptrails,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getUptrails: (config) => {
      dispatch({
        type: constAction.API_UPTRAIL_REQUEST,
        config
      })
    },
    updateShowlist: (content) => {
      dispatch({
        type: constAction.UPDATE_SHOWLIST,
        content,
      })
    },
  }
}

const stylesTrail = StyleSheet.create({
  container: {
    backgroundColor: "#DCDCDC",
  },
  eventList: {
    marginTop: 20,
  },
  nameTxt: {
    marginLeft: 5,
    fontSize: 12,
  },
  msgTxt: {
    fontWeight: '400',
    fontSize: 11,
    marginLeft: 5,
  },
  eventBox: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  eventDate: {
    flexDirection: 'column',
  },
  eventDay: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: "600",
  },
  eventMonth: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: "600",
  },
  eventContent: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10
  },
  remarkCode: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 4
  },
  description: {
    paddingBottom: 10,
    marginRight: 10,
    fontSize: 15,
    color: "#646464",
  },
  eventTime: {
    fontSize: 18,
    color: "#151515",
  },
  userName: {
    fontSize: 18,
    color: "#151515",
    paddingTop: 10
  },
  btngroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    marginRight: 20,
    flexDirection: 'row'
  },
  logo: {
    fontSize: 16,
    padding: 5,
    color: colors.grey
  },
});

const buttonStyles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 2,
  },
  button: {
    marginLeft: 2,
    borderRadius: 10,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Uptrail);

