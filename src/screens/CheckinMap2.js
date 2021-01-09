import React, { useState, useEffect, useRef } from 'react';
import  { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
//import MapView from 'react-native-map-clustering';
//import { MapView, Marker, PROVIDER_GOOGLE  } from 'expo'
import { Button, Dialog, Portal, } from 'react-native-paper';
import { 
  StyleSheet, Text, View, Dimensions, TouchableOpacity,
  Animated, ScrollView, FlatList,  
} from 'react-native'

import { connect } from "react-redux";
import { styles as masterStyle, colors } from '../styles'
import ContractDetail from '../components/ContractDetail'
import Ionicons from 'react-native-vector-icons/Ionicons';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

import Carousel from 'react-native-snap-carousel';
const SliderWidth = Dimensions.get('screen').width;



function CheckinMap(props) {

  //const listAppls = props.data.data.filter((appl) => {
  //  return props.showlists.includes(appl.appl_id)
  //})
  const mapRef = useRef(null);


  const listAppls = Object.values(props.map.checkin)

    

  const listLat = listAppls.map(appl => appl.lat)
  const listLon = listAppls.map(appl => appl.lon)
  const meanLat = listLat.reduce(function(sum, pay){
    return sum = sum+pay;
  },0) / listAppls.length


  //const latDetal = (Math.max(listAppls.map(appl => appl.lat)) - Math.min(listAppls.map(appl => appl.lat))) / 2
  const latDetal = Math.max.apply(Math, listLat) - Math.min.apply(Math, listLat)  +0.05
  const lonDetal = Math.max.apply(Math, listLon) - Math.min.apply(Math, listLon) +0.05

  const meanLon = listAppls.map(appl => appl.lon).reduce(function(sum, pay){
    return sum = sum+pay;
  },0) / listAppls.length





  const [activeIndex, setActivateIndex] = useState(0); 
  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          height: 100,
        }}>
        <Text style={{ fontSize: 10 }}>{item.runtime}</Text>
        <Text style={{ fontSize: 10 }}>{item.device_brand} - {item.device_name}  </Text>
        <Text style={{ fontSize: 10 }}>{item.lat} - {item.lon}</Text>
      </TouchableOpacity>
      
    );
  };

  
  const renMarker = (index, length, appl) => {
    const showTime = (time) => {
      if (time > 15) return <Text style={styles.msgTxt}>{"khoảng " +time+ " phút"}</Text>
    }
    if(index===0) {
      return <View>
      <Text style={styles.msgTxt}>Start {appl.runtime.substring(11, 16)}
      <Ionicons name='ios-disc' 
        style={[styles.logo, {color: colors.secondaryGradientEnd}]}/> </Text>
      {/* {showTime(appl.time)} */}
    </View>
    } 
    if (index===length-1) {
      return <View>
      <Text style={styles.msgTxt}>Finish {appl.runtime.substring(11, 16)}
      <Ionicons name='ios-pin' 
        style={[styles.logo, {fontSize:45}]}/> </Text>
      {/* {showTime(appl.time)} */}
    </View>
    } 
    return <View>
    <Text style={styles.msgTxt}>{index} | {appl.runtime.substring(11, 16)}
    <Ionicons name='ios-disc' 
       style={[styles.logo, {color: colors.primary}]}/> </Text>
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
              coordinate = {{latitude:marker.lat, longitude: marker.lon}}
              key={index}
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
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 500 }}>
      <Carousel
        layout={'default'}
        data={listAppls}
        sliderWidth={SliderWidth}
        itemWidth={300}
        renderItem={_renderItem}
        useScrollView={true}
        onSnapToItem={(index) => {
          setActivateIndex(index)
          mapRef.current.animateToCoordinate(
            {latitude: listAppls[index].lat, longitude: listAppls[index].lon}, 0
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
  logo:{
    fontSize:25,
    color: colors.green,
    padding: 3,
  },
  nameTxt: {
    marginLeft: 10,
    fontWeight: '900',
    color: '#222',
    fontSize: 15,
    width:190,
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
