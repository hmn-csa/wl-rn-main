import {
  View, Text, Image, ScrollView, Alert, FlatList,
  StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions
} from 'react-native'
import { Button, Portal, Dialog } from 'react-native-paper';
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { styles, colors } from '../styles'
import axios from "axios"
import { actGetUptrails, actUpdateShowlist } from "../actions/index"

const { width, height } = Dimensions.get("window");
import * as consts from '../consts'
import { set } from 'react-native-reanimated';


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

  const [runtime, setRuntime] = useState(props.runtime)
  const [code, setCode] = useState(props.code)
  const [appl_id, setAppl_id] = useState(props.appl_id)
  const [cust_name, setCust_name] = useState(props.cust_name)
  const [pay_amount, setPayamount] = useState(props.pay_amount)
  const [remark, setRemark] = useState(props.remark)
  const [trust_address, setTrust_address] = useState(props.trust_address)
  const [next_visit_time, setnext_visit_time] = useState(props.next_visit_time)

  // const [image1, setimage1] = useState(props.image1 === null ? null : "data:image/png;base64," + props.image1)
  // const [image2, setimage2] = useState(props.image2 === null ? null : `data:image/png;base64,${props.image2}`)
  // const [image3, setimage3] = useState(props.image3 === null ? null : "data:image/png;base64," + props.image3)

  const [image1, setimage1] = useState((props.image1 === null || props.image1 === '') ? null : props.image1)
  const [image2, setimage2] = useState((props.image2 === null || props.image2 === '') ? null : props.image2)
  const [image3, setimage3] = useState((props.image3 === null || props.image3 === '') ? null : props.image3)


  const [openwide, setOpenwide] = useState(false);


  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);


  const [visibleImage, setVisibleImage] = useState(false);
  const showDialogImage = () => setVisibleImage(true);
  const hideDialogImage = () => setVisibleImage(false);
  const [activateImage, setActivateImage] = useState({ uri: null });

  const splitTime = (t) => t.substring(0, 10) + " " + t.substring(11, 19)

  const payAmount = (n) => {
    if (n != null & parseFloat(n, 10) > 0) {
      const money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
      // return <Text style={[stylesTrail.nameTxt, { color: colors.green }]}>Hứa trả: {money.substring(0, money.length - 2)} </Text>

      return <View style={[styles.row]}>
        <View style={[styles.box, { flex: 0.618 }]}>
          <Text style={stylesTrail.msgTxt} >Hứa trả:</Text>
        </View>
        <View style={[styles.box,]}>
          <Text style={[stylesTrail.msgTxt, { fontWeight: "bold", }]}>{money.substring(0, money.length - 2)}</Text>
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
      return <View style={[styles.row]}>
        <View style={[styles.box, { flex: 0.618 }]}>
          <Text style={stylesTrail.msgTxt} >Ngày hẹn:</Text>
        </View>
        <View style={[styles.box,]}>
          <Text style={[stylesTrail.msgTxt, { fontWeight: "bold", }]}>{nextTime(next_visit_time)}</Text>
        </View>
      </View>
  }

  const renCode = (code) => {
    if (['PTP', 'OBT', 'WFP', 'TER'].includes(code))
      return <Text
        style={[stylesTrail.remarkCode, { color: colors.green, }]}>{code}</Text>
    else return <Text
      style={[stylesTrail.remarkCode, { color: colors.secondary, }]}>{code}</Text>
  }


  const getCodeLabel = (code) => {
    var result = consts.REMARK_CODE.filter(obj => {
      return obj.value === code
    })
    return (result[0].label)
  }


  const images = (image1, image2, image3) => {
    if (image1 !== null || image2 !== null || image3 !== null)
      return (
        <View style={[buttonStyles.buttons, { backgroundColor: null }]}>

          <TouchableOpacity
            style={[buttonStyles.button, { backgroundColor: null, }]}
            onPress={() => {
              setActivateImage({ uri: image1 })
              showDialogImage()
            }}
          >
            <Image
              source={{ uri: image1 }}
              style={{
                width: 45,
                height: 60,
                borderRadius: 10
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[buttonStyles.button, { backgroundColor: null }]}
            onPress={() => {
              setActivateImage({ uri: image2 })
              showDialogImage()
            }}
          >
            <Image
              source={{ uri: image2 }}
              style={{
                width: 45,
                height: 60,
                borderRadius: 10
              }}

            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[buttonStyles.button, { backgroundColor: null }]}
            onPress={() => {
              setActivateImage({ uri: image3 })
              showDialogImage()
            }}
          >
            <Image
              source={{ uri: image3 }}
              style={{
                width: 45,
                height: 60,
                borderRadius: 10
              }}

            />
          </TouchableOpacity>


        </View>

      )
  }


  const renOpenItems = (isOpen) => {
    if (isOpen)
      return (
        <View style={{ marginTop: 10 }}>
          <View style={[styles.row]}>
            <View style={[styles.box, { flex: 0.618 }]}>
              <Text style={stylesTrail.msgTxt}>Remark</Text>
            </View>
            <View style={[styles.box,]}>
              <View style={[styles.row]}>
                <View style={[styles.box,]}>
                  <Text style={[stylesTrail.msgTxt,]}>{getCodeLabel(code)}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.row]}>
            <View style={[styles.box, { flex: 0.618 }]}>
              <Text style={stylesTrail.msgTxt}>Địa chỉ:</Text>
            </View>
            <View style={[styles.box,]}>
              <View style={[styles.row]}>
                <View style={[styles.box]}>
                  <Text style={stylesTrail.msgTxt}>{trust_address}</Text>
                </View>
              </View>
            </View>
          </View>


          {payAmount(pay_amount)}

          {reVisit(next_visit_time)}
          <View style={[styles.row]}>
            {images(image1, image2, image3)}
          </View>
        </View>
      )

  }

  return (
    <View style={{
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 15,
      borderColor: colors.lightGray,
      marginTop: 5,
    }}>

      <TouchableOpacity
        style={{ padding: 10 }}
        onLongPress={() => handleShow([{ appl_id: props.appl_id, cust_name: props.cust_name }])}
        onPress={() => {
          openwide ? setOpenwide(false) : setOpenwide(true)
        }}
      >

        <View style={styles.row}>
          <View style={[styles.box, { flex: 0.618 }]}>
            <Text style={[stylesTrail.nameTxt, { fontWeight: 'bold' }]}>Hợp đồng: </Text>
          </View>
          <View style={[styles.box]}>
            <Text style={[stylesTrail.nameTxt, { fontWeight: 'bold' }]}>{appl_id}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.box, { flex: 0.618 }]}>
            <Text style={[stylesTrail.nameTxt, { fontWeight: 'bold' }]}>Code: </Text>
          </View>
          <View style={[styles.box]}>
            {renCode(code)}
          </View>
        </View>


        <View style={styles.row}>
          <View style={[styles.box, { flex: 0.618 }]}>
            <Text style={[stylesTrail.nameTxt, { fontWeight: 'bold' }]}>Khách hàng: </Text>
          </View>
          <View style={[styles.box]}>
            <Text style={stylesTrail.nameTxt}>{cust_name}</Text>
          </View>
        </View>


        <View style={[styles.row]}>
          <View style={[styles.box, { flex: 0.618 }]}>
            <Text style={[stylesTrail.nameTxt, { fontWeight: 'bold' }]}>ghi chú:</Text>
          </View>
          <View style={[styles.box,]}>
            <View style={[styles.row]}>
              <View style={[styles.box,]}>
                <Text style={[stylesTrail.msgTxt,]}>{remark}</Text>
              </View>
            </View>
          </View>
        </View>



        {renOpenItems(openwide)}

        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text style={{ textAlign: 'right', fontSize: 9 }}>{splitTime(runtime)}</Text>
          </View>
        </View>


        <Portal style={[styles.container, { height: 600 }]}>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <View style={{ height: 600 }}>
                <ImageShow image={image1}></ImageShow>
                <ImageShow image={image2}></ImageShow>
                <ImageShow image={image3}></ImageShow>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                style={buttonStyles.button}
                mode="contained"
                onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>



        <Portal style={[{ width: width, height: height }]}>
          <Dialog visible={visibleImage} onDismiss={hideDialogImage}>
            <Dialog.Content>
              <ScrollView>

                <Image
                  source={activateImage}
                  style={{
                    height: 400,
                    flex: 1,
                    width: null
                  }}
                  resizeMode="contain"
                />

              </ScrollView>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialogImage}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>


      </TouchableOpacity>
    </View>
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
      dispatch(actGetUptrails(config))
    },
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
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
    width: 190,
  },
  msgTxt: {
    fontWeight: '400',
    // color: colors.textcolor,
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

