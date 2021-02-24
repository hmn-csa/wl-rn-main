import React, { useState, useEffect, useRef } from 'react';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
//import { MapView, Marker, PROVIDER_GOOGLE  } from 'expo'
import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions,
  ScrollView, FlatList, Animated
} from 'react-native'
import { connect } from "react-redux"
import Carousel from 'react-native-snap-carousel'
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import ContractDetailMap from '../components/ContractDetailMap'
import { colors } from "../styles";
import { calInitialRegion } from '../functions'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 10;
const SliderWidth = Dimensions.get('screen').width;

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


function applMap(props) {

  const mapRef = useRef(null)
  const makerRef = {}
  const carouselRef = useRef(null)
  const opacity = usePulse();

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

  const _renderMarker = (appl, index) => {

    if (index !== activeIndex)
      return (
        <Marker
          coordinate={{ latitude: appl.lat, longitude: appl.lon }}
          key={index}
          description={appl.appl_id}
          onPress={() => {
            setActivateIndex(index);
            carouselRef.current.snapToItem(index);
          }}
          ref={(ref) => (makerRef[index] = ref)}
        >
          <MaterialCommunityIcons name="map-marker" size={24} color={colors.secondary} />
        </Marker>
      );
    else
      return (
        <Marker
          coordinate={{ latitude: appl.lat, longitude: appl.lon }}
          key={index}
          description={appl.appl_id}
          onPress={() => {
            setActivateIndex(index);
            carouselRef.current.snapToItem(index);
          }}
          ref={(ref) => (makerRef[index] = ref)}
        >
          <Animated.View opacity={opacity}>
            <MaterialCommunityIcons
              name="map-marker-check"
              size={24}
              color={colors.success}
            />
          </Animated.View>
        </Marker>
      );
  };

  const _renderItem = ({ item, index }) => {
    return (
      <ContractDetailMap
        key={index}
        contractId={item.appl_id}
        navigation={props.navigation}
        type={"map"}
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
              listAppls.map((appl, index) => _renderMarker(appl, index))
            }
          </MapView>
        </View>
        <View
          opacity={0.9}
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
              if (makerRef[index] != undefined)
                makerRef[index].showCallout()
            }}
            activeSlideAlignment="center"
          />
        </View>

      </View>
    );
  else
    return (
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
