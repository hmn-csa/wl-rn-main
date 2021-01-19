import {
  View, Text,ActivityIndicator,StyleSheet,Image
} from 'react-native'
import React, { useState, useEffect} from "react"
import { colors } from '../../styles'

function Loader(props) {
  return (
    <View style={[styles.container, {alignItems: 'center'}]}>
      <ActivityIndicator size={80} color={colors.info}/> 
      <View style={{flexDirection:'row',marginTop:30}}>
        <Text style={{fontSize:12}}>Đang tải dữ liệu </Text>
        <Image source={require('../../images/Loading-page.gif')} style={{height:15,width:50}}></Image>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});

export default Loader