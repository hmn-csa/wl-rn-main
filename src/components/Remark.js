import React, { useState, useEffect } from 'react';
import {
  Image, ScrollView, View, Text, Dimensions, TouchableOpacity,
  Platform, StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import { connect } from "react-redux"
import { styles as masterStyle, BACKGROUND_LOGIN, MAIN_COLOR2 } from '../styles'
import DatePicker from 'react-native-datepicker'
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Button, TextInput, Paragraph,
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
import { colors } from '../styles'
import { color } from 'react-native-reanimated';

const { width, height } = Dimensions.get("window");

function Remark(props) {



  //===============================================


  const [newAddress, setNewAddress] = useState(props.vsf.activeApplId.new_address)
  const addressItems = [
    { label: props.vsf.activeApplId.reg_address, value: props.vsf.activeApplId.reg_address },
    { label: props.vsf.activeApplId.act_address, value: props.vsf.activeApplId.act_address },
    //{ label: newAddress, value: newAddress},
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


  const [remark, setRemark] = useState('')
  const [address, setAddress] = useState('')
  const [code, setCode] = useState(null)
  const [reDate, setRedate] = useState(null)
  const [payAmount, setPayAmount] = useState(null)

  const [visible, setVisible] = useState(false);
  const [visiblePayamount, setVisiblePayamount] = useState(false);

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

    const getAddressType = (address) => {
      if (address == addressItems[0].value && address == addressItems[1].value)
        return 'same_address';
      if (address == addressItems[0].value)
        return 'reg_address';
      if (address == addressItems[1].value)
        return 'act_address';
      return 'orther_address';
    }

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
      style={[masterStyle.row, styles.container, buttonStyles.buttons,]}>
      {
        showImages.map((image, index) =>
          <TouchableOpacity
            style={[buttonStyles.button, { backgroundColor: null }]}
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
      return <View style={[styles.container, { alignItems: 'center' }]}>
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
    return <View style={[masterStyle.container, { alignItems: 'center' }]}>
      <Text>Up Loading ... </Text>
      <ActivityIndicator size={100} color={BACKGROUND_LOGIN} />
    </View>
  else
    return (
      <View style={[masterStyle.container, { alignItems: 'center' }]}>
        <View>
          <Text style={[masterStyle.header, { alignItems: 'center' }]}>{props.vsf.activeApplId.cust_name}</Text>
        </View>

        <View style={[masterStyle.indexValueSmall, { alignItems: 'center', color: colors.white }]} >
          <Text>Hợp đồng: {props.vsf.activeApplId.appl_id}</Text>
        </View>

        {/* Ket qua vieng tham */}

        <Button
          mode="contained"
          onPress={showDialog}
          style={[styles.container, buttonStyles.button]}  >
          Kết quả viếng thăm: {code}
        </Button>

        <View style={styles.container} >
          <Text>Số tiền hứa/đã thanh toán: {moneyFormat(payAmount)}</Text>
        </View>

        <Portal style={[masterStyle.container]}>
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
                      style={{ fontSize: 15 }}
                      value={item.value}
                      label={item.label}
                      labelStyle={{
                        fontSize: 12,
                      }}
                      mode='ios'
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

        <Portal style={[masterStyle.container, { width: width, height: height }]}>
          <Dialog visible={visiblePayamount} onDismiss={hideDialogPayamount}>
            <Dialog.Content>
              <TextInput
                mode="flat"
                label="Nhập số tiền"
                onChangeText={setPayAmount}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialogPayamount}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Button
          mode="contained"
          onPress={showDialogAddress}
          style={[styles.container, buttonStyles.button]}  >
          Địa chỉ viếng thăm
        </Button>
        <View style={styles.container} >
          <Text>Địa chỉ: {address}</Text>
        </View>



        <Portal style={[masterStyle.container, { width: width, height: height }]}>
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
                      mode='ios'
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

        <View style={styles.container} >
          <TextInput
            mode="flat"
            style={{ color: colors.primary }}
            label="Ghi chú"
            onChangeText={setRemark}
          />
        </View>

        <DatePicker
          style={masterStyle.inputViewConst}
          date={reDate}
          mode="date"
          placeholder="Ngày viếng thăm lại"
          format="YYYY-MM-DD"
          // minDate="2016-05-01"
          // maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 4,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => setRedate(date)}
        />



        {/* <View style={[masterStyle.row, styles.container]}>
          <View style={[masterStyle.box, { 'flex': 1, width: 100, height: 100 }]} >
            <Button
              icon="camera"
              mode="contained"
              style={buttonStyles.button}
              onPress={pickImage1}>
              image1
          </Button>
            <View style={{ width: 100, height: 100 }}>
              {image1 && <Image source={{ uri: image1.uri }} style={{ width: 100, height: 100 }} />}
            </View>
          </View>
          <View style={[masterStyle.box, { 'flex': 1, width: 100, height: 100 }]} >
            <Button
              icon="camera"
              mode="contained"
              style={buttonStyles.button}
              onPress={pickImage2}>
              chọn hình
          </Button>
            <View style={{ width: 100, height: 100 }}>
              {image2 && <Image source={{ uri: image2.uri }} style={{ width: 100, height: 100 }} />}
            </View>
          </View>
          <View style={[masterStyle.box, { 'flex': 1, width: 100, height: 100 }]} >
            <Button
              icon="camera"
              mode="contained"
              style={buttonStyles.button}
              onPress={pickImage3}>
              chụp mới
          </Button>
            <View style={{ width: 100, height: 100 }}>
              {image3 && <Image source={{ uri: image3.uri }} style={{ width: 100, height: 100 }} />}
            </View>
          </View>
        </View> */}

        <View style={[buttonStyles.buttons]}>
          <Button
            icon="image"
            mode="contained"
            style={buttonStyles.button}
            onPress={pickImage2}>
            chọn hình
          </Button>
          <Button
            icon="camera"
            mode="contained"
            style={buttonStyles.button}
            onPress={pickImage3}>
            chụp mới
          </Button>
        </View>

        { renImages()}

        <Button
          mode="contained"
          style={[buttonStyles.button,]}
          onPress={handleCommit}>
          Xác nhận
        </Button>

        <Portal style={[masterStyle.container, { width: width, height: height }]}>
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

      </View >
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
  container: {
    width: '90%',
    marginVertical: 6
  },
});

const buttonStyles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 2,

  },
  button: {
    marginLeft: 2,
    borderRadius: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    backgroundColor: colors.primary,
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


