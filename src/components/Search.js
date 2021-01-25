import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';

import { connect } from "react-redux";
import ContractDetail from './ContractDetail'

const KEYS_TO_FILTERS = ['appl_id', 'cust_name'];

function Search(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtered, setFiltered] = useState([])
  const hangleSearch = (value) => {
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

  return (
    <View style={styles.container}>
      <SearchInput
        onChangeText={(value) => hangleSearch(value)}
        style={styles.searchInput}
        placeholder="Nhập tên (có dấu) hoặc APPL_ID để tìm kiếm"
        onSubmitEditing={(value) => hangleSearch(value)}
      />
      {/*
        <ScrollView>
          {filtered.map(
            appl => <ContractDetail 
              key={appl}
              contractId = {appl}
              navigation={props.navigation}
            />
            )
          }
        </ScrollView>
        */}
      <FlatList
        data={filtered}
        renderItem={appl_id =>
          <ContractDetail
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

