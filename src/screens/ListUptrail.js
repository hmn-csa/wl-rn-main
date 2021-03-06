import { Text, View, ScrollView, StyleSheet, Dimensions, Animated } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { colors } from "../styles";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Carousel from "react-native-snap-carousel";
import Loader from "../components/elements/Loader";
import Uptrail from "../components/Uptrail";
import * as constAction from "../consts";
import { calInitialRegion } from "../functions";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import CalendarStrip from "react-native-calendar-strip";
import MapViewDirections from "react-native-maps-directions";

// function Uptrail

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 8;
const SliderWidth = Dimensions.get("screen").width;
// const SliderHeight = Dimensions.get('screen').height;


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



function ListUptrail(props) {
  const dateObj = new Date()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const today = year + '-' + month + '-' + day;


  const [reDate, setRedate] = useState(today)


  const [initRegion, setInitRegion] = useState(
    calInitialRegion(props.dailyUptrails[reDate], props.token.lat, props.token.lon)
  )

  const mapRef = useRef(null)
  const makerRef = {}
  const carouselRef = useRef(null)
  const opacity = usePulse()

  const [cordata, setCordata] = useState([])

  const [Distance, setDistance] = useState(null);
  const [isDirectError, setIsDirectError] = useState(false);
  const [activeIndex, setActivateIndex] = useState(0);

  const getDailyUptrails = async (date) => {
    if (!props.dailyUptrails[date])
      await props.getDailyUptrails({
        staff_id: props.token.active_staff,
        token: props.token.token.access,
        loaddate: date,
      });

    if (props.dailyUptrails[date]) {
      const cors = []
      props.dailyUptrails[date].map((appl, index) => {
        cors.push({ latitude: appl.lat, longitude: appl.lon });
      })
      setCordata(cors)
    }
  };

  useEffect(() => {
    console.log("useEffect get data", reDate);
    getDailyUptrails(reDate);
  }, []);

  useEffect(() => {
    if (props.dailyUptrails[reDate]) {
      const cors = []
      props.dailyUptrails[reDate].map((appl, index) => {
        cors.push({ latitude: appl.lat, longitude: appl.lon });
      })
      setCordata(cors)
      setActivateIndex(0);
      if (props.dailyUptrails[reDate].length > 0) {
        mapRef.current.animateToCoordinate(
          {
            latitude: props.dailyUptrails[reDate][0].lat,
            longitude: props.dailyUptrails[reDate][0].lon,
          },
          0
        );
        carouselRef.current.snapToItem(0);
        setInitRegion(calInitialRegion(props.dailyUptrails[reDate]), props.token.lat, props.token.lon)
      }
    }
  }, [props.dailyUptrails, reDate]);

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
      <Uptrail
        key={item.runtime}
        item={item}
        navigation={props.navigation}
        type={""}
      />
    );
  };

  const renSelectDate = () => {
    return (
      <View style={{ flex: 1 }}>
        <CalendarStrip
          scrollable
          style={{ height: 90, marginRight: 0, paddingLeft: 0, paddingTop: 5, paddingBottom: 20 }}
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
            getDailyUptrails(date.format('YYYY-MM-DD'));
          }}
        />
      </View>
    );
  };


  const _renderDirection = () => {
    if (props.dailyUptrails[reDate].length > 0)
      return <MapViewDirections
        origin={cordata[0]}
        destination={cordata[cordata.length - 1]}
        waypoints={cordata.slice(1, -1)}
        mode="DRIVING"
        apikey={constAction.GOOGLEMAPKEY}
        language="en"
        strokeWidth={4}
        strokeColor="black"
        onReady={(result) => {
          setIsDirectError(false);
          setDistance(result.distance);
        }}
        onError={(errorMessage) => {
          setIsDirectError(true);
        }}
      />
  }

  const renderMapView = () => {



    if (props.dailyUptrails[reDate]) {
      return (
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          region={initRegion}
          zoomTapEnabled={true}
          zoomControlEnabled={true}
          loadingEnabled={true}
          fitToSuppliedMarkers={cordata}
        >
          {props.dailyUptrails[reDate].map((appl, index) => _renderMarker(appl, index))}
          {_renderDirection()}
        </MapView>
      )

    }
  }
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


    if (cordata.length == 0)
      return (
        <View>
          <Text>Không có dữ liệu</Text>
        </View>
      );

    if ((isDirectError == false) & (cordata.length > 1)) {
      return (
        <View style={text_map_styles.container}>
          <Text style={text_map_styles.Title}>Lộ trình di chuyển</Text>
          <Text style={text_map_styles.dateformat}>{dateformatted}</Text>

          <View style={text_map_styles.boxcover}>
            <View style={text_map_styles.boxin}>
              <Text>Quãng đường</Text>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5 name="road" style={text_map_styles.logo} />
                <Text style={text_map_styles.Content}>
                  {Math.round(Distance * 100) / 100} km {"    "}
                </Text>
              </View>
            </View>
            <View style={text_map_styles.boxin}>
              <Text>Số lần checkin</Text>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5 name="route" style={text_map_styles.logo} />
                <Text style={text_map_styles.Content}>
                  {cordata.length} {"   "}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  // -------------------------------------
  if (props.dailyFetching) return <View style={styles.container}>

    {renSelectDate()}
    <View style={{ flex: 9 }}><Loader /></View>

  </View>;
  else
    return (
      <View style={styles.container}>
        {renSelectDate()}

        {renderMapView()}

        {Map_Derection_result()}

        <View style={styles.cardStyle}>
          <Carousel
            ref={carouselRef}
            layout={"tinder"}
            layoutCardOffset={10}
            data={props.dailyUptrails[reDate]}
            sliderWidth={SliderWidth * 1}
            // sliderHeight={SliderHeight * 0.1}
            itemWidth={width}
            itemHeight={CARD_HEIGHT}
            renderItem={_renderItem}
            useScrollView={true}
            // vertical={true}
            onSnapToItem={(index) => {
              setActivateIndex(index);
              mapRef.current.animateToCoordinate(
                {
                  latitude: props.dailyUptrails[reDate][index].lat,
                  longitude: props.dailyUptrails[reDate][index].lon,
                },
                0
              );
              if (makerRef[index] != undefined) makerRef[index].showCallout();
            }}
            activeSlideAlignment="center"
          />
        </View>
      </View>
    );
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    dailyUptrails: state.uptrails.dailyUptrails,
    dailyFetching: state.uptrails.dailyFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDailyUptrails: (config) => {
      dispatch({
        type: constAction.DAILY_UPTRAIL_REQUEST,
        config,
      });
    },
    updateShowlist: (content) => {
      dispatch({
        type: constAction.SET_TODO_SHOWLIST,
        content,
      });
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  mapStyle: {
    flex: 4,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
  },
  cardStyle: {
    flex: 3,
  },
  row: {
    width: "95%",
    marginVertical: 2,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  box: {
    justifyContent: "center",
    flex: 1,
  },
});

const text_map_styles = StyleSheet.create({
  Title: {
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.gray,
  },

  dateformat: {
    paddingLeft: 10,
    fontSize: 12,
    color: "grey",
  },
  Subtitle: {
    fontSize: 12,
  },
  Content: {
    fontSize: 20,
    fontWeight: "bold",
  },
  boxin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boxcover: {
    flex: 0.5,
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 20
  },
  container: {
    flex: 2,
    backgroundColor: "white",
  },
  logo: {
    fontSize: 16,
    padding: 5,
    color: colors.grey,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUptrail);