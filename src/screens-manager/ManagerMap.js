import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import MapView from 'react-native-map-clustering';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, ScrollView,
  Image, ImageBackground, FlatList, ActivityIndicator, Platform,
} from 'react-native'

import Carousel from 'react-native-snap-carousel';
import { connect } from "react-redux";
import { styles as masterStyle, colors } from '../styles'
import { EMPTYAVATAR } from '../images';
import CalendarStrip from "react-native-calendar-strip";
import DropDownPicker from "react-native-dropdown-picker";
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = width / 6.2;
const CARD_WIDTH = CARD_HEIGHT - 50;
const SliderWidth = Dimensions.get('screen').width;

import { calInitialRegion } from '../functions'
import * as constAction from '../consts'

import {
  Button, Paragraph,
  Dialog, Portal, RadioButton,
} from 'react-native-paper';



const usePulse = (startDelay = 500) => {
  const opacity = useRef(new Animated.Value(1)).current;

  const pulse = () => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0.6, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0.3, useNativeDriver: true }),
    ]).start(() => pulse());
  };

  useEffect(() => {
    const timeout = setTimeout(() => pulse(), startDelay);
    return () => clearTimeout(timeout);
  }, []);

  return opacity;
};


function ManagerMap(props) {

  const [listStaffChecked, setListStaffChecked] = useState([])
  const [listStaffNotChecked, setListStaffNotChecked] = useState([])

  const [listAppls, setListappls] = useState(null)
  const [activeIndex, setActivateIndex] = useState(0);
  const [initialRegion, setInitialRegion] = useState({

    latitude: null,
    longitude: null,
    latitudeDelta: null,
    longitudeDelta: null,
  });

  const [cordata, setCordata] = useState([])

  const [listStaff, setListStaff] = useState(
    [{ label: "tất cả nv", value: "all" }, ...props.staff.staffs.map(staff => {
      return { label: 'nv: ' + staff.staff_id, value: staff.staff_id }
    })]
  )

  const [listType, setListType] = useState(
    [
      { label: "XEM TẤT CẢ CÁC ĐIỂM CHECKIN", value: "all" },
      { label: "XEM LẦN CUỐI CHECKIN", value: "last" },
      { label: "XEM LẦN ĐẦU CHECKIN", value: "first" },
    ]
  )
  const [filterStaffs, setFilterStaffs] = useState([])
  const [filterType, setFilterType] = useState("last")


  const dateObj = new Date()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const today = year + '-' + month + '-' + day;


  const [reDate, setRedate] = useState(today)
  const [isShowDate, setShowDate] = useState(false)

  const mapRef = useRef(null);
  const makerRef = {};
  const carouselRef = useRef(null);

  const opacity = usePulse();

  const setToday = () => {
    const cors = []
    let newlistAppl = filterListAppl(
      filterStaffs,
      filterType,
      props.staff.listCheckin,
      props.staff.lastCheckin,
      props.staff.firstCheckin,
    )
    setListappls(newlistAppl)
    setListStaffChecked(props.staff.firstCheckin)
    let tmpChecked = props.staff.firstCheckin.map(item => item.staff_id)
    setListStaffNotChecked(
      props.staff.staffs.filter(staff => !tmpChecked.includes(staff.staff_id))
    )
    console.log('not checkin :', listStaffNotChecked)
    setInitialRegion(calInitialRegion(newlistAppl))
    newlistAppl.map((appl, index) => {
      cors.push({ latitude: appl.lat, longitude: appl.lon });
    })
    console.log('cors', cors)
    setCordata(cors)

    // reset index
    setActivateIndex(0)
    if (listAppls)
      if (listAppls.length > 0) {
        mapRef.current.animateToCoordinate(
          { latitude: listAppls[0].lat, longitude: listAppls[0].lon }, 0
        )
        carouselRef.current.snapToItem(0)
        makerRef[0].showCallout()
      }

  }

  const setOtherDay = () => {
    const cors = []
    const dailyCheckinItems = props.staff.dailyChekin.filter(item => item.date === reDate)
    if (dailyCheckinItems.length > 0) {
      let newlistApplDaily = filterListAppl(
        filterStaffs,
        filterType,
        dailyCheckinItems[0].listCheckin,
        dailyCheckinItems[0].lastCheckin,
        dailyCheckinItems[0].firstCheckin,
      )
      setListappls(newlistApplDaily)
      setListStaffChecked(dailyCheckinItems[0].firstCheckin)
      let tmpDailyChecked = dailyCheckinItems[0].firstCheckin.map(item => item.staff_id)
      setListStaffNotChecked(
        props.staff.staffs.filter(staff => !tmpDailyChecked.includes(staff.staff_id))
      )
      setInitialRegion(calInitialRegion(newlistApplDaily))
      newlistApplDaily.map((appl, index) => {
        cors.push({ latitude: appl.lat, longitude: appl.lon });
      })
      setCordata(cors)
      setActivateIndex(0)
      // console.log('cors', cors)
      // console.log('date: ', dailyCheckinItems[0].date)
      // reset index
      setActivateIndex(0)
      if (listAppls)
        if (listAppls.length > 0) {
          mapRef.current.animateToCoordinate(
            { latitude: listAppls[0].lat, longitude: listAppls[0].lon }, 0
          )
          carouselRef.current.snapToItem(0)
          makerRef[0].showCallout()
        }
    }
  }

  useEffect(() => {
    // change date  
    if (!props.staff.fetchingDaily && reDate !== today)
      setOtherDay()
    if (props.staff.data_done && reDate === today)
      setToday()
    console.log('chay lan 2', reDate, listAppls)

  }, [reDate, props.staff.fetchingDaily, filterStaffs, filterType, props.staff.data_done]);

  useEffect(() => {
    // change date
    if (props.staff.data_done && reDate === today)
      setToday()
  }, [props.staff.pullcnt]);


  const sortTime = (list) => {
    return list.sort(function (a, b) {
      return Date.parse(a.endtime) - Date.parse(b.endtime);
    })
  }


  const filterListAppl = (filterStaffs, filterType, listCheckin, lastCheckin, firstCheckin) => {
    var newAppl
    if (filterType == "all") {
      newAppl = [...listCheckin]
    } else if (filterType == "last")
      newAppl = [...lastCheckin]
    else
      newAppl = [...firstCheckin]

    if (filterStaffs.length !== 0) {
      newAppl = newAppl.filter(appl => filterStaffs.includes(appl.staff_id))
      if (newAppl.length > 0)
        mapRef.current.animateToCoordinate(
          { latitude: newAppl[0].lat, longitude: newAppl[0].lon }, 0
        )
    }

    return newAppl
  }

  const renTypeMap = () => {
    return (
      <DropDownPicker
        items={listType}
        placeholder="Loại checkin"
        containerStyle={{ height: 40 }}
        dropDownMaxHeight={300}
        itemStyle={{ justifyContent: "flex-start" }}
        placeholderStyle={{ fontWeight: "normal", color: "grey" }}
        style={[styles.row, { borderRadius: 30 }]}
        labelStyle={{
          paddingTop: 5,
          fontSize: 15,
          fontWeight: '900',
          textAlign: "center",
          color: "black",
          zIndex: 10,
        }}
        selectedLabelStyle={{
          color: colors.primary,
        }}
        dropDownStyle={{ backgroundColor: "white" }}
        defaultValue={"last"}
        onChangeItem={(value) => {
          setFilterType(value.value)
        }}
        //onChangeItem={(item) => setPersonContact(item.value)}
        zIndex={100}
      />
    );
  };



  const renSelectDate = () => {
    if (isShowDate)
      return (
        <CalendarStrip
          scrollable
          style={{ height: 70, marginRight: 0, paddingLeft: 0, }}
          calendarColor={"white"}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 0,
            borderHighlightColor: "grey",
          }}
          highlightDateNumberStyle={{ color: "red" }}
          highlightDateNameStyle={{ color: 'red', fontWeight: 'bold' }}
          calendarHeaderStyle={{ color: "black" }}
          dateNumberStyle={{ color: "black", fontWeight: 'normal' }}
          dateNameStyle={{ color: "black" }}
          iconContainer={{ flex: 0.1 }}
          selectedDate={reDate}
          onDateSelected={(date) => {
            setRedate(date.format('YYYY-MM-DD'));
            setShowDate(false)
            if (date.format('YYYY-MM-DD') !== today)
              props.getDailyStaffCheckin({
                query_date: date.format('YYYY-MM-DD'),
                token: props.token
              })
          }}
        />
      );
  };

  const Map_Derection_result = () => {
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

    return (
      <View style={styles.row}>
        <View style={styles.box} >
          <Text style={{
            paddingLeft: 10,
            paddingTop: 10,
            fontSize: 20,
            fontWeight: "bold",
            color: colors.gray,
          }}>Lộ trình di chuyển</Text>
          <Text style={{
            paddingLeft: 10,
            fontSize: 12,
            color: "grey",
          }}>{dateformatted}</Text>

        </View >
        <Button
          mode={"outlined"}
          labelStyle={{
            color: [0, listStaffChecked.length].includes(filterStaffs.length) ? colors.success : colors.lightGray,
            fontSize: 12
          }}
          onPress={() => setFilterStaffs([])}
        >
          Xem tất cả
          </Button>
      </View>
    );
  };



  const _renderItem = ({ item, index }) => {

    let avatar = {
      uri: Object.values(props.staff.staffs).filter((staff) => {
        return staff.staff_id == item.staff_id
      })[0].info.avatar
    }
    if (!avatar.uri)
      avatar = EMPTYAVATAR

    if (item.time)
      return (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: colors.lightGray,
            backgroundColor: 'white',
            borderRadius: 20,
            minHeight: CARD_HEIGHT,
            padding: 5
          }}
        >
          <View style={styles.row}>
            <View style={[styles.box, { flex: 0.25, }]}>
              <Image source={avatar}
                imageStyle={{ borderRadius: 50 }}
                style={[{ height: 40, width: 40, borderRadius: 50, resizeMode: "cover" }]} />
            </View>
            <View style={[styles.box]}>
              <Text style={{ fontSize: 14, }}>{item.staff_id} - {item.fc_name}</Text>
              <Text style={{ fontSize: 10, marginTop: 5 }}>{item.starttime.substring(0, 10)} | Từ {item.starttime.substring(11, 16)} đến {item.endtime.substring(11, 16)} </Text>
              <Text style={{ fontSize: 10, }}>Đã ở khu vực này khoảng {item.time}</Text>
            </View>
          </View>

        </TouchableOpacity>
      )
    else return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: colors.lightGray,
          backgroundColor: 'white',
          borderRadius: 20,
          minHeight: CARD_HEIGHT,
          padding: 10
        }}
      >
        <View style={styles.row}>
          <View style={[styles.box, { flex: 0.2 }]}>
            <Image source={avatar}
              imageStyle={{ borderRadius: 50 }}
              style={{ height: 40, width: 40, borderRadius: 50, resizeMode: "cover" }} />
          </View>
          <View style={[styles.box]}>
            <Text style={{ fontSize: 14 }}>{item.staff_id} - {item.fc_name}</Text>
            <Text style={{ fontSize: 10, marginTop: 5 }}>{item.endtime.substring(0, 10)} | {item.endtime.substring(11, 16)} </Text>
            <Text style={{ fontSize: 10 }}></Text>
          </View>
        </View>
      </TouchableOpacity>
    )

  };

  const _renderItemCheckin = ({ item, index }) => {

    let avatar = {
      uri: Object.values(props.staff.staffs).filter((staff) => {
        return staff.staff_id == item.staff_id
      })[0].info.avatar
    }
    if (!avatar.uri)
      avatar = EMPTYAVATAR

    const handlePress = () => {
      const array = [...filterStaffs]
      const index = filterStaffs.indexOf(item.staff_id);
      if (index > -1)
        array.splice(index, 1);
      else
        array.push(item.staff_id)
      setFilterStaffs(array)
      console.log(array)
    }



    return (
      <TouchableOpacity
        onPress={() => handlePress()}
        style={{
          ///backgroundColor: filterStaffs.includes(item.staff_id) ? colors.success : 'white',
          borderRadius: 20,
          borderWidth: filterStaffs.includes(item.staff_id) || filterStaffs.length === 0 ? 2 : 1,
          borderColor: filterStaffs.includes(item.staff_id) || filterStaffs.length === 0 ? colors.success : colors.lightGray,
          padding: 3,
          margin: 2,
          width: width * 0.95 / 3
        }}>

        <View style={[styles.row, { borderRadius: 20, }]}>
          <View style={[styles.box, { flex: 0.3 }]}>
            <Image source={avatar}
              imageStyle={{ borderRadius: 50 }}
              style={{ height: 20, width: 20, borderRadius: 50, resizeMode: "cover" }} />
          </View>
          <View style={[styles.box]}>
            <Text style={{ fontSize: 11 }}>{item.staff_id}</Text>
            <Text style={{ fontSize: 8 }}>{item.fc_name}</Text>
          </View>
        </View>

      </TouchableOpacity>

    );
  };

  const _renderItemNotCheckin = ({ item, index }) => {

    let avatar = {
      uri: Object.values(props.staff.staffs).filter((staff) => {
        return staff.staff_id == item.staff_id
      })[0].info.avatar
    }
    if (!avatar.uri)
      avatar = EMPTYAVATAR

    return (
      <TouchableOpacity
        style={{
          ///backgroundColor: filterStaffs.includes(item.staff_id) ? colors.success : 'white',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.secondary,
          padding: 3,
          margin: 2,
          width: width * 0.95 / 3
        }}>
        <View style={[styles.row, { borderRadius: 20, }]}>
          <View style={[styles.box, { flex: 0.3 }]}>
            <Image source={avatar}
              imageStyle={{ borderRadius: 50 }}
              style={{ height: 20, width: 20, borderRadius: 50, resizeMode: "cover" }} />
          </View>
          <View style={[styles.box]}>
            <Text style={{ fontSize: 11 }}>{item.staff_id}</Text>
            <Text style={{ fontSize: 8 }}>{item.info.fc_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _renMarkerAvatar = (appl, staffs, index) => {

    let avatar = {
      uri: Object.values(staffs).filter((staff) => {
        return staff.staff_id == appl.staff_id
      })[0].info.avatar
    }
    if (!avatar.uri)
      avatar = EMPTYAVATAR


    if (index === activeIndex)
      return <View style={{ borderRadius: 50, }}>
        {/* <Text style={styles.msgTxt}>{appl.staff_id} - {appl.endtime.substring(11, 16)}</Text> */}
        <Animated.View style={{ borderRadius: 50 }}>
          <Animated.Image source={avatar}
            opacity={opacity}
            imageStyle={{ borderRadius: 50 }}
            style={{ height: 30, width: 30, borderRadius: 50, resizeMode: "cover", }} />
        </Animated.View>
      </View>

    return <View style={{ borderRadius: 50 }}>
      {/* <Text style={styles.msgTxt}>{appl.staff_id} - {appl.endtime.substring(11, 16)}</Text> */}
      <Animated.View style={{ borderRadius: 50 }}>
        <ImageBackground source={avatar}
          imageStyle={{ borderRadius: 50, }}
          style={{ height: 25, width: 25, borderRadius: 50, resizeMode: "cover" }} >
        </ImageBackground>
      </Animated.View>
    </View>

  }



  const renderMap = () => {
    return (
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        ref={mapRef}
        zoomTapEnabled={true}
        zoomControlEnabled={true}
        loadingEnabled={true}
        fitToSuppliedMarkers={cordata}
      >
        {
          listAppls.map((marker, index) => {
            let description = `${marker.fc_name} - ${marker.endtime.substring(11, 16)}`
            return (
              <Marker
                coordinate={{ latitude: marker.lat, longitude: marker.lon }}
                key={index}
                // identifier={index}
                onPress={() => {
                  setActivateIndex(index)
                  carouselRef.current.snapToItem(index)
                }}
                description={description}
                ref={(ref) => makerRef[index] = ref}
              >
                <View>
                  {_renMarkerAvatar(marker, props.staff.staffs, index)}
                </View>
              </Marker>
            )
          }
          )
        }

      </MapView>
    )
  }

  const renderInfos = () => {

    return (
      <View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.row}>
            <Text style={{
              color: colors.success,
              paddingLeft: 10,
              fontSize: 12,
            }}>Các nhân viên đã checkin: {listStaffChecked.length}/{props.staff.staffs.length}</Text>
          </View>
          <FlatList
            style={{ marginLeft: 5 }}
            data={listStaffChecked}
            renderItem={_renderItemCheckin}
            key={(item) => item.staff_id}
            numColumns={3}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{
            paddingLeft: 10,
            fontSize: 12,
            color: colors.gray,
          }}> Các nhân viên Chưa checkin: {listStaffNotChecked.length}/{props.staff.staffs.length}</Text>
          <FlatList
            style={{ marginLeft: 5 }}
            data={listStaffNotChecked}
            renderItem={_renderItemNotCheckin}
            key={(item) => item.staff_id}
            numColumns={3}
          />
        </View>
      </View>
    )
  }

  if (!listAppls) {
    console.log('listapp ', listAppls)
    return (
      <View style={[{ alignItems: 'center' }]}>
        <ActivityIndicator size={100} color={colors.primary} />
        <Text>Loading ... </Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>


      {renderMap()}

      <View style={{ flex: 2, marginTop: 5 }}>
        <Carousel
          layout={'default'}
          ref={carouselRef}
          data={listAppls}
          sliderWidth={SliderWidth}
          itemWidth={SliderWidth * 0.8}
          itemHeight={CARD_HEIGHT}
          renderItem={_renderItem}
          useScrollView={false}

          onSnapToItem={(index) => {
            setActivateIndex(index)
            mapRef.current.animateToCoordinate(
              { latitude: listAppls[index].lat, longitude: listAppls[index].lon }, 0
            )
            makerRef[index].showCallout()
            // makerRef[index].redrawCallout()
            // mapRef.current.fitToElements()
            // mapRef.current.fitToSuppliedMarkers([index]) // mapRef.current.fitToSuppliedMarkers([index])
          }}
          activeSlideAlignment="center"
        />
      </View>
      <View style={[styles.rowz, { padding: 5, }]}>
        <Button
          mode={"outlined"}
          style={{
            borderRadius: 30,
          }}
          labelStyle={{
            color: colors.primary,
            fontSize: 15,
          }}
          style={[styles.box,]}
          onPress={() => setShowDate(isShowDate ? false : true)}
        > Dữ liệu trong ngày {reDate}</Button>
        {renSelectDate()}
        {/* {renStaffMap()} */}
        {renTypeMap()}
        {/* <Button
          mode={"outlined"}
          labelStyle={{
            color: [0, listStaffChecked.length].includes(filterStaffs.length) ? colors.success : colors.lightGray,
            fontSize: 1
          }}
          onPress={() => setFilterStaffs([])}
        >
          Xem tất cả
          </Button> */}
      </View>


      { Map_Derection_result()}

      {renderInfos()}


    </ScrollView >
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',

  },
  rowz: {
    ...(Platform.OS !== "android" && {
      zIndex: 10,
    }),
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  boxz: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    ...(Platform.OS !== "android" && {
      zIndex: 10,
    }),
  },
  mapStyle: {
    minHeight: height * 0.5,
    flex: 6,
    marginRight: 5,
    marginLeft: 5,
  },
  logo: {
    fontSize: 25,
    color: colors.success,
    padding: 3,
  },

  msgTxt: {
    fontWeight: '400',
    color: colors.textcolor,
    fontSize: 11,
    marginLeft: 10,
  },

  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },

})

const mapStateToProps = (state, ownProps) => {
  return {
    staff: state.staff,
    token: state.token.token.access,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDailyStaffCheckin: (config) => {
      dispatch({
        type: constAction.STAFF_DAILY_CHECKIN_REQUEST,
        config
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerMap);
