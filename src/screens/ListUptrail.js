import { Text, View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Card, Title, Paragraph, Avatar, Button } from "react-native-paper";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { colors } from "../styles";
import axios from "axios";
import DatePicker from "react-native-datepicker";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Carousel from "react-native-snap-carousel";
import { actGetUptrails, actUpdateShowlist } from "../actions/index";
import Loader from "../components/elements/Loader";
import Uptrail from "../components/Uptrail";
import * as constAction from "../consts";
import { calInitialRegion } from "../functions";
import { FontAwesome5 } from "@expo/vector-icons";
import CalendarStrip from "react-native-calendar-strip";
import MapViewDirections from "react-native-maps-directions";

// function Uptrail

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 8;
const SliderWidth = Dimensions.get("screen").width;
// const SliderHeight = Dimensions.get('screen').height;

function ListUptrail(props) {
  const [reDate, setRedate] = useState(() => {
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    return date;
  });
  const mapRef = useRef(null);
  const makerRef = {};
  const carouselRef = useRef(null);

  // const [cordata] = useState(() => {
  //   var data = [];
  //   props.uptrails.dailyUptrails.map((appl, index) => {
  //     data.push({ latitude: appl.lat, longitude: appl.lon });
  //   });
  //   return data;
  // });
  const cordata = [];
  props.uptrails.dailyUptrails.map((appl, index) => {
    cordata.push({ latitude: appl.lat, longitude: appl.lon });
  });

  const [Distance, setDistance] = useState(null);
  const [isDirectError, setIsDirectError] = useState(false);
  //const [activeIndex, setActivateIndex] = useState(0);
  const getDailyUptrails = (date) => {
    props.getDailyUptrails({
      staff_id: props.token.active_staff,
      token: props.token.token.access,
      loaddate: date,
    });
  };

  useEffect(() => {
    getDailyUptrails(reDate);
    console.log("useEffect get data", reDate);
  }, []);

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
    console.log("render lich");
    return (
      <View style={{ flex: 1 }}>
        <CalendarStrip
          scrollable
          style={{ height: 90, marginRight: 0, paddingLeft: 0 }}
          calendarColor={"white"}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: "black",
          }}
          calendarHeaderStyle={{ color: "#787571" }}
          dateNumberStyle={{ color: "#787571" }}
          dateNameStyle={{ color: "black" }}
          iconContainer={{ flex: 0.1 }}
          selectedDate={reDate}
          onDateSelected={(date) => {
            setRedate(date.format("YYYY-MM-DD"));
            getDailyUptrails(date.format("YYYY-MM-DD"));
          }}
        />
      </View>
    );
  };

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
    if (cordata.length == 0)
      return (
        <View>
          <Text>Không có dữ liệu</Text>
        </View>
      );
  };

  // -------------------------------------
  if (props.uptrails.dailyFetching) return <View>{renSelectDate()}</View>;
  else
    return (
      <View style={styles.container}>
        {renSelectDate()}

        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          initialRegion={calInitialRegion(props.uptrails.dailyUptrails)}
        >
          {props.uptrails.dailyUptrails.map((appl, index) => {
            let description = `${appl.appl_id}`;
            return (
              <Marker
                coordinate={{ latitude: appl.lat, longitude: appl.lon }}
                key={index}
                description={description}
                onPress={() => {
                  //setActivateIndex(index);
                  carouselRef.current.snapToItem(index);
                }}
                Color={"blue"}
                ref={(ref) => (makerRef[index] = ref)}
              />
            );
          })}

          <MapViewDirections
            origin={cordata[0]}
            destination={cordata[cordata.length - 1]}
            waypoints={cordata.slice(1, -1)}
            mode="DRIVING"
            apikey="AIzaSyBvUjhsDOyro_uWooTdarRRRUywqWzD6pE"
            language="en"
            strokeWidth={4}
            strokeColor="black"
            onStart={(params) => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination
                }"${params.waypoints.length
                  ? " using waypoints: " + params.waypoints.join(", ")
                  : ""
                }`
              );
            }}
            onReady={(result) => {
              setIsDirectError(false);
              setDistance(result.distance);
            }}
            onError={(errorMessage) => {
              setIsDirectError(true);
            }}
          />
        </MapView>

        {Map_Derection_result()}

        <View style={styles.cardStyle}>
          <Carousel
            ref={carouselRef}
            layout={"tinder"}
            layoutCardOffset={10}
            data={props.uptrails.dailyUptrails}
            sliderWidth={SliderWidth * 1}
            // sliderHeight={SliderHeight * 0.1}
            itemWidth={width}
            itemHeight={CARD_HEIGHT}
            renderItem={_renderItem}
            useScrollView={true}
            // vertical={true}
            onSnapToItem={(index) => {
              // setActivateIndex(index);
              mapRef.current.animateToCoordinate(
                {
                  latitude: props.uptrails.dailyUptrails[index].lat,
                  longitude: props.uptrails.uptrails[index].lon,
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
    uptrails: state.uptrails,
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
    flex: 2,
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
    fontSize: 25,
    fontWeight: "bold",
    color: "#787571",
  },

  dateformat: {
    paddingLeft: 10,
    fontSize: 15,
    color: "gray",
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
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
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