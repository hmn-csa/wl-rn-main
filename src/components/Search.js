import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
//import SearchInput, { createFilter } from 'react-native-search-filter';

import { connect } from "react-redux";
import ContractDetailMap from './ContractDetailMap'

const KEYS_TO_FILTERS = ['appl_id', 'app_id', 'cust_name'];

function Search(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtered, setFiltered] = useState([])
  const hangleSearch = (value) => {
    if (props.data) {
      try {
        setSearchTerm(value)
        setFiltered(
          Object.values(props.data).filter(createFilter(searchTerm, KEYS_TO_FILTERS)).map(
            appl => appl.appl_id
          )
        )
      } catch (err) {
        console.log(err)
      }
    }
  }
  if (!props.data)
    return <View style={styles.container}></View>
  return (
    <View style={styles.container}>
      <SearchInput
        onChangeText={(value) => hangleSearch(value)}
        style={styles.searchInput}
        placeholder="Nhập tên (có dấu) hoặc hợp đồng để tìm kiếm"
        onSubmitEditing={(value) => hangleSearch(value)}
      />

      <FlatList
        data={filtered}
        renderItem={appl_id =>
          <ContractDetailMap
            key={appl_id}
            contractId={appl_id}
            navigation={props.navigation} />}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data.data,
    showlists: state.showlists
  }
}



export default connect(mapStateToProps, null)(Search);

