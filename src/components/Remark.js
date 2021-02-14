import React, { useState, useEffect } from 'react';
import {
  Image, ScrollView, View, Text, Dimensions, TouchableOpacity,
  Platform, StyleSheet, Alert, ActivityIndicator, TextInput
} from 'react-native';
import { connect } from "react-redux"
import { styles as masterStyle, colors } from '../styles'
import DatePicker from 'react-native-datepicker'
import * as ImagePicker from 'expo-image-picker';

import {
  Button, Paragraph,
  Dialog, Portal, RadioButton
} from 'react-native-paper';

import * as Location from 'expo-location';

import { Camera } from 'expo-camera';


import { EMPTYIMAGE } from '../images';

import {
  actUpdateShowlist, calTodoDash, calTotalDash,
  calTreeDash, calCateDash, actChangeFollow,
  actUserUptrails
} from "../actions"
import * as consts from '../consts'

const { width, height } = Dimensions.get("window");

function Remark(props) {



  //===============================================sd


  const [newAddress, setNewAddress] = useState(props.vsf.activeApplId.new_address)
  const addressItems = [
    { label: `Thường trú : ${props.vsf.activeApplId.reg_address}`, value: props.vsf.activeApplId.reg_address },
    { label: `Tạm trú : ${props.vsf.activeApplId.act_address}`, value: props.vsf.activeApplId.act_address },
  ]
  if (props.vsf.activeApplId.new_address != null && props.vsf.activeApplId.new_address != "")
    addressItems.push({ label: newAddress, value: newAddress })

  const [uptrailStatus, setUptrailStatus] = useState(false);
  const [cust_name, setcust_name] = useState(props.vsf.activeApplId.cust_name)
  // Location 
  const [location, setLocation] = useState(null);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const [images, setImages] = useState([]);
  const [activateImage, setActivateImage] = useState({ uri: null });

  const [personContact, setPersonContact] = useState(null)
  const [remark, setRemark] = useState('')
  const [address, setAddress] = useState('')
  const [code, setCode] = useState(null)
  const [reDate, setRedate] = useState(null)
  const [payAmount, setPayAmount] = useState(null)

  const [visible, setVisible] = useState(false);
  const [visiblePayamount, setVisiblePayamount] = useState(false);
  const [visiblePerson, setVisiblePerson] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => {
    setVisible(false);
    //if (code == 'PTP' || code == 'WFP')
    //  setVisiblePayamount(true);
  };

  const hideDialogPayamount = () => setVisiblePayamount(false);

  const [visibleAddress, setVisibleAddress] = useState(false);
  const showDialogAddress = () => setVisibleAddress(true);
  const hideDialogAddress = () => setVisibleAddress(false);

  const [visibleImage, setVisibleImage] = useState(false);
  const showDialogImage = () => setVisibleImage(true);
  const hideDialogImage = () => setVisibleImage(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        Alert.alert('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // ========= Render label ============// 
  const renPersonContact = (personContact) => {
    if (!personContact)
      return <View></View>
    return <View style={{ width: '95%', }}>
      <Text style={styles.subLabel}>{consts.PERSON_CONTACT.filter(item => item.value == personContact)[0].label}</Text>
    </View>
  }


  const renRemarkCode = (code) => {
    if (!code)
      return <View></View>
    return <View style={{ width: '95%', }}>
      <Text style={[styles.subLabel]}>{consts.REMARK_CODE.filter(item => item.value == code)[0].label}</Text>
    </View >
  }

  const renPromisePTP = (payAmount) => {

    if (!payAmount)
      return <View></View>

    return <View style={{ width: '95%', }}>
      <Text style={[styles.subLabel, { color: colors.green, opacity: 1, fontWeight: "800" }]}>{moneyFormat(payAmount)} vnđ</Text>
    </View>
  }

  const renAddress = (address) => {
    if (!address)
      return <View></View>

    let curAddress = addressItems.filter(item => item.value == address)
    if (curAddress.length > 0)
      return <View style={{ width: '95%', }}>
        <Text style={styles.subLabel}>{curAddress[0].label}</Text>
      </View>
    return <View style={{ width: '95%', }}>
      <Text style={styles.subLabel}>Địa chỉ mới : {address}</Text>
    </View>
  }

  const getAddressType = (address) => {
    if (address == addressItems[0].value && address == addressItems[1].value)
      return 'same_address';
    if (address == addressItems[0].value)
      return 'reg_address';
    if (address == addressItems[1].value)
      return 'act_address';
    return 'orther_address';
  }

  // ======== Render Image ===========//
  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      base64: true,
      // aspect: [4, 3],
      quality: 0.1,
    });
    if (!result.cancelled) {
      setImage1(result);
    }
  };

  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsEditing: true,
      aspect: [3, 4],
      base64: true,
      quality: 0.1,

    });
    if (!result.cancelled) {
      if (images.length < 3)
        setImages([...images, result]);
      else {
        images.shift()
        setImages([...images, result]);
      }

    }
  };

  // const pickImage3 = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: false,
  //     // aspect: [4, 3],
  //     base64: true,
  //     quality: 0.1,
  //   });
  //   if (!result.cancelled) {
  //     setImage3(result);
  //   }
  // };

  const pickImage3 = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      // allowsEditing: true,
      aspect: [3, 4],
      base64: true,
      quality: 0.1,
    });
    if (!result.cancelled) {
      if (images.length < 3)
        setImages([...images, result]);
      else {
        images.shift()
        setImages([...images, result]);
      }

    }
  };




  const handleCommit = async () => {

    if (address == '')
      return Alert.alert('Vui lòng chọn địa chỉ viếng thăm')
    // if (remark == '')
    //   return Alert.alert('Vui lòng nhập ghi chú')
    if (code == null)
      return Alert.alert('Vui lòng chọn mã viếng thăm')

    setUptrailStatus(true)
    let locationCurrrent = await Location.getCurrentPositionAsync({});
    setLocation(locationCurrrent);



    let imageSet = {}
    for (let j = 0; j < images.length; j++) {
      imageSet[`image${j + 1}`] = "data:image/png;base64," + images[j].base64
      //imageSet = {...imageSet , ...newImage}
    }
    let config = {
      ...imageSet,
      'token_value': props.token.token.access,
      'appl_id': props.vsf.activeApplId.appl_id,
      'cust_name': cust_name,
      'code': code,
      'trust_address': address,
      'type_address': getAddressType(address),
      'remark': remark,
      'pay_amount': payAmount,
      'next_visit_time': reDate,
      'lat': location.coords.latitude,
      'lon': location.coords.longitude,
      'person_contact': personContact,
      // 'image1': image1 === null ? null : "data:image/png;base64," + image1.base64,
      // 'image2': image2 === null ? null : "data:image/png;base64," + image2.base64,
      // 'image3': image3 === null ? null : "data:image/png;base64," + image3.base64,
    }
    try {
      //console.log(config)
      await props.userUptrails(config);

      await props.actChangeFollow({
        'appl_id': props.vsf.activeApplId.appl_id,
        'code': code
      })
      await props.calAll(props.data)
      // props.updateShowlist(props.showlists )
      const curList = props.showlists;
      await props.updateShowlist([])
      await props.updateShowlist(curList)
      Alert.alert(`Cập nhâp Uptrail thành công !`)
      setUptrailStatus(false)
      await props.navigation.navigate('Portfolio', { screen: 'List' });

    } catch (error) {
      setUptrailStatus(false)
      console.error(error);
      Alert.alert(`Có lỗi sảy ra, vui lòng thực hiện lại !!!`)
    }
  }


  const moneyFormat = n => {
    //return  n.toLocaleString().split(".")[0]
    const money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
    return money.substring(0, money.length - 2)
  }

  const renImages = () => {
    let showImages = [...images]
    for (let j = 0; j < 3 - images.length; j++) {
      showImages.push(EMPTYIMAGE)
    }
    //console.log(showImages)

    return <View
      style={[styles.row, styles.buttons,]}>
      {
        showImages.map((image, index) =>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: null }]}
            key={index}
            onPress={() => {
              setActivateImage(image)
              showDialogImage()
            }}>
            <Image
              source={image}
              style={{
                width: width * 0.8 / 3,
                height: (width * 0.8 / 3) * 4 / 3
              }}
              onLoadStart={() => <ActivityIndicator size={10} color='black' />}
            />
          </TouchableOpacity>
        )
      }

    </View>
  }

  const loading = (status) => {
    if (status)
      return <View style={[styles.row, { alignItems: 'center' }]}>
        <Text>Đang tải lên ... </Text>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
  }

  const ortherAddress = () => {
    if (![props.vsf.activeApplId.act_address, props.vsf.activeApplId.reg_address].includes(address))
      return <TextInput
        mode="flat"
        label="Dia chi khac"
        onChangeText={setAddress}
      />
    else return <Text> {address}</Text>
  }

  if (props.uptrails.userFetching || uptrailStatus)
    return <View style={[styles.row, { alignItems: 'center' }]}>
      <Text>Up Loading ... </Text>
      <ActivityIndicator size={100} />
    </View>
  else
    return (
      <ScrollView style={[{ flex: 1, backgroundColor: 'white' }]}>

        <Text style={[masterStyle.header, { alignItems: 'center' }]}>{props.vsf.activeApplId.cust_name}</Text>

        <View style={styles.row}>
          <Button
            mode="contained"
            style={[styles.box, styles.button, { backgroundColor: colors.secondary }]}
            labelStyle={styles.buttonLabel}
          >
            Hợp đồng: {props.vsf.activeApplId.appl_id}
          </Button>
        </View>

        {/* Ket qua vieng tham */}
        <View style={styles.blockInput}>
          <View style={styles.row}>
            <View style={[styles.box, styles.label]}>
              <Text>Người liên hệ: </Text>
            </View>
            <View style={[styles.box, { flex: 0.618 }]}>
              <Button
                mode="contained"
                onPress={() => setVisiblePerson(true)}
                style={[styles.button]}
                labelStyle={styles.buttonLabel}
              >
                {personContact}
              </Button>
            </View>
          </View>
          {renPersonContact(personContact)}

        </View>

        <View style={styles.blockInput}>
          <View style={styles.row}>
            <View style={[styles.box, styles.label]}>
              <Text>Kết quả: </Text>
            </View>
            <View style={[styles.box, { flex: 0.618 }]}>
              <Button
                mode="contained"
                onPress={showDialog}
                style={[styles.button]}
                labelStyle={styles.buttonLabel}
              >
                {code}
              </Button>
            </View>
          </View>
          {renRemarkCode(code)}
          {renPromisePTP(payAmount)}
        </View>

        <View style={styles.blockInput}>
          <View style={styles.row}>
            <View style={[styles.box, styles.label]}>
              <Text>Địa chỉ viếng thăm: </Text>
            </View>
            <View style={[styles.box, { flex: 0.618 }]}>
              <Button
                mode="contained"
                onPress={showDialogAddress}
                style={[styles.button]}
                labelStyle={styles.buttonLabel}
              >
                {getAddressType(address)}
              </Button>
            </View>
          </View>

          {renAddress(address)}
        </View>

        <View style={styles.blockInput}>
          <View style={styles.row}>
            <View style={[styles.box, styles.label,]}>
              <Text>Ngày viếng thăm lại: </Text>
            </View>
            <View style={[styles.box, styles.button, { flex: 0.618 }]}>
              <DatePicker
                date={reDate}
                mode="date"
                placeholder="Ngày"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                style={styles.buttonLabel}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 4,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 30,
                    borderWidth: 0,
                  },
                  dateText: {
                    fontWeight: "1000",
                    color: 'white'
                  }
                }}
                onDateChange={(date) => setRedate(date)}
              />
            </View>
          </View>
        </View>

        <View style={styles.blockInput}>
          <View style={styles.row}>
            <View style={[styles.box, styles.label]}>
              <Text>Ghi chú: </Text>
            </View>
          </View>
          <View style={styles.row}>
            <TextInput
              style={[styles.box, { color: colors.primary, paddingLeft: 3 }]}
              placeholder="Nhập ghi chú"
              value={remark}
              onChangeText={setRemark}
            />
          </View>
        </View>





        <Portal style={[styles.row]}>
          <Dialog visible={visiblePerson} onDismiss={() => setVisiblePerson(false)} style={{ width: null, }}>
            {/* <Button onPress={hideDialog}>Done</Button> */}
            <RadioButton.Group
              onValueChange={
                newValue => {
                  setPersonContact(newValue);
                }
              }
              value={personContact}>
              {
                consts.PERSON_CONTACT.map(item =>
                  <RadioButton.Item
                    key={item.value}
                    style={{ height: 45 }}
                    value={item.value}
                    label={item.label}
                    style={{ height: 40 }}
                    labelStyle={{
                      fontSize: 12,
                    }}
                    mode='android'
                  />
                )
              }
            </RadioButton.Group>

            <Dialog.Actions>
              <Button onPress={() => setVisiblePerson(false)}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal style={[styles.row]}>
          <Dialog visible={visible} onDismiss={hideDialog} style={{ width: null, height: height - 80 }}>
            {/* <Button onPress={hideDialog}>Done</Button> */}
            <ScrollView style={{ marginTop: 2 }}>
              <RadioButton.Group
                onValueChange={
                  newValue => {
                    setCode(newValue);
                    if (['PTP'].includes(newValue)) setVisiblePayamount(true);
                  }
                }
                value={code}>
                {
                  consts.REMARK_CODE.map(item =>
                    <RadioButton.Item
                      key={item.value}
                      value={item.value}
                      label={item.label}
                      style={{ height: 40 }}
                      labelStyle={{
                        fontSize: 12,
                      }}
                      mode='android'
                    />
                  )
                }
              </RadioButton.Group>

            </ScrollView>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal style={[styles.row, { width: width, height: height }]}>
          <Dialog visible={visiblePayamount} onDismiss={hideDialogPayamount}>
            <Dialog.Content>
              <TextInput
                placeholder="Nhập số tiền hứa thanh toán"
                value={payAmount}
                onChangeText={setPayAmount}
                style={{ borderRadius: 0, height: 40, padding: 5, borderBottomWidth: 0.2, }}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialogPayamount}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>





        <Portal style={[styles.row, { width: width, height: height }]}>
          <Dialog visible={visibleAddress} onDismiss={hideDialogAddress}>
            <Dialog.Content>
              <RadioButton.Group
                onValueChange={newValue => setAddress(newValue)} value={address}>
                {
                  addressItems.map(item =>
                    <RadioButton.Item
                      key={item.value}
                      value={item.value}
                      label={item.label}
                      labelStyle={{
                        fontSize: 12,
                        marginRight: 50
                      }}
                      mode='android'
                      style={{ height: 60 }}
                    />
                  )
                }
              </RadioButton.Group>

              <TextInput
                mode="flat"
                label="Dia chi khac"
                onChangeText={setAddress}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialogAddress}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>



        <View style={[styles.buttons]}>
          <Button
            icon="image"
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={pickImage2}>
            chọn hình
          </Button>
          <Button
            icon="camera"
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={pickImage3}>
            chụp mới
          </Button>
        </View>

        { renImages()}

        <Button
          mode="contained"
          style={[styles.button,]}
          labelStyle={styles.buttonLabel}
          onPress={handleCommit}>

          Xác nhận
        </Button>

        <Portal style={[styles.row, { width: width, height: height }]}>
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

      </ScrollView >
    )

};



