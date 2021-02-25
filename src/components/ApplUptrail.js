import {
  View, Text, Image, ScrollView, Alert, FlatList,
  StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions
} from 'react-native'
import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import Loader from './elements/Loader'
import Uptrail from './Uptrail'
import * as constAction from '../consts'
import { colors } from '../styles'
import Timeline from 'react-native-timeline-flatlist'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 8;




function ApplUptrail(props) {


  const [timelineFollow, setTimeline] = useState([])

  useEffect(() => {
    if (!props.uptrails[props.active_applid]) {
      const config = {
        loadapplid: props.active_applid,
        token: props.token
      }
      props.apiGetUptrail(config)
    }
  }, []);


  const pm2timeline = (arr) => {
    if (!arr) return []
    let timeline = []
    for (let i = 0; i < arr.length; i++) {
      timeline.push({
        time: arr[i].runtime.substring(5, 10),
        title: arr[i].runtime,
        description: 'Hợp đồng : ' + arr[i].appl_id,
        ...arr[i]
      })
    }
    return timeline
  }

  useEffect(() => {
    setTimeline(pm2timeline(props.uptrails[props.active_applid]))
  }, [props.uptrails]);




  const renderDetail = (rowData, sectionID, rowID) => {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>
    let desc = (
      <View style={styles.descriptionContainer}>
        <Text style={[styles.textDescription]}>{rowData.description}</Text>
      </View>
    )
    return (
      <View style={{ flex: 1, }}>
        <Uptrail
          key={rowData.runtime}
          item={rowData}
          navigation={props.navigation}
        />
      </View>
    )
  }


  if (props.uptrailStatus)
    return <Loader />

  else if (props.uptrails[props.active_applid]) {
    return (
      <View style={styles.container}>
        {/* {props.uptrails[props.active_applid].map(
          item =>
            <Uptrail
              key={item.runtime}
              item={item}
              navigation={props.navigation}
            />)
        } */}

        <Timeline
          style={styles.list}
          data={timelineFollow}
          separator={false}
          circleSize={10}
          innerCircle={'dot'}
          circleColor={colors.main}
          lineColor={colors.main}
          timeContainerStyle={{ width: 0, marginTop: 0, marginRight: -10 }}
          timeStyle={{
            textAlign: 'center',
            backgroundColor: colors.main,
            color: 'white',
            paddingTop: 5, paddingBottom: 5, borderRadius: 5,
            fontSize: 12,
            width: 45
          }}
          eventDetailStyle={{ left: -20, marginRight: -25 }}
          descriptionStyle={{ color: colors.success }}
          options={{
            style: { paddingTop: 10 }
          }}
          renderDetail={renderDetail}
          showTime={true}
        />

      </View>
    )
  }
  return (
    <ScrollView>
      <Text>không có Uptrail</Text>
    </ScrollView>
  )

}
const mapStateToProps = (state, aownProps) => {
  return {
    token: state.token.token.access,
    uptrails: state.uptrails.applidUptrails,
    uptrailStatus: state.uptrails.applidFetching,
    active_applid: state.vsf.activeApplId.appl_id
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    updateShowlist: (content) => {
      dispatch({
        type: constAction.UPDATE_SHOWLIST,
        content,
      })
    },
    apiGetUptrail: (config) => {
      dispatch({
        type: constAction.APPLID_UPTRAIL_REQUEST,
        config
      });
    },
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white'
  },
  list: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    paddingRight: 5
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 0,
    color: 'gray'
  }
});



export default connect(mapStateToProps, mapDispatchToProps)(ApplUptrail);

