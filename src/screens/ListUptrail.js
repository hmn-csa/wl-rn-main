import {
  View, Text, Image, ScrollView, Alert, FlatList,
  StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions
} from 'react-native'
import { FAB, Portal, Provider } from 'react-native-paper';
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
import { FontAwesome5 } from '@expo/vector-icons';
// function Uptrail

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 8;
const SliderWidth = Dimensions.get('screen').width;


function ListUptrail(props) {

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 30;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const [pageMap, setPageMap] = useState(false)
  const [reDate, setRedate] = useState(null)

  const mapRef = useRef(null)
  const makerRef = {}
  const carouselRef = useRef(null)

  const [initialRegion, setInitialRegion] = useState(calInitialRegion(props.uptrails.uptrails));
  const [activeIndex, setActivateIndex] = useState(0);

  const getDailyUptrails = (date) => {
    props.getDailyUptrails({
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

  const renSelectDate = () => {

    return (
      <View style={[styles.row, {}]}>
        <View style={[styles.box, { backgroundColor: 'white', borderRadius: 5, marginRight: 10, paddingLeft: 5 }]}>
          <Text>Chọn ngày để xem báo cáo: </Text>
        </View>
        <View style={[styles.box, { backgroundColor: colors.secondary, borderRadius: 5, }]}>
          <DatePicker
            date={reDate}
            mode="date"
            placeholder="ngày"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 4,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 35,
                borderWidth: 0,
              },
              dateText: {
                fontWeight: "800",
                color: 'white',
                fontSize: 12,
              }
            }}
            onDateChange={(date) => {
              setRedate(date)
              getDailyUptrails(date)
            }}
          />
        </View>
      </View>
    )

  }
  // -------------------------------------

  if (props.uptrails.dailyFetching)
    return <Loader />
  else if (props.uptrails.dailyUptrails.length > 0 && pageMap) {
    return <View style={styles.container}>

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Portal>
          <FAB
            style={{
              position: 'absolute',
              bottom: 220,
              right: 20,
              backgroundColor: 'white',
            }}
            icon={(props) => <FontAwesome5 name="list-alt"  {...props} />}
            color={colors.danger}
            onPress={() => setPageMap(false)}
          />
        </Portal>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          initialRegion={calInitialRegion(props.uptrails.dailyUptrails)}
        >
          {
            props.uptrails.dailyUptrails.map((appl, index) => {
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
        style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 10 }}>
        <Carousel
          ref={carouselRef}
          layout={'default'}
          data={props.uptrails.dailyUptrails}
          sliderWidth={SliderWidth}
          itemWidth={width * 0.9}
          itemHeight={CARD_HEIGHT}
          renderItem={_renderItem}
          useScrollView={true}
          onSnapToItem={(index) => {
            setActivateIndex(index)
            mapRef.current.animateToCoordinate(
              { latitude: props.uptrails.dailyUptrails[index].lat, longitude: props.uptrails.uptrails[index].lon }, 0
            )
            if (makerRef[index] != undefined)
              makerRef[index].showCallout()
          }}
          activeSlideAlignment="center"
        />
      </View>
    </View >
  }

  else if (props.uptrails.dailyUptrails.length > 0 && pageMap === false) {
    return (
      <ScrollView
        style={{ padding: 5, paddingBottom: 40 }}
      >
        {renSelectDate()}

        <Portal>
          <FAB
            style={{
              position: 'absolute',
              bottom: 220,
              right: 20,
              backgroundColor: 'white',
            }}
            icon={(props) => <FontAwesome5 name="map-marked-alt"  {...props} />}
            color={colors.danger}
            onPress={() => setPageMap(true)}
          />
        </Portal>
        {props.uptrails.dailyUptrails.map(item =>
          <Uptrail
            key={item.runtime}
            item={item}
            navigation={props.navigation}
          />)
        }
      </ScrollView>
    )
  }
  return (
    <ScrollView>

      {renSelectDate()}
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
    getDailyUptrails: (config) => {
      dispatch({
        type: constAction.DAILY_UPTRAIL_REQUEST,
        config
      })
    },
    updateShowlist: (content) => {
      dispatch({
        type: constAction.SET_TODO_SHOWLIST,
        content,
      })
    },
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
  row: {
    width: '95%',
    marginVertical: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  box: {
    justifyContent: 'center',
    flex: 1,

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

export default connect(mapStateToProps, mapDispatchToProps)(ListUptrail);

