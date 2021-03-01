import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { styles as masterStyle, colors } from "../styles";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import CalendarStrip from "react-native-calendar-strip";

import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  RadioButton,
} from "react-native-paper";

import * as Location from "expo-location";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Camera } from "expo-camera";
import ImageView from "react-native-image-view";

import { EMPTYIMAGE } from "../images";

import * as constAction from '../consts'
import Loader from "../components/elements/Loader";

import * as consts from "../consts";
const { width, height } = Dimensions.get("window");

function RemarkPortal(props) {
  //===============================================sd
  const [commited, setCommited] = useState(false);

  const [newAddress, setNewAddress] = useState(
    props.item.new_address
  );

  const addressItems = [
    {
      label: `Thường trú : ${props.item.reg_address}`,
      value: props.item.reg_address,
    },
    {
      label: `Tạm trú : ${props.item.act_address}`,
      value: props.item.act_address,
    },
    {
      label: `Địa chỉ khác`,
      value: null,
    },
  ];

  if (
    props.item.new_address != null &&
    props.item.new_address != ""
  )
    addressItems.push({ label: newAddress, value: newAddress });

  const [uptrailStatus, setUptrailStatus] = useState(false);
  const [showcalendar, setShowcalendar] = useState(false);
  const [cust_name, setcust_name] = useState(props.item.cust_name);
  // Location
  const [location, setLocation] = useState(null);

  const [activateImage, setActivateImage] = useState({ uri: null });

  const [personContact, setPersonContact] = useState(null);
  const [remark, setRemark] = useState("");
  const [address, setAddress] = useState("");
  const [code, setCode] = useState(null);

  const [payAmount, setPayAmount] = useState(null);

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)

  const [visibleImage, setVisibleImage] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [reDate, setRedate] = useState(null)




  const getAddressType = (address) => {
    if (address === "")
      return null
    if (address == addressItems[0].value && address == addressItems[1].value)
      return "same_address";
    if (address == addressItems[0].value)
      return "reg_address";
    if (address == addressItems[1].value)
      return "act_address";

    return "other_address";
  };

  // ======== Render Image ===========//
  const handleCommit = async () => {
    if (!personContact) return Alert.alert("Vui lòng chọn người liên hệ !");
    if (!code) return Alert.alert("Vui lòng chọn kết quả viếng thăm !");
    if (!address) return Alert.alert("Vui lòng nhập địa chỉ viếng thăm !");

    setUptrailStatus(true);
    setCommited(true)
    props.cancel()
    let locationCurrrent = await Location.getCurrentPositionAsync({});
    let config = {
      token_value: props.token,
      appl_id: props.item.appl_id,
      cust_name: cust_name,
      code: code,
      trust_address: address,
      type_address: getAddressType(address),
      remark: remark,
      pay_amount: payAmount,
      next_visit_time: reDate,
      lat: locationCurrrent.coords.latitude,
      lon: locationCurrrent.coords.longitude,
      person_contact: personContact,
      image1: !image1 ? null : "data:image/png;base64," + image1.base64,
      image2: !image2 ? null : "data:image/png;base64," + image2.base64,
      image3: !image3 ? null : "data:image/png;base64," + image3.base64,
    };

    try {
      console.log(config)
      props.userUptrails(config);
      props.actChangeFollow({
        appl_id: props.item.appl_id,
        code: code,
      });
      // props.calAll();
      // const curList = props.showlists;
      // //props.updateShowlist([]);
      // props.updateShowlist(curList);
      setUptrailStatus(false);
      //props.navigation.navigate("Portfolio", { screen: "List" });

    } catch (error) {
      setUptrailStatus(false);
      console.error(error);
      setCommited(false)
    }
  };


  const renLoader = () => {
    if (props.uptrails.userFetching || uptrailStatus) return <Loader />;
  };
  const renderActionCode = () => {

    return (
      <DropDownPicker
        items={constAction.REMARK_CODE}
        placeholder="Nhập kết quả viếng thăm"
        containerStyle={{ height: 40 }}
        dropDownMaxHeight={300}
        itemStyle={{ justifyContent: "flex-start" }}
        placeholderStyle={{ fontWeight: "normal", color: "grey" }}
        style={styles.selectInput}
        labelStyle={{
          fontSize: 14,
          textAlign: "center",
          color: "black",
        }}
        selectedLabelStyle={{
          color: colors.main,
        }}
        dropDownStyle={{ backgroundColor: "lightgrey" }}
        onChangeItem={(item) => setCode(item.value)}
        zIndex={3000}
      />
    );
  };

  const renderPromisePTP = () => {

    return (
      <TextInput
        style={[styles.row, styles.selectInput]}
        keyboardType='numeric'
        placeholder="Số tiền dự thu"
        value={payAmount}
        onChangeText={setPayAmount}
        clearButtonMode="always"
      />
    )

  }

  const renderOtherAddress = () => {

    if (getAddressType(address) === "other_address")
      return (
        <View>
          <Text style={styles.title}>*Địa chỉ khác</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.row, styles.selectInput]}
              placeholder="Nhập địa chỉ khác"
              value={address}
              onChangeText={setAddress}
              clearButtonMode="always"
            />
          </View>
        </View>
      )

  }

  const renPcontact = (datalist) => {
    let item = datalist;
    return (
      <DropDownPicker
        items={item}
        placeholder="Nhập người liên hệ"
        containerStyle={{ height: 40 }}
        dropDownMaxHeight={300}
        itemStyle={{ justifyContent: "flex-start" }}
        placeholderStyle={{ fontWeight: "normal", color: "grey" }}
        style={styles.selectInput}
        labelStyle={{
          fontSize: 14,
          textAlign: "center",
          color: "black",
        }}
        selectedLabelStyle={{
          color: colors.main,
        }}
        dropDownStyle={{ backgroundColor: "lightgrey" }}
        // dropDownStyle={{ backgroundColor: "white" }}
        onChangeItem={(item) => setPersonContact(item.value)}
        zIndex={5000}
      />
    );
  };
  const renaddresslist = (datalist) => {
    let item = datalist;
    return (
      <DropDownPicker
        items={item}
        placeholder="Nhập địa chỉ liên hệ"
        containerStyle={{ height: 40 }}
        dropDownMaxHeight={300}
        itemStyle={{ justifyContent: "flex-start" }}
        placeholderStyle={{ fontWeight: "normal", color: "grey" }}
        style={styles.selectInput}
        labelStyle={{
          fontSize: 12,
          textAlign: "left",
          color: "black",
        }}
        selectedLabelStyle={{
          color: colors.main,
        }}
        dropDownStyle={{ backgroundColor: "lightgrey" }}
        onChangeItem={(item) => setAddress(item.value)}
        zIndex={4000}
      />

    );
  };

  const renSelectDate = (reDate) => {
    const d = new Date(reDate);
    const year = d.getFullYear(); // 2019
    const date = d.getDate();
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    const days = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    const dayName = days[d.getDay()];
    const monthName = months[d.getMonth()];
    const dateformatted = !reDate ? "" : `${dayName}, ${date} ${monthName} ${year}`;
    console.log(dateformatted);
    console.log(showcalendar);

    if (showcalendar) {
      return (
        <View
          style={{ borderColor: "lightgray", borderWidth: 1, borderRadius: 10 }}
        >
          <CalendarStrip
            scrollable
            style={{ height: 60, marginRight: 0, paddingLeft: 0 }}
            calendarColor={"white"}
            daySelectionAnimation={{
              type: "border",
              duration: 1,
              borderWidth: 1,
              borderHighlightColor: colors.secondary,
            }}
            highlightDateNumberStyle={{ color: colors.secondary }}
            highlightDateNameStyle={{ color: colors.secondary, fontWeight: 'bold' }}
            calendarHeaderStyle={{ color: "#787571" }}
            dateNumberStyle={{ color: "#787571" }}
            dateNameStyle={{ color: "black" }}
            iconContainer={{ flex: 0.1 }}
            // selectedDate={reDate}
            onDateSelected={(date) => {
              setRedate(date.format("YYYY-MM-DD"))
              //setShowcalendar(false)
            }}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 40,
            }}
            onPress={() =>
              showcalendar === false
                ? setShowcalendar(true)
                : setShowcalendar(false)
            }
          >
            <Text style={{ color: colors.main }}>{dateformatted}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (

      <TouchableOpacity
        style={[styles.row, styles.selectInput]}
        onPress={() =>
          showcalendar === false
            ? setShowcalendar(true)
            : setShowcalendar(false)
        }
      >
        <View style={styles.box}>
          <Text>{dateformatted}</Text>
        </View>
        <View style={[styles.box, { flex: 0.1, maxWidth: 15 }]}>
          <FontAwesome name="remove"
            size={15}
            style={{
              color: "grey",
              opacity: 0.4
            }}
            onPress={() => setRedate(null)}
          />
        </View>
      </TouchableOpacity>
    );
  };


  const renPicture = (image, setImage) => {

    const launchLibrary = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        base64: true,
        quality: 0.2,
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
        quality: 0.2,
      });
      if (!result.cancelled) {
        setImage(result);
      }
    }

    const elementWidth = width * 0.8 / 3

    return (
      <View style={[styles.box, { width: elementWidth }]} >
        <View style={[styles.row, {
          marginVertical: 'auto',
          marginBottom: 0,
          paddingRight: elementWidth * 0.1,
          paddingLeft: elementWidth * 0.12
        }]}>
          <Entypo name="image"
            size={20}
            color="black"
            style={{
              maxWidth: elementWidth / 3,
              color: "grey",
            }}
            onPress={() => launchLibrary()}
          />

          <Entypo name="camera"
            size={20}
            color="black"
            style={{
              maxWidth: elementWidth / 3,
              color: "grey",
            }}
            onPress={() => launchCamera()}
          />

          <FontAwesome name="remove"
            size={20}
            color="black"
            style={{
              maxWidth: elementWidth / 3,
              color: "grey",
            }}
            onPress={() => setImage(null)}
          />
        </View>

        <TouchableOpacity
          style={[styles.row, { marginTop: 0, paddingLeft: 10, paddingRight: 10 }]}
          onPress={() => {
            if (image) {
              setActivateImage(image)
              setVisibleImage(true)
            }
          }}
        >
          <Image
            source={!image ? EMPTYIMAGE : image}
            style={{
              width: elementWidth,
              height: elementWidth,
              borderRadius: 10,
            }}

            onLoadStart={() => <ActivityIndicator size={10} color='black' />}
          />
        </TouchableOpacity>
      </View>
    )

  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ height: height }}
      keyboardVerticalOffset={1}
    >
      <ScrollView
        style={{
          backgroundColor: "white",
          height: height - 50,
          flex: 1,
          ...(Platform.OS !== "android" && {
            zIndex: 10,
          }),
        }}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
      >
        <Text style={[styles.header, { paddingTop: Platform.OS !== "android" ? 10 : 0 }]}>{props.item.cust_name}</Text>
        <Text style={[styles.smallHeader]}>
          Hợp đồng : {props.item.appl_id}
        </Text>
        <Text style={styles.title}>*Người liên hệ</Text>
        {renPcontact(consts.PERSON_CONTACT)}
        <Text style={styles.title}>*Địa chỉ viếng thăm</Text>
        {renaddresslist(addressItems)}
        {renderOtherAddress()}
        <Text style={styles.title}>*Kết quả viếng thăm</Text>
        {renderActionCode()}
        <Text style={styles.title}>Số dự thu</Text>
        {renderPromisePTP()}

        <Text style={styles.title}>Ngày tác động lại</Text>
        {renSelectDate(reDate)}
        <Text style={styles.title}>Ghi chú</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.box, styles.selectInput, { color: colors.main, paddingLeft: 3 }]}
            placeholder="Nhập ghi chú"
            value={remark}
            onChangeText={setRemark}
            clearButtonMode="always"
          />
        </View>

        <View style={styles.row}>
          {renPicture(image1, setImage1)}
          {renPicture(image2, setImage2)}
          {renPicture(image3, setImage3)}
        </View>

        <View style={[styles.row, { paddingBottom: 40 }]}>
          <Button
            mode="contained"
            style={[styles.button, {
              width: "45%",
              marginLeft: "auto",
              marginRight: "auto",
            }]}
            labelStyle={[styles.buttonLabel, { color: colors.secondary }]}
            //onPress={handleCommit}
            onPress={() => {
              props.cancel()
            }}
          >
            cancel
          </Button>
          <Button
            mode="contained"
            style={[styles.button, {
              width: "45%",
              marginLeft: "auto",
              marginRight: "auto",
            }]}
            labelStyle={styles.buttonLabel}
            //onPress={handleCommit}
            onPress={() => {
              handleCommit()
              props.setCode(code)

            }}
          >
            Xác nhận
          </Button>
        </View>

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


      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token.token.access,
    uptrails: state.uptrails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calAll: () => {
      dispatch({ type: consts.CAL_TODO_DASH });
      dispatch({ type: consts.CAL_TOTAL_DASH });
      dispatch({ type: consts.CAL_TREE_DASH });
      dispatch({ type: consts.CAL_CATE_DASH });
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
        config,
      });
    },
    updateShowlist: (content) => {
      dispatch({
        type: consts.SET_TODO_SHOWLIST,
        content,
      });
    },
  };
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
    paddingTop: 5
  },

  blockInput: {
    paddingBottom: 2,
    // zIndex: 10,
    // borderBottomWidth: 0.2,
    // borderBottomColor: colors.grey,
    // borderRadius: 5,
    // padding: 3,
    // marginBottom: 2,

    // marginLeft: 5,
    // marginRight: 5,
  },

  selectInput: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: "lightgray",
    backgroundColor: "white",
    color: "gray",
    padding: 5,
    height: 40
  },
  dropdownValue: {
    fontWeight: "bold",
    paddingLeft: 5,
    color: "red"
  },

  row: {
    width: "100%",
    marginVertical: 2,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  box: {
    justifyContent: "center",
    flex: 1,
  },

  header: {
    fontWeight: "bold",
    fontSize: 25,
    justifyContent: "center",
    color: "red",
    marginLeft: "auto",
    marginRight: "auto",
  },
  smallHeader: {
    fontWeight: "bold",
    fontSize: 14,
    justifyContent: "center",
    color: "grey",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15
  },
  buttons: {
    flexDirection: "row",
    padding: 1,
    //backgroundColor: 'rgba(255,255,255,0.5)'
  },
  button: {
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: colors.grey,
    borderWidth: 0.3,
  },
  label: {
    borderRadius: 5,
    margin: 2,
    color: colors.main,
    paddingLeft: 3,
  },
  subLabel: {
    opacity: 0.5,
    paddingLeft: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  buttonLabel: {
    color: colors.main,
    fontSize: 12,
    fontWeight: "800",
  },

  closeBtn: {
    borderTopWidth: 1,
    borderColor: colors.grey,
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RemarkPortal);

// export default RemarkPortal;