const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    vsf: state.vsf,
    data: state.data.data,
    showlists: state.showlists.applIds,
    uptrails: state.uptrails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    calAll: (data) => {
      dispatch(calTodoDash(data))
      dispatch(calTotalDash(data))
      dispatch(calTreeDash(data))
      dispatch(calCateDash(data))

    },
    actChangeFollow: (content) => {
      dispatch(actChangeFollow(content));
    },
    userUptrails: (config) => {
      dispatch(actUserUptrails(config));
    },
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    },

  };
};

const styles = StyleSheet.create({

  blockInput: {
    backgroundColor: colors.light,
    borderBottomWidth: 0.2,
    borderRadius: 10,
    padding: 3,
    marginBottom: 10,
  },
  row: {
    width: '95%',
    marginVertical: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  box: {
    justifyContent: 'center',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    padding: 1,
  },
  button: {
    borderRadius: 5,
    color: colors.primary,
    backgroundColor: colors.primary,
    opacity: 0.7,
  },
  label: {
    borderRadius: 5,
    margin: 2,
    color: colors.primary,
    opacity: 0.6,
    paddingLeft: 3,
  },
  subLabel: {
    opacity: 0.5,
    paddingLeft: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  buttonLabel: {
    fontSize: 13,
    fontWeight: "800"
  },

});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Remark);


