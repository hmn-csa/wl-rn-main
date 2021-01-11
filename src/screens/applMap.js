import React, { useState, useEffect, useRef } from 'react';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
//import { MapView, Marker, PROVIDER_GOOGLE  } from 'expo'
import { Button, Dialog, Portal, } from 'react-native-paper';
import {
  StyleSheet, Text, View,TouchableOpacity, Dimensions,
  ScrollView, FlatList
} from 'react-native'
import { connect } from "react-redux"
import Carousel from 'react-native-snap-carousel'

import { styles as masterStyle, BACKGROUND_LOGIN } from '../styles'
import ContractDetailMap from '../components/ContractDetailMap'


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4.5;


const SliderWidth = Dimensions.get('screen').width;


function applMap(props) {

  //const listAppls = props.data.data.filter((appl) => {
  //  return props.showlists.includes(appl.appl_id)
  //})


  const _renderItem = ({ item, index }) => {
    return (
      <ContractDetailMap
        opacity={0.2}
        key={item.appl_id}
        contractId={item.appl_id}
        navigation={props.navigation}
      />
    );
  };


  const mapRef = useRef(null);
  const carouselRef = useRef(null);

  const showlists = props.showlists.applIds.map(appl => appl.appl_id)
  const listAppls = Object.values(props.data).filter((appl) => {
    return showlists.includes(appl.appl_id)
  })

  const listLat = listAppls.map(appl => appl.lat)
  const listLon = listAppls.map(appl => appl.lon)
  const meanLat = listLat.reduce(function (sum, pay) {
    return sum = sum + pay;
  }, 0) / listAppls.length

  //const latDetal = (Math.max(listAppls.map(appl => appl.lat)) - Math.min(listAppls.map(appl => appl.lat))) / 2
  const latDetal = Math.max.apply(Math, listLat) - Math.min.apply(Math, listLat) + 0.05
  const lonDetal = Math.max.apply(Math, listLon) - Math.min.apply(Math, listLon) + 0.05

  const meanLon = listAppls.map(appl => appl.lon).reduce(function (sum, pay) {
    return sum = sum + pay;
  }, 0) / listAppls.length

  //const [appl_id, setAppl_id] = useState(listAppls[0].appl_id);
  const [activeIndex, setActivateIndex] = useState(0);


  if (listAppls.length > 0)
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          initialRegion={{
            latitude: meanLat,
            longitude: meanLon,
            latitudeDelta: latDetal,
            longitudeDelta: lonDetal,
          }}

        >
          {
            listAppls.map((appl, index) =>
              <Marker
                coordinate={{ latitude: appl.lat, longitude: appl.lon }}
                key={appl.appl_id}
                description={appl.appl_id}
                onPress={() => {
                  //setAppl_id(appl.appl_id)
                  setActivateIndex(index)
                  carouselRef.current.snapToItem(index)
                }}
                Color={'blue'}
              />
            )
          }
        </MapView>
      </View>
      <View 
        opacity={0.8}
        style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
        <Carousel
          ref={carouselRef}
          layout={'default'}
          data={listAppls}
          sliderWidth={SliderWidth}
          itemWidth={width * 0.9}
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
  else 
    return(
      <View><Text>Không có hợp đồng</Text></View>
    )
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
})

const mapStateToProps = (state, ownProps) => {
  return {
    showlists: state.showlists,
    data: state.data.data,
    token: state.token,
    vsf: state.vsf
  }
}

export default connect(mapStateToProps, null)(applMap);
