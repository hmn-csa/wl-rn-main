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


import ContractDetailMap from '../components/ContractDetailMap'

import {calInitialRegion} from '../functions'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4.5;
const SliderWidth = Dimensions.get('screen').width;


function applMap(props) {

  const mapRef = useRef(null);
  const carouselRef = useRef(null);

  const [showlists, setShowlists] = useState(
    props.showlists.applIds.map(appl => appl.appl_id)
  )
  const [listAppls, setListAppls] = useState(
    Object.values(props.data).filter((appl) => {
      return showlists.includes(appl.appl_id)
    })
  )
  const [initialRegion, setInitialRegion] = useState(calInitialRegion(listAppls));
  const [activeIndex, setActivateIndex] = useState(0);

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


  if (listAppls.length > 0)
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          initialRegion={initialRegion}
        >
          {
            listAppls.map((appl, index) =>
              <Marker
                coordinate={{ latitude: appl.lat, longitude: appl.lon }}
                key={appl.appl_id}
                description={appl.appl_id}
                onPress={() => {
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
