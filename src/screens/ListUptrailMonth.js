import {
  View, Text, Image, ScrollView, Alert, FlatList,
  StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions
} from 'react-native'
import { Button, Portal, Provider, FAB } from 'react-native-paper';
import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import { colors } from '../styles'
import axios from "axios"
import DatePicker from 'react-native-datepicker'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel'
import { actGetUptrails, actUpdateShowlist } from "../actions/index"
import Loader from '../components/elements/Loader'
import Uptrail from '../components/Uptrail'
import * as constAction from '../consts'
import { calInitialRegion } from '../functions'
// function Uptrail

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 8;
const SliderWidth = Dimensions.get('screen').width;


function ListUptrailMonth(props) {

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 30;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const [pageMap, setPageMap] = useState(false)

  const [reDate, setRedate] = useState(null)
  const [uptrailStatus, setUptrailStatus] = useState(false);

  const mapRef = useRef(null)
  const makerRef = {}
  const carouselRef = useRef(null)

  const [initialRegion, setInitialRegion] = useState(calInitialRegion(props.uptrails.uptrails));
  const [activeIndex, setActivateIndex] = useState(0);

  const getDailyUptrails = (date) => {
    props.getUptrails({
      staff_id: props.token.active_staff,
      token: props.token.token.access,
      loaddate: date
    })
  }


  const _renderItem = ({ item, index }) => {
    return (
      <Uptrail
        key={item.runtime}
        item={item}
        navigation={props.navigation}
        type={'marker'}
      />
    );
  };

  const renMoreLoading = () => {
    if (props.uptrails.moreFetching)
      return (
        <View style={{ height: 80 }}>
          <Loader />
        </View>
      )
  }
  // ---------------------------------------
  const getMoreUptrails2 = () => {
    let loadfrom = props.uptrails.uptrails[props.uptrails.uptrails.length - 1].runtime
    let config = {
      staff_id: props.token.active_staff,
      token: props.token.token.access,
      loadfrom: loadfrom
    }
    props.getMoreUptrails(config)
  }


  // -------------------------------------

  const renMap = () => {
    return (
      <View style={{
      }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <MapView
            style={styles.mapStyle}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            initialRegion={calInitialRegion(props.uptrails.uptrails)}
          >
            {
              props.uptrails.uptrails.map((appl, index) => {
                let description = `${appl.appl_id}`
                return <Marker
                  coordinate={{ latitude: appl.lat, longitude: appl.lon }}
                  key={appl.appl_id}
                  description={description}
                  onPress={() => {
                    setActivateIndex(index)
                    carouselRef.current.snapToItem(index)
                  }}
                  Color={'blue'}
                  ref={(ref) => makerRef[index] = ref}
                />
              }
              )
            }
          </MapView>
        </View>
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: CARD_HEIGHT * 5 }}>
          <Carousel
            ref={carouselRef}
            layout={'default'}
            data={props.uptrails.uptrails}
            sliderWidth={SliderWidth}
            itemWidth={width * 0.9}
            itemHeight={CARD_HEIGHT}
            renderItem={_renderItem}
            useScrollView={true}
            onSnapToItem={(index) => {
              setActivateIndex(index)
              mapRef.current.animateToCoordinate(
                { latitude: props.uptrails.uptrails[index].lat, longitude: props.uptrails.uptrails[index].lon }, 0
              )
              if (makerRef[index] != undefined)
                makerRef[index].showCallout()
            }}
            activeSlideAlignment="center"
          />
        </View>

      </View>
    )
  }


  if (props.uptrails.fetching || uptrailStatus)
    return <Loader />
  else if (props.uptrails.uptrails.length > 0 && pageMap) {
    return <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          initialRegion={calInitialRegion(props.uptrails.uptrails)}
        >
          {
            props.uptrails.uptrails.map((appl, index) => {
              let description = `${appl.appl_id}`
              return <Marker
                coordinate={{ latitude: appl.lat, longitude: appl.lon }}
                key={index}
                description={description}
                onPress={() => {
                  setActivateIndex(index)
                  carouselRef.current.snapToItem(index)
                }}
                Color={'blue'}
                ref={(ref) => makerRef[index] = ref}
              />
            }
            )
          }
        </MapView>
      </View>
      <View
        style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBotom: 10 }}>
        <Carousel
          ref={carouselRef}
          layout={'default'}
          data={props.uptrails.uptrails}
          sliderWidth={SliderWidth}
          itemWidth={width * 0.9}
          itemHeight={CARD_HEIGHT}
          renderItem={_renderItem}
          useScrollView={true}
          onSnapToItem={(index) => {
            setActivateIndex(index)
            mapRef.current.animateToCoordinate(
              { latitude: props.uptrails.uptrails[index].lat, longitude: props.uptrails.uptrails[index].lon }, 0
            )
            if (makerRef[index] != undefined)
              makerRef[index].showCallout()
          }}
          activeSlideAlignment="center"
        />
      </View>
    </View>
  }

  else if (props.uptrails.uptrails.length > 0 && pageMap === false) {
    return (
      <ScrollView
        style={{ backgroundColor: 'white', padding: 10, paddingBottom: 40 }}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            getMoreUptrails2();
          }
        }}
      >

        {props.uptrails.uptrails.map(item =>
          <Uptrail
            key={item.runtime}
            item={item}
            navigation={props.navigation}
          />)
        }
        {renMoreLoading()}

      </ScrollView>
    )
  }
  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          getMoreUptrails2();
        }
      }}>
      <Text>không có Uptrail</Text>
    </ScrollView>
  )

}
const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    uptrails: state.uptrails,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getUptrails: (config) => {
      dispatch({
        type: constAction.API_UPTRAIL_REQUEST,
        config
      })
    },
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    },
    getMoreUptrails: (config) => {
      dispatch({
        type: constAction.MORE_UPTRAIL_REQUEST,
        config
      })
    }
  }
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


const buttonStyles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 10,
    marginLeft: 5,
    // backgroundColor: colors.primary,
    borderColor: null,
    width: width / 2 - 5
  },
});

const stylesTrail = StyleSheet.create({
  container: {
    backgroundColor: "#DCDCDC",
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUptrailMonth);

