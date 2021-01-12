import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import MapView from 'react-native-map-clustering';
import { Button, Dialog, Portal, } from 'react-native-paper';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity,
  Image, ImageBackground, FlatList,
} from 'react-native'

import { connect } from "react-redux";
import { styles as masterStyle, colors } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { EMPTYAVATAR } from '../images';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 8;
const CARD_WIDTH = CARD_HEIGHT - 50;

import Carousel from 'react-native-snap-carousel';
import ManagerStaff from '../screens/ManagerStaff';
const SliderWidth = Dimensions.get('screen').width;


const renListMarker = (staff) => {
  const listMap2d = []
  for (let i = 0; i < staff.staffs.length; i++) {
    listMap2d.push(staff.staffs[i].checkin)
  }
  const listMap = Array.prototype.concat(...listMap2d);
  return listMap
}

const renLastMarker = (staff) => {
  let listMap = []
  for (let i = 0; i < staff.staffs.length; i++) {
    let checkin = staff.staffs[i].checkin
    if (checkin.length > 0)
      listMap.push(checkin[checkin.length - 1])
  }
  return listMap
}


function ManagerMap(props) {


  const [listAppls, setListappls] = useState(renListMarker(props.staff))
  //const [listAppls, setListappls] = useState(renLastMarker(props.staff))
  //setListappls(renListMarker(props.staff.staffs))

  const [activeIndex, setActivateIndex] = useState(0);
  const mapRef = useRef(null);
  const carouselRef = useRef(null);
  const listLat = listAppls.map(appl => appl.lat)
  const listLon = listAppls.map(appl => appl.lon)
  const meanLat = listLat.reduce(function (sum, pay) {
    return sum = sum + pay;
  }, 0) / listAppls.length
  const latDetal = Math.max.apply(Math, listLat) - Math.min.apply(Math, listLat) + 0.05
  const lonDetal = Math.max.apply(Math, listLon) - Math.min.apply(Math, listLon) + 0.05

  const meanLon = listAppls.map(appl => appl.lon).reduce(function (sum, pay) {
    return sum = sum + pay;
  }, 0) / listAppls.length




  const _renderItem = ({ item, index }) => {

    const _renTime = (item) => {
      if (item.time)
        return (
          <View>
            <Text style={{ fontSize: 12 }}>User: {item.staff_id} - {item.endtime.substring(11, 16)}</Text>
            <Text style={{ fontSize: 10 }}>Từ {item.starttime.substring(11, 16)} đến {item.endtime.substring(11, 16)} </Text>
            <Text style={{ fontSize: 10 }}>đã ở tại khu vực này khoảng {item.time}</Text>
          </View>
        )
    }
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          height: CARD_HEIGHT,
          padding: 10
        }}>
 
        {
          _renTime(item)
        }

      </TouchableOpacity>

    );
  };


  const renMarkerAvatar = (appl, staffs) => {


    let avatar = Object.values(staffs).filter((staff) => {
      return staff.staff_id == appl.staff_id
    })[0].info.avatar

    if (!avatar)
      return <View style={{ borderRadius: 50 }}>
        <Text style={styles.msgTxt}>{appl.staff_id} - {appl.endtime.substring(11, 16)}</Text>
        <View style={{ borderRadius: 50 }}>
          <ImageBackground source={EMPTYAVATAR}  imageStyle={{ borderRadius: 50 }} style={{ height: 20, width: 20, borderRadius: 50, resizeMode: "cover" }} />
        </View>
      </View>

    return <View style={{ borderRadius: 50 }}>
      <Text style={styles.msgTxt}>{appl.staff_id} - {appl.endtime.substring(11, 16)}</Text>
      <View style={{ borderRadius: 50 }}>
        <ImageBackground source={{ uri: avatar }} imageStyle={{ borderRadius: 50 }} style={{ height: 20, width: 20, borderRadius: 20, resizeMode: "cover" }} />
      </View>
    </View>

  }

  const renMarker = (index, length, appl) => {
    if (index === 0) {
      return <View>
        <Text style={styles.msgTxt}>Start {appl.endtime.substring(11, 16)}
          <Ionicons name='ios-disc'
            style={[styles.logo, { color: colors.secondaryGradientEnd }]} /> </Text>
        {/* {showTime(appl.time)} */}
      </View>
    }
    if (index === length - 1) {
      return <View>
        <Text style={styles.msgTxt}>Finish {appl.endtime.substring(11, 16)}
          <Ionicons name='ios-pin'
            style={[styles.logo, { fontSize: 45 }]} /> </Text>
        {/* {showTime(appl.time)} */}
      </View>
    }
    return <View>
      <Text style={styles.msgTxt}>{index} | {appl.endtime.substring(11, 16)}
        <Ionicons name='ios-disc'
          style={[styles.logo, { color: colors.primary }]} /> </Text>
    </View>
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: meanLat,
            longitude: meanLon,
            latitudeDelta: latDetal,
            longitudeDelta: lonDetal,
          }}
          ref={mapRef}
        >
          {
            listAppls.map((marker, index) => {
              return (
                <Marker
                  coordinate={{ latitude: marker.lat, longitude: marker.lon }}
                  key={index}
                  onPress={() => {
                    setActivateIndex(index)
                    carouselRef.current.snapToItem(index)
                  }}
                >

                  <View>
                    {renMarkerAvatar(marker, props.staff.staffs)}
                  </View>
                </Marker>
              )
            }
            )
          }

        </MapView>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 400 }}>
        <Carousel
          layout={'default'}
          ref={carouselRef}
          data={listAppls}
          sliderWidth={SliderWidth}
          itemWidth={SliderWidth * 0.6}
          itemHeight={CARD_HEIGHT}
          renderItem={_renderItem}
          useScrollView={false}
          onSnapToItem={(index) => {
            setActivateIndex(index)
            mapRef.current.animateToCoordinate(
              { latitude: listAppls[index].lat, longitude: listAppls[index].lon }, 0
            )
          }}
          activeSlideAlignment="center"
        />
      </View>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  logo: {
    fontSize: 25,
    color: colors.green,
    padding: 3,
  },
  nameTxt: {
    marginLeft: 10,
    fontWeight: '900',
    color: '#222',
    fontSize: 15,
    width: 190,
  },
  msgTxt: {
    fontWeight: '400',
    color: colors.textcolor,
    fontSize: 11,
    marginLeft: 10,
  },
  //================

  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
})

const mapStateToProps = (state, ownProps) => {
  return {
    staff: state.staff,
  }
}

export default connect(mapStateToProps, null)(ManagerMap);
