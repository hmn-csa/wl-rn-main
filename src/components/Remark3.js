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
import ImageView from 'react-native-image-view';

import { EMPTYIMAGE } from '../images';

import Loader from '../components/elements/Loader'

import { FontAwesome, Entypo } from '@expo/vector-icons';
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
  const [visibleAddress, setVisibleAddress] = useState(false);
  const [visibleImage, setVisibleImage] = useState(false);


  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)

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

  const renContentNull = (item) => {
    if (!item)
      return "***"
    return item

  }
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
    </View>
  }


  const renPromisePTP = (payAmount) => {

    if (!payAmount)
      return <View></View>

    return <View style={{ width: '95%', }}>
      <Text style={[styles.subLabel, { color: colors.success, opacity: 1, fontWeight: "800" }]}>{moneyFormat(payAmount)} vnđ</Text>
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

  const renLoader = () => {
    if (props.uptrails.userFetching || uptrailStatus)
      return <Loader />
  }

  const getAddressType = (address) => {
    if (!address)
      return ""
    if (address == addressItems[0].value && address == addressItems[1].value)
      return 'same_address';
    if (address == addressItems[0].value)
      return 'reg_address';
    if (address == addressItems[1].value)
      return 'act_address';

    return 'orther_address';
  }

  // ======== Render Image ===========//

  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      base64: true,
      quality: 0.4,

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


  const pickImage3 = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      // allowsEditing: true,
      aspect: [3, 4],
      base64: true,
      quality: 0.4,
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



    if (!personContact)
      return Alert.alert('Vui lòng chọn người liên hệ !')
    if (!code)
      return Alert.alert('Vui lòng chọn kết quả viếng thăm !')
    if (!address)
      return Alert.alert('Vui lòng chọn địa chỉ viếng thăm !')

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

      setUptrailStatus(false)
      props.navigation.navigate('Portfolio', { screen: 'List' });

    } catch (error) {
      setUptrailStatus(false)
      console.error(error);
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

    return <View style={styles.blockInput}>
      <View style={[styles.row]}>
        <View style={[styles.box, { flex: 0.382 }]}>

          <Button
            icon="image"
            mode="contained"
            style={[styles.row, styles.button, { margin: 2, }]}
            labelStyle={[styles.buttonLabel, { fontSize: 10 }]}
            onPress={pickImage2}>
            chọn hình
          </Button>
          <Button
            icon="camera"
            mode="contained"
            style={[styles.row, styles.button, { margin: 2 }]}
            labelStyle={[styles.buttonLabel, { fontSize: 10 }]}
            onPress={pickImage3}>
            chụp mới
          </Button>

        </View>
        <View style={[styles.box, { flex: 0.618 }]}>
          <View style={styles.row}>
            {
              showImages.map((image, index) =>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: null }]}
                  key={index}
                  onPress={() => {
                    setActivateImage(image)
                    setVisibleImage(true)
                  }}>
                  <Image
                    source={image}
                    style={{
                      width: width * 0.618 / 3 - 10,
                      height: width * 0.618 / 3 - 10,
                      borderRadius: 10,
                      margin: 2
                    }}
                    onLoadStart={() => <ActivityIndicator size={10} color='black' />}
                  />
                </TouchableOpacity>
              )
            }
          </View>
        </View>
      </View>
    </View>
  }

  const renPicture = (image, setImage) => {

    const launchLibrary = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        base64: true,
        quality: 0.4,
      });
      if (!result.cancelled) {
        setImage(result);
      }
    }

    const launchCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        base64: true,
        quality: 0.4,
      });
      if (!result.cancelled) {
        setImage(result);
      }
    }

    const elementWidth = width * 0.8 / 3

    return (
      <View style={[styles.box, { width: elementWidth }]} >
        <View style={[styles.row, { paddingLeft: 5, paddingRight: 5, marginBottom: 0 }]}>
          <Entypo name="image"
            size={25}
            color="black"
            style={{
              width: elementWidth / 3,
            }}
            onPress={() => launchLibrary()}
          />

          <Entypo name="camera"
            size={25}
            color="black"
            style={{
              width: elementWidth / 3,
            }}
            onPress={() => launchCamera()}
          />

          <FontAwesome name="remove"
            size={25}
            color="black"
            style={{
              width: elementWidth / 3,
            }}
            onPress={() => setImage(null)}
          />
        </View>

        <TouchableOpacity
          style={[styles.row, { marginTop: 0 }]}
          onPress={() => {
            setActivateImage(image)
            setVisibleImage(true)
          }}
        >
          <Image
            source={!image ? EMPTYIMAGE : image}
            style={{
              width: elementWidth - 10,
              height: elementWidth - 10,
              borderRadius: 10,
              margin: 2
            }}

            onLoadStart={() => <ActivityIndicator size={10} color='black' />}
          />
        </TouchableOpacity>
      </View >
    )

  }

  return (
    <ScrollView style={[{ flex: 1 }]}>
      {renLoader()}
      <View style={styles.blockInput}>
        <Text style={[styles.header]}>{props.vsf.activeApplId.cust_name}</Text>
        <Text style={[styles.smallHeader]}>Hợp đồng: {props.vsf.activeApplId.appl_id}</Text>


      </View>
      {/* Ket qua vieng tham */}
      <View style={styles.blockInput}>
        <View style={styles.row}>
          <View style={[styles.box, styles.label]}>
            <Text>* Người liên hệ: </Text>
          </View>
          <View style={[styles.box, { flex: 0.618 }]}>

            <Button
              mode="contained"
              onPress={() => setVisiblePerson(true)}
              style={[styles.button]}
              labelStyle={styles.buttonLabel}
            >
              {renContentNull(personContact)}
            </Button>
          </View>
        </View>
        {renPersonContact(personContact)}

      </View>

      <View style={styles.blockInput}>
        <View style={styles.row}>
          <View style={[styles.box, styles.label]}>
            <Text>* Kết quả viếng thăm: </Text>
          </View>
          <View style={[styles.box, { flex: 0.618 }]}>
            <Button
              mode="contained"
              onPress={() => setVisible(true)}
              style={[styles.button]}
              labelStyle={styles.buttonLabel}
            >
              {renContentNull(code)}
            </Button>
          </View>
        </View>
        {renRemarkCode(code)}
        {renPromisePTP(payAmount)}
      </View>

      <View style={styles.blockInput}>
        <View style={styles.row}>
          <View style={[styles.box, styles.label]}>
            <Text>* Địa chỉ viếng thăm: </Text>
          </View>
          <View style={[styles.box, { flex: 0.618 }]}>
            <Button
              mode="contained"
              onPress={() => setVisibleAddress(true)}
              style={[styles.button]}
              labelStyle={styles.buttonLabel}
            >
              {renContentNull(getAddressType(address))}
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
                  fontWeight: "800",
                  color: colors.primary,
                  fontSize: 12,
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

      {/* { renImages()} */}
      <View style={styles.blockInput}>
        <View style={styles.row}>
          {renPicture(image1, setImage1)}
          {renPicture(image2, setImage2)}
          {renPicture(image3, setImage3)}
        </View>
      </View>


      <Button
        mode="contained"
        style={[styles.button, {
          width: "97%",
          marginLeft: "auto",
          marginRight: "auto",
        }]}
        labelStyle={styles.buttonLabel}
        onPress={handleCommit}>

        Xác nhận
        </Button>



      <Portal style={[styles.row]}>
        <Dialog visible={visiblePerson} onDismiss={() => setVisiblePerson(false)}>
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
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setVisiblePerson(false)}>
              <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>Đóng</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal style={[styles.row]}>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{ width: null, height: height - 80 }}>
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
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setVisible(false)}>
              <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>Đóng</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal style={[styles.row, { width: width, height: height }]}>
        <Dialog visible={visiblePayamount} onDismiss={() => setVisiblePayamount(false)}>
          <Dialog.Content>
            <TextInput
              placeholder="Nhập số tiền hứa thanh toán"
              value={payAmount}
              onChangeText={setPayAmount}
              style={{ borderRadius: 0, height: 40, padding: 5 }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setVisiblePayamount(false)}>
              <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>Đóng</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>


      <Portal style={[styles.row, { width: width, height: height }]}>
        <Dialog visible={visibleAddress} onDismiss={() => setVisibleAddress(false)}>
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
                      marginRight: 40
                    }}
                    mode='android'
                    style={{ height: 60 }}
                  />
                )
              }
            </RadioButton.Group>

            <TextInput
              style={{
                fontSize: 12,
                marginRight: 40
              }}
              mode="flat"
              label="Dia chi khac"
              placeholder="Nhập địa chỉ khác"
              onChangeText={setAddress}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setVisibleAddress(false)}>
              <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>Đóng</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>


      <Portal style={[styles.row, { width: width, height: height }]}>
        <Dialog visible={visibleImage} onDismiss={() => setVisibleImage(false)}>
          <ImageView
            images={[{
              source: { uri: activateImage.uri },
              width: 600,
              height: 800,
            },]}
            imageIndex={0}
            isVisible={visibleImage}
            onClose={() => setVisibleImage(false)}
            animationType="slide"
            isSwipeCloseEnabled={false}
          />
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
    calAll: () => {
      dispatch({ type: consts.CAL_TODO_DASH })
      dispatch({ type: consts.CAL_TOTAL_DASH })
      dispatch({ type: consts.CAL_TREE_DASH })
      dispatch({ type: consts.CAL_CATE_DASH })
    },
    actChangeFollow: (content) => {
      dispatch({
        type: consts.CHANGE_FOLLOW,
        content,
      });
    },
    userUptrails: (config) => {
      dispatch({
        type: consts.USER_UPTRAIL_REQUEST,
        config
      });
    },
    updateShowlist: (content) => {
      dispatch({
        type: consts.SET_TODO_SHOWLIST,
        content,
      })
    },

  };
};

const styles = StyleSheet.create({

  blockInput: {
    borderBottomWidth: 0.2,
    borderBottomColor: colors.grey,
    borderRadius: 5,
    padding: 3,
    marginBottom: 2,
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  row: {
    width: '95%',
    marginVertical: 2,
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

  header: {
    fontWeight: 'bold',
    fontSize: 25,
    margin: 2,
    justifyContent: 'center',
    color: 'black'
  },
  smallHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 2,
    justifyContent: 'center',
    color: 'black'
  },
  buttons: {
    flexDirection: 'row',
    padding: 1,
  },
  button: {
    borderRadius: 5,
    color: 'white',
    backgroundColor: colors.light,
    borderColor: colors.grey,
    borderWidth: 0.3,
  },
  label: {
    borderRadius: 5,
    margin: 2,
    color: colors.primary,
    paddingLeft: 3,
  },
  subLabel: {
    opacity: 0.5,
    paddingLeft: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  buttonLabel: {

    color: colors.primary,
    fontSize: 12,
    fontWeight: "800"
  },

  closeBtn: {
    borderTopWidth: 1,
    borderColor: colors.grey,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5
  }
});




export default connect(mapStateToProps, mapDispatchToProps)(Remark);


