import {
  View, Text, Image, ScrollView, Alert, FlatList,
  StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions
} from 'react-native'
import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import Loader from './elements/Loader'
import Uptrail from './Uptrail'
import * as constAction from '../consts'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 8;


function ApplUptrail(props) {

  useEffect(() => {
    if (!props.uptrails[props.active_applid]) {
      const config = {
        loadapplid: props.active_applid,
        token: props.token
      }
      props.apiGetUptrail(config)
    }
  }, []);


  if (props.uptrailStatus)
    return <Loader />

  else if (props.uptrails[props.active_applid]) {
    return (
      <ScrollView
        style={{ backgroundColor: 'white', padding: 10, paddingBottom: 40 }}
      >
        {props.uptrails[props.active_applid].map(
          item =>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(ApplUptrail);

