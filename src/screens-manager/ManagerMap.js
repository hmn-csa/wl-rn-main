import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import MapView from 'react-native-map-clustering';
import { FAB, Portal, Provider } from 'react-native-paper';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated,
  Image, ImageBackground, FlatList, ActivityIndicator
} from 'react-native'

import Carousel from 'react-native-snap-carousel';
import { connect } from "react-redux";
import { styles as masterStyle, colors } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { EMPTYAVATAR } from '../images';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 8.5;
const CARD_WIDTH = CARD_HEIGHT - 50;
const SliderWidth = Dimensions.get('screen').width;

import { calInitialRegion } from '../functions'





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

  const [listAppls, setListappls] = useState(null)
  const [activeIndex, setActivateIndex] = useState(0);
  const [initialRegion, setInitialRegion] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: null,
    longitudeDelta: null,
  });
  const mapRef = useRef(null);
  const makerRef = {};
  const carouselRef = useRef(null);


  useEffect(() => {
    if (props.staff.data_done) {
      setListappls(props.staff.lastCheckin)
      setInitialRegion(calInitialRegion(props.staff.lastCheckin))
    }
  }, [props.staff.pullcnt]);

  const opacity = usePulse();

  const sortTime = (list) => {
    return list.sort(function(a,b){
      return Date.parse(a.endtime)  - Date.parse(b.endtime);
    })
  }

  const [stateFAB, setStateFAB] = React.useState({ open: false });
  const onStateChange = ({ open }) => setStateFAB({ open });
  const { open } = stateFAB;


  

  const _renderItem = ({ item, index }) => {

    let avatar = {
      uri: Object.values(props.staff.staffs).filter((staff) => {
        return staff.staff_id == item.staff_id
      })[0].info.avatar
    }
    if (!avatar.uri)
      avatar = EMPTYAVATAR
    const _renTime = (item) => {
      if (item.time)
        return (
          <View>
            <View style={styles.row}>
              <View style={[styles.box, { flex: 0.3 }]}>
                <Image source={avatar}
                  imageStyle={{ borderRadius: 50 }}
                  style={[{ height: 30, width: 30, borderRadius: 50, resizeMode: "cover" }]} />
              </View>
              <View style={[styles.box]}>
                <Text style={{ fontSize: 11 }}>{item.staff_id} - {item.fc_name}</Text>
                <Text style={{ fontSize: 10 }}>Từ {item.starttime.substring(11, 16)} đến {item.endtime.substring(11, 16)} </Text>
              </View>
            </View>
            <View style={[styles.row, { padding: 10 }]}>
              <Text style={{ fontSize: 10 }}>Đã ở khu vực này khoảng {item.time}</Text>
            </View>
          </View>
        )
      else return (
        <View>
          <View style={styles.row}>
            <View style={[styles.box, { flex: 0.3 }]}>
              <Image source={avatar}
                imageStyle={{ borderRadius: 50 }}
                style={{ height: 30, width: 30, borderRadius: 50, resizeMode: "cover" }} />
            </View>
            <View style={[styles.box]}>
              <Text style={{ fontSize: 11 }}>{item.staff_id} - {item.fc_name}</Text>
              <Text style={{ fontSize: 10 }}>{item.endtime.substring(11, 16)} </Text>
            </View>
          </View>
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

    let avatar = {
      uri: Object.values(staffs).filter((staff) => {
        return staff.staff_id == appl.staff_id
      })[0].info.avatar
    }
    if (!avatar.uri)
      avatar = EMPTYAVATAR

    if (appl.isLast)
      return <View style={{ borderRadius: 50 ,  }}>
        {/* <Text style={styles.msgTxt}>{appl.staff_id} - {appl.endtime.substring(11, 16)}</Text> */}
        <Animated.View style={{ borderRadius: 50 }}>
          <Animated.Image source={avatar}
            opacity={opacity}
            imageStyle={{ borderRadius: 50 }}
            style={{ height: 25, width: 25, borderRadius: 50, resizeMode: "cover", }} />
        </Animated.View>
      </View>

    return <View style={{ borderRadius: 50 }}>
      {/* <Text style={styles.msgTxt}>{appl.staff_id} - {appl.endtime.substring(11, 16)}</Text> */}
      <Animated.View style={{ borderRadius: 50 }}>
        <ImageBackground source={avatar}
          opacity={0.5}
          imageStyle={{ borderRadius: 50, }}
          style={{ height: 20, width: 20, borderRadius: 50, resizeMode: "cover" }} >
        </ImageBackground>

      </Animated.View>
    </View>

  }

  if (!listAppls)
    return (
      <View style={[{ alignItems: 'center' }]}>
        <ActivityIndicator size={100} color={colors.primary} />
        <Text>Loading ... </Text>
      </View>
    )
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
              let description = `${marker.fc_name} - ${marker.endtime.substring(11,16)}`
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
                    {renMarkerAvatar(marker, props.staff.staffs)}
                  </View>
                </Marker>
              )
            }
            )
          }

        </MapView>
      </View>


      <Provider>
        <Portal>
          <FAB.Group
            style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: -10 }}
            // style={{position: 'absolute' , paddingBottom: CARD_HEIGHT * 4}}
            open={open}
            icon={open ? 'calendar-today' : 'plus'}
            actions={[
              {
                icon: 'bell',
                label: 'sort',
                onPress: () => setListappls(sortTime(props.staff.listCheckin)),
              },
              {
                icon: 'star',
                label: 'last',
                onPress: () => setListappls(props.staff.lastCheckin),
              },
              {
                icon: 'email',
                label: 'all',
                onPress: () => setListappls(props.staff.listCheckin),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: height - CARD_HEIGHT * 4 }}>

        <Carousel
          layout={'default'}
          ref={carouselRef}
          data={listAppls}
          sliderWidth={SliderWidth}
          itemWidth={SliderWidth * 0.7}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
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

  msgTxt: {
    fontWeight: '400',
    color: colors.textcolor,
    fontSize: 11,
    marginLeft: 10,
  },
  //================

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

})

const mapStateToProps = (state, ownProps) => {
  return {
    staff: state.staff,
  }
}

export default connect(mapStateToProps, null)(ManagerMap);
