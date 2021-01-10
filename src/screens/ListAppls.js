import {
  View, Text, Image, ScrollView, Alert, FlatList, ActivityIndicator, Dimensions
} from 'react-native'
import { Button } from 'react-native-paper';
import React, { useState, useEffect} from "react"
import { connect } from "react-redux"

import ContractDetailMap from '../components/ContractDetailMap'

import Carousel from 'react-native-snap-carousel'
import { styles, colors } from '../styles'

import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['appl_id', 'cust_name'];




const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4.5;
const SliderWidth = Dimensions.get('screen').width;




function ListAppls(props) {


  const [searchTerm, setSearchTerm] = useState('')
  const [filtered, setFiltered] = useState(props.showlists.applIds)
  const hangleSearch = (value) => {
    try { 
      setSearchTerm(value)
      if (value != null || value != '') {
        setFiltered(
          Object.values(props.showlists.applIds).filter(createFilter(searchTerm, KEYS_TO_FILTERS))
        )
      }
    } catch(err) {
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

  if (searchTerm) 
  return (
    <View >
      <SearchInput 
      onChangeText={(value) =>  hangleSearch(value)} 
      style={{ 
          flexDirection: 'row', 
          padding: 10,
          borderColor: '#CCC',
          borderWidth: 1}}
      placeholder="Nhập tên (có dấu) hoặc appl_id xxx"
      onSubmitEditing={(value) =>  hangleSearch(value)} 
      />
    <View 
      style={{ flexDirection: 'row'}}>
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
  return(
    <View >
       <SearchInput 
        onChangeText={(value) =>  hangleSearch(value)} 
        style={{ 
          backgroundColor: 'white',
          flexDirection: 'row', 
          padding: 10,
          borderColor: '#CCC',
          borderWidth: 1}}
        placeholder="Nhập tên (có dấu) hoặc appl_id"
        onSubmitEditing={(value) =>  hangleSearch(value)} 
        />
      <View 
        style={{ flexDirection: 'row'}}>
        <Carousel
          layout={'default'}
          vertical={true}
          data={props.showlists.applIds}
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

  
  // if (props.showlists.isTodoClass & props.data !== null)
  //   return (
  //   <ScrollView >
  //     {
  //       showappls.map( appl => 
  //         <ContractDetailMap 
  //           key={appl}
  //           contractId={appl}
  //           navigation={props.navigation}
  //         />
  //       )
  //     }
  //   </ScrollView>
  // )
  // if (props.data !== null)
  //   return (
  //     <FlatList 
  //     data = {showappls}
  //     keyExtractor={(appl) => appl}
  //     renderItem={_renderItem}
  //     />
  //   )  

  
  else return (
    <View style={[styles.container, {alignItems: 'center'}]}>
      <Text>Loading ... </Text>
      <ActivityIndicator size={100} color={colors.primary}/> 
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

