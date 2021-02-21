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

import { Camera } from "expo-camera";
import ImageView from "react-native-image-view";

import { EMPTYIMAGE } from "../images";

import Loader from "../components/elements/Loader";

import * as consts from "../consts";

const { width, height } = Dimensions.get("window");

function Remark(props) {
  //===============================================sd

  const [newAddress, setNewAddress] = useState(
    props.vsf.activeApplId.new_address
  );
  const addressItems = [
    {
      label: `Thường trú : ${props.vsf.activeApplId.reg_address}`,
      value: props.vsf.activeApplId.reg_address,
    },
    {
      label: `Tạm trú : ${props.vsf.activeApplId.act_address}`,
      value: props.vsf.activeApplId.act_address,
    },
  ];
  if (
    props.vsf.activeApplId.new_address != null &&
    props.vsf.activeApplId.new_address != ""
  )
    addressItems.push({ label: newAddress, value: newAddress });

  const [uptrailStatus, setUptrailStatus] = useState(false);
  const [showcalendar, setShowcalendar] = useState(false);
  const [cust_name, setcust_name] = useState(props.vsf.activeApplId.cust_name);
  // Location
  const [location, setLocation] = useState(null);

  const [images, setImages] = useState([]);
  const [activateImage, setActivateImage] = useState({ uri: null });

  const [personContact, setPersonContact] = useState(null);
  const [remark, setRemark] = useState("");
  const [address, setAddress] = useState("");
  const [code, setCode] = useState(null);

  const [payAmount, setPayAmount] = useState(null);

  const [visible, setVisible] = useState(false);
  const [visiblePayamount, setVisiblePayamount] = useState(false);
  const [visiblePerson, setVisiblePerson] = useState(false);
  const [visibleAddress, setVisibleAddress] = useState(false);
  const [visibleImage, setVisibleImage] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [reDate, setRedate] = useState(() => {
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    return date;
  });
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg('Permission to access location was denied');
        Alert.alert("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // ========= Render label ============//

  const renContentNull = (item) => {
    if (!item) return "***";
    return item;
  };
  const renPersonContact = (personContact) => {
    if (!personContact) return <View></View>;
    return (
      <View style={{ width: "95%" }}>
        <Text style={styles.subLabel}>
          {
            consts.PERSON_CONTACT.filter(
              (item) => item.value == personContact
            )[0].label
          }
        </Text>
      </View>
    );
  };

  const renPromisePTP = (payAmount) => {
    if (!payAmount) return <View></View>;

    return (
      <View style={{ width: "95%" }}>
        <Text
          style={[
            styles.subLabel,
            { color: colors.success, opacity: 1, fontWeight: "800" },
          ]}
        >
          {moneyFormat(payAmount)} vnđ
        </Text>
      </View>
    );
  };

  const getAddressType = (address) => {
    if (!address) return "";
    if (address == addressItems[0].value && address == addressItems[1].value)
      return "same_address";
    if (address == addressItems[0].value) return "reg_address";
    if (address == addressItems[1].value) return "act_address";

    return "orther_address";
  };

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
      if (images.length < 3) setImages([...images, result]);
      else {
        images.shift();
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
      if (images.length < 3) setImages([...images, result]);
      else {
        images.shift();
        setImages([...images, result]);
      }
    }
  };

  const handleCommit = async () => {
    if (!personContact) return Alert.alert("Vui lòng chọn người liên hệ !");
    if (!code) return Alert.alert("Vui lòng chọn kết quả viếng thăm !");
    if (!address) return Alert.alert("Vui lòng chọn địa chỉ viếng thăm !");

    setUptrailStatus(true);
    let locationCurrrent = await Location.getCurrentPositionAsync({});
    setLocation(locationCurrrent);

    let imageSet = {};
    for (let j = 0; j < images.length; j++) {
      imageSet[`image${j + 1}`] = "data:image/png;base64," + images[j].base64;
      //imageSet = {...imageSet , ...newImage}
    }

    let config = {
      ...imageSet,
      token_value: props.token.token.access,
      appl_id: props.vsf.activeApplId.appl_id,
      cust_name: cust_name,
      code: code,
      trust_address: address,
      type_address: getAddressType(address),
      remark: remark,
      pay_amount: payAmount,
      next_visit_time: reDate,
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      person_contact: personContact,
      // 'image1': image1 === null ? null : "data:image/png;base64," + image1.base64,
      // 'image2': image2 === null ? null : "data:image/png;base64," + image2.base64,
      // 'image3': image3 === null ? null : "data:image/png;base64," + image3.base64,
    };
    try {
      //console.log(config)
      await props.userUptrails(config);
      await props.actChangeFollow({
        appl_id: props.vsf.activeApplId.appl_id,
        code: code,
      });
      await props.calAll(props.data);
      // props.updateShowlist(props.showlists )
      const curList = props.showlists;
      await props.updateShowlist([]);
      await props.updateShowlist(curList);

      setUptrailStatus(false);
      props.navigation.navigate("Portfolio", { screen: "List" });
    } catch (error) {
      setUptrailStatus(false);
      console.error(error);
    }
  };

  const moneyFormat = (n) => {
    //return  n.toLocaleString().split(".")[0]
    const money = parseFloat(n, 10)
      .toFixed(1)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
      .toString();
    return money.substring(0, money.length - 2);
  };
  const renLoader = () => {
    if (props.uptrails.userFetching || uptrailStatus) return <Loader />;
  };
  const renderActionCode = () => {
    let items = [
      {
        label: "GOOD",
        value: "GOOD",
        untouchable: true,
        textStyle: styles.DropdownValue,
        viewStyle: styles.DropdownViewRow,
      },
      { label: "PTP - Hứa thanh toán", value: "PTP", parent: "GOOD" },
      { label: "F_OBT - Đã thu được tiền", value: "F_OBT", parent: "GOOD" },
      {
        label: "WFP - Đã thanh toán chờ kiểm tra",
        value: "WFP",
        parent: "GOOD",
      },
      { label: "TER - Thanh lý", value: "TER", parent: "GOOD" },

      {
        label: "DIFFICULT FINANCE",
        value: "DIF",
        untouchable: true,
        textStyle: styles.DropdownValue,
      },
      { label: "WAS - Chờ thu nhập, trợ cấp", value: "WAS", parent: "DIF" },
      {
        label: "LST - Thất nghiệp, làm ăn thua lỗ",
        value: "LST",
        parent: "DIF",
      },
      { label: "MCW - KH bị bệnh, tai nạn", value: "MCW", parent: "DIF" },
      { label: "CTI - Thiên tai", value: "CTI", parent: "DIF" },

      {
        label: "LEM",
        value: "LEMM",
        untouchable: true,
        textStyle: styles.DropdownValue,
      },
      { label: "F_NAH - Không có nhà", value: "F_NAH", parent: "LEMM" },
      { label: "LEM - Để lại lời nhắn", value: "LEM", parent: "LEMM" },

      {
        label: "REFUSE TO PAY",
        value: "RTPP",
        untouchable: true,
        textStyle: styles.DropdownValue,
      },
      { label: "RTP - Từ chôí thanh toán", value: "RTP", parent: "RTPP" },
      { label: "GSF - Gian lận", value: "GSF", parent: "RTPP" },
      { label: "IGN1 - Chưa nhận khoản vay", value: "IGN1", parent: "RTPP" },
      { label: "IGN2 - Báo đã hủy hợp đồng", value: "IGN2", parent: "RTPP" },

      {
        label: "NOT_FOUND",
        value: "NOT_FOUND",
        untouchable: true,
        textStyle: styles.DropdownValue,
      },
      {
        label: "F_RENT - Nhà thuê và đã dọn đi",
        value: "F_RENT",
        parent: "NOT_FOUND",
      },
      { label: "F_HOS - Nhà đã bán", value: "F_HOS", parent: "NOT_FOUND" },
      {
        label: "F_WAU - KH bỏ trốn, gia đình còn ở tại địa phương",
        value: "F_WAU",
        parent: "NOT_FOUND",
      },
      {
        label: "F_NFH - Không tìm thấy nhà",
        value: "F_NFH",
        parent: "NOT_FOUND",
      },
      {
        label: "F_NIW - Không có thông tin tại nơi làm việc",
        value: "F_NIW",
        parent: "NOT_FOUND",
      },
      {
        label: "F_NLA - Không sống tại địa chỉ",
        value: "F_NLA",
        parent: "NOT_FOUND",
      },
      {
        label: "F_WET - KH bỏ trốn, không gặp gia đình",
        value: "F_WET",
        parent: "NOT_FOUND",
      },

      {
        label: "DIE/JAIL",
        value: "DIEE",
        untouchable: true,
        textStyle: styles.DropdownValue,
      },
      {
        label: "F_CGI - Đi tù/nghĩa vụ/cai nghiện/tâm thần",
        value: "F_CGI",
        parent: "DIEE",
      },
      { label: "DIE - Đã qua đời", value: "DIE", parent: "DIEE" },
    ];
    return (
      <DropDownPicker
        items={items}
        placeholder="Nhập kết quả viếng thăm"
        containerStyle={{ height: 40 }}
        dropDownMaxHeight={300}
        itemStyle={{ justifyContent: "flex-start" }}
        placeholderStyle={{ fontWeight: "normal", color: "grey" }}
        style={{
          borderWidth: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderColor: "lightgray",
        }}
        labelStyle={{
          fontSize: 14,
          textAlign: "center",
          color: "black",
        }}
        selectedLabelStyle={{
          color: "#39739d",
        }}
        dropDownStyle={{ backgroundColor: "white" }}
        onChangeItem={(item) => setCode(item.value)}
      />
    );
  };

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
        style={{
          borderWidth: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderColor: "lightgray",
        }}
        labelStyle={{
          fontSize: 14,
          textAlign: "center",
          color: "black",
        }}
        selectedLabelStyle={{
          color: "#39739d",
        }}
        dropDownStyle={{ backgroundColor: "white" }}
        onChangeItem={(item) => setPersonContact(item.value)}
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
        style={{
          borderWidth: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderColor: "lightgray",
        }}
        labelStyle={{
          fontSize: 14,
          textAlign: "center",
          color: "black",
        }}
        selectedLabelStyle={{
          color: "#39739d",
        }}
        dropDownStyle={{ backgroundColor: "white" }}
        onChangeItem={(item) => setAddress(item.value)}
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
    const dateformatted = `${dayName}, ${date} ${monthName} ${year}`;
    console.log(dateformatted);
    console.log(showcalendar);

    if (showcalendar) {
      return (
        <View
          style={{ borderColor: "lightgray", borderWidth: 1, borderRadius: 10 }}
        >
          <CalendarStrip
            scrollable
            style={{ height: 90, marginRight: 0, paddingLeft: 0 }}
            calendarColor={"white"}
            daySelectionAnimation={{
              type: "border",
              duration: 200,
              borderWidth: 1,
              borderHighlightColor: "black",
            }}
            calendarHeaderStyle={{ color: "#787571" }}
            dateNumberStyle={{ color: "#787571" }}
            dateNameStyle={{ color: "black" }}
            iconContainer={{ flex: 0.1 }}
            selectedDate={reDate}
            onDateSelected={(date) => {
              setRedate(date.format("YYYY-MM-DD"));
            }}
          />
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() =>
              showcalendar === false
                ? setShowcalendar(true)
                : setShowcalendar(false)
            }
          >
            <Text>{dateformatted}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View
        style={{ borderColor: "lightgray", borderWidth: 1, borderRadius: 10 }}
      >
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center", height: 40 }}
          onPress={() =>
            showcalendar === false
              ? setShowcalendar(true)
              : setShowcalendar(false)
          }
        >
          <Text>{dateformatted}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renImages = () => {
    let showImages = [...images];
    for (let j = 0; j < 3 - images.length; j++) {
      showImages.push(EMPTYIMAGE);
    }
    //console.log(showImages)

    return (
      <View style={styles.blockInput}>
        <View style={[styles.row]}>
          <View style={[styles.box, { flex: 0.382 }]}>
            <Button
              icon="image"
              mode="contained"
              style={[styles.row, styles.button, { margin: 2 }]}
              labelStyle={[styles.buttonLabel, { fontSize: 10 }]}
              onPress={pickImage2}
            >
              chọn hình
            </Button>

            <Button
              icon="camera"
              mode="contained"
              style={[styles.row, styles.button, { margin: 2 }]}
              labelStyle={[styles.buttonLabel, { fontSize: 10 }]}
              onPress={pickImage3}
            >
              chụp mới
            </Button>
          </View>
          <View style={[styles.box, { flex: 0.618 }]}>
            <View style={styles.row}>
              {showImages.map((image, index) => (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: null }]}
                  key={index}
                  onPress={() => {
                    setActivateImage(image);
                    setVisibleImage(true);
                  }}
                >
                  <Image
                    source={image}
                    style={{
                      width: (width * 0.618) / 3 - 10,
                      height: (width * 0.618) / 3 - 10,
                      borderRadius: 10,
                      margin: 2,
                    }}
                    onLoadStart={() => (
                      <ActivityIndicator size={10} color="black" />
                    )}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ padding: 20, backgroundColor: "white", flex: 1 }}>
      {renLoader()}

      <View style={styles.blockInput}>
        <Text style={[styles.header]}>{props.vsf.activeApplId.cust_name}</Text>
        <Text style={[styles.smallHeader]}>
          Hợp đồng : {props.vsf.activeApplId.appl_id}
        </Text>
      </View>

      <View style={styles.blockInput}>
        <Text style={styles.Title}>Người liên hệ</Text>
        {renPcontact(consts.PERSON_CONTACT)}
      </View>

      <View style={styles.blockInput}>
        <Text style={styles.Title}>Địa chỉ viếng thăm</Text>
        {renaddresslist(addressItems)}
      </View>

      <View style={styles.blockInput}>
        <Text style={styles.Title}>Kết quả viếng thăm</Text>
        {renderActionCode()}
      </View>

      <View style={styles.blockInput}>
        <Text style={styles.Title}>Ngày tác động lại</Text>
        {renSelectDate(reDate)}
        {/* <DatePicker
          date={reDate}
          mode="date"
          placeholder="Ngày"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          style={styles.buttonLabel}
          customStyles={{
            dateIcon: {
              position: "absolute",
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
            },
          }}
          onDateChange={(date) => setRedate(date)}
        /> */}

        {/* <Text>{dateformatted}</Text> */}
      </View>

      <View style={styles.blockInput}>
        <Text style={styles.Title}>Ghi chú</Text>

        <View style={styles.row}>
          <TextInput
            style={[styles.box, { color: colors.primary, paddingLeft: 3 }]}
            placeholder="Nhập ghi chú"
            value={remark}
            onChangeText={setRemark}
          />
        </View>
      </View>

      <View style={styles.Items}>{renImages()}</View>
    </View>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    vsf: state.vsf,
    data: state.data.data,
    showlists: state.showlists.applIds,
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
  Title: { fontWeight: "bold", paddingBottom: 5 },

  blockInput: {
    paddingBottom: 10,
    // borderBottomWidth: 0.2,
    // borderBottomColor: colors.grey,
    // borderRadius: 5,
    // padding: 3,
    // marginBottom: 2,

    // marginLeft: 5,
    // marginRight: 5,
  },
  DropdownValue: { fontWeight: "bold", paddingLeft: 10, color: "red" },

  row: {
    width: "95%",
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
    margin: 2,
    justifyContent: "center",
    paddingLeft: 5,
    color: "red",
  },
  smallHeader: {
    fontWeight: "bold",
    fontSize: 14,
    margin: 2,
    justifyContent: "center",
    color: "grey",
    paddingBottom: 20,
    paddingLeft: 5,
  },
  buttons: {
    flexDirection: "row",
    padding: 1,
  },
  button: {
    borderRadius: 5,
    color: "white",
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

export default connect(mapStateToProps, mapDispatchToProps)(Remark);
