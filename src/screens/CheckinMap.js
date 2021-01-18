import React, { useState, useEffect, useRef } from 'react';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
//import MapView from 'react-native-map-clustering';
//import { MapView, Marker, PROVIDER_GOOGLE  } from 'expo'
import { Button, Dialog, Portal, } from 'react-native-paper';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity,
  Animated, ScrollView, FlatList,
} from 'react-native'

import { connect } from "react-redux";
import { colors } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {calInitialRegion} from '../functions'
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 8;
const CARD_WIDTH = CARD_HEIGHT - 50;

import Carousel from 'react-native-snap-carousel';
const SliderWidth = Dimensions.get('screen').width;



function CheckinMap(props) {

  //const listAppls = props.data.data.filter((appl) => {
  //  return props.showlists.includes(appl.appl_id)
  //})


  const [listAppls, setListappls] = useState(Object.values(props.map.checkin))
  const [initialRegion, setInitialRegion] = useState(calInitialRegion(listAppls))
  const [activeIndex, setActivateIndex] = useState(0)

  const mapRef = useRef(null)
  const carouselRef = useRef(null)


  const _renderItem = ({ item, index }) => {

    const _renTime = (item) => {
      if (item.time)
        return (
          <View>
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
        <Text style={{ fontSize: 10 }}>{item.endtime.substring(0, 10)}  {item.endtime.substring(11, 16)} </Text>
        {
          _renTime(item)
        }

      </TouchableOpacity>

    );
  };


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
          initialRegion={initialRegion}
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
                    {renMarker(index, listAppls.length, marker)}
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
    map: state.map,
  }
}

export default connect(mapStateToProps, null)(CheckinMap);
