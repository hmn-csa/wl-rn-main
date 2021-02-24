import {
  View, Text, ActivityIndicator, Dimensions, ScrollView, FlatList
} from 'react-native'
import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import ContractDetailMap from '../components/ContractDetailMap'
import Carousel from 'react-native-snap-carousel'
import { styles, colors } from '../styles'
import { createFilter } from 'react-native-search-filter';
import { Searchbar } from 'react-native-paper';

const KEYS_TO_FILTERS = ['appl_id', 'cust_name'];
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4.5;
const ScreenWidth = Dimensions.get('screen').width;



function ListAppls(props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtered, setFiltered] = useState(props.showlists.applIds)
  const hangleSearch = (value) => {
    try {
      setSearchTerm(value)
      if (value != null && value != "" && value != undefined) {
        setFiltered(
          Object.values(props.data).filter(createFilter(value, KEYS_TO_FILTERS))
        )
      } else
        setFiltered(props.showlists.applIds)
    } catch (err) {
      setFiltered(props.showlists.applIds)
    }
  }

  const _renderItem = ({ item, index }) => {

    return (
      <ContractDetailMap
        key={item.appl_id}
        contractId={item.appl_id}
        navigation={props.navigation}
      />
    );
  };

  if (searchTerm !== null && searchTerm !== "")
    return (
      <View >
        <Searchbar
          onChangeText={(value) => hangleSearch(value)}
          onSubmitEditing={(value) => hangleSearch(value)}
        />
        <FlatList
          data={filtered}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  if (props.data !== null)
    return (
      <View>
        {/* <Searchbar
          onChangeText={(value) => hangleSearch(value)}
          style={{ width: 50, height: 40, borderRadius: 50 }}
          //placeholder="Nhập tên (có dấu) hoặc appl_id"
          onSubmitEditing={(value) => hangleSearch(value)}
        /> */}
        <FlatList
          data={props.showlists.applIds}
          renderItem={_renderItem}
          keyExtractor={(item) => item.appl_id}
          key={(item) => item.appl_id}
          style={{ padding: 5 }}
        />
      </View>
    )
  else return (
    <View style={[styles.container, { alignItems: 'center' }]}>
      <Text>Loading ... </Text>
      <ActivityIndicator size={100} color={colors.main} />
    </View>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    showlists: state.showlists,
    data: state.data.data
  };
};


export default connect(mapStateToProps, null)(ListAppls);

