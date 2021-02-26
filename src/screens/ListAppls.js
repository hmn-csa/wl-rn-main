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

const KEYS_TO_FILTERS = ['appl_id', 'cust_name', 'app_id'];
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4.5;
const ScreenWidth = Dimensions.get('screen').width;



function ListAppls(props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtered, setFiltered] = useState(props.showlists.applIds)
  useEffect(() => {
    var value = props.search
    console.log(props.showlists)
    try {
      setSearchTerm(value)
      if (!value)
        setFiltered(props.showlists.applIds)
      else
        setFiltered(
          props.showlists.applIds.filter(createFilter(value, KEYS_TO_FILTERS))
        )
    } catch (err) {
      setFiltered(props.showlists.applIds)
    }
    console.log('filtered', filtered, !searchTerm)
  }, [props.search]);

  useEffect(() => {
    setFiltered(props.showlists.applIds)

  }, []);

  // const hangleSearch = (value) => {
  //   try {
  //     setSearchTerm(value)
  //     if (value != null && value != "" && value != undefined) {
  //       setFiltered(
  //         Object.values(props.data).filter(createFilter(value, KEYS_TO_FILTERS))
  //       )
  //     } else
  //       setFiltered(props.showlists.applIds)
  //   } catch (err) {
  //     setFiltered(props.showlists.applIds)
  //   }
  // }

  const _renderItem = ({ item, index }) => {
    return (
      <ContractDetailMap
        key={item.appl_id}
        contractId={item.appl_id}
        navigation={props.navigation}
      />
    );
  };

  if (searchTerm !== "")
    return (
      <View >
        <FlatList
          data={filtered}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
          key={(item) => item.appl_id}
          style={{ padding: 5 }}
        />
      </View>
    )
  else
    return (
      <View>
        <FlatList
          data={props.showlists.applIds}
          renderItem={_renderItem}
          keyExtractor={(item) => item.appl_id}
          key={(item) => item.appl_id}
          style={{ padding: 5 }}
        />
      </View>
    )

}

const mapStateToProps = (state, ownProps) => {
  return {
    showlists: state.showlists,
    data: state.data.data,
    search: state.searchbar.value,
  };
};


export default connect(mapStateToProps, null)(ListAppls);

