import {
  View, Text, ActivityIndicator, StyleSheet, Image
} from 'react-native'
import React, { useState, useEffect } from "react"
import { colors } from "../../styles"
import { Button } from "react-native-paper"

function Loader(props) {
  return (
    <View style={[styles.container, { alignItems: 'center' }]}>
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text style={{ fontSize: 12 }}>Đang tải</Text>
        <Image source={require('../../images/Loading-page.gif')} style={{ height: 15, width: 50 }}></Image>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  }
});

export default Loader