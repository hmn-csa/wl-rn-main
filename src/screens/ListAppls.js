import {
  View, Text, ActivityIndicator, Dimensions
} from 'react-native'
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import ContractDetailMap from '../components/ContractDetailMap'
import Carousel from 'react-native-snap-carousel'
import { styles, colors } from '../styles'
import { createFilter } from 'react-native-search-filter';
import { Searchbar } from 'react-native-paper';

const KEYS_TO_FILTERS = ['appl_id', 'cust_name'];
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4.5;
const SliderWidth = Dimensions.get('screen').width;

function ListAppls(props) {


  const [searchTerm, setSearchTerm] = useState("")
  const [filtered, setFiltered] = useState(props.showlists.applIds)
  const hangleSearch = (value) => {
    try {

      setSearchTerm(value)
      console.log(searchTerm)
      if (value != null && value != "" && value != undefined) {
        setFiltered(
          Object.values(props.data).filter(createFilter(searchTerm, KEYS_TO_FILTERS))
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
          placeholder="Nhập tên có dấu hoặc appl_id "
          onSubmitEditing={(value) => hangleSearch(value)}
          clearIcon={'alpha-x-box-outline'}
        >
        </Searchbar>
        <View style={{ flexDirection: 'row' }}>
          <Carousel
            layout={'default'}
            vertical={true}
            data={filtered}
            sliderWidth={SliderWidth}
            itemWidth={width * 0.9}
            itemHeight={CARD_HEIGHT}
            sliderHeight={height}
            renderItem={_renderItem}
            useScrollView={false}
            activeSlideAlignment="start"
            currentIndex={0}
          />
        </View>
      </View>
    )

  if (props.data !== null)
    return (
      <View >
        <Searchbar
          onChangeText={(value) => hangleSearch(value)}
          placeholder="Nhập tên (có dấu) hoặc appl_id"
          onSubmitEditing={(value) => hangleSearch(value)}
          clearIcon={'alpha-x-box-outline'}
        />
        <View style={{ flexDirection: 'row' }}>
          <Carousel
            layout={'default'}
            vertical={true}
            data={props.showlists.applIds}
            sliderWidth={SliderWidth}
            itemWidth={width * 0.9}
            itemHeight={CARD_HEIGHT}
            sliderHeight={height}
            renderItem={_renderItem}
            useScrollView={true}
            activeSlideAlignment="start"
            currentIndex={0}
          />
        </View>
      </View>
    )
  else return (
    <View style={[styles.container, { alignItems: 'center' }]}>
      <Text>Loading ... </Text>
      <ActivityIndicator size={100} color={colors.primary} />
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

