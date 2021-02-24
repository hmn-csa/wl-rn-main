import {
  View, Text, TouchableOpacity, FlatList, StyleSheet
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { ProgressBar } from 'react-native-paper'
import { actUpdateShowlist } from "../actions"
import { colors } from '../styles'



function ClassifyCategories(props) {
  const handleShow = (list, title) => {
    props.navigation.navigate('Portfolio', { name: title })
    props.updateShowlist(list)
  }

  const moneyFormat = (n) => {
    return n.toLocaleString().split(".")[0]
  }

  return (
    <View style={[styles.container,]}>
      <FlatList
        data={props.categoryClassify}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => { handleShow(item.applIds, item.key) }}>
              <View style={styles.cardHeader}>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.key}</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <Text style={{ width: '40%' }}>
                  <FontAwesome name="file-text" size={15} color={colors.yellow} /> {item.case}
                </Text>
                <Text>
                  <FontAwesome name="dollar" size={15} color={colors.success} /> {moneyFormat(item.paidamt)}
                </Text>
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ marginBottom: 2 }}>
                  <FontAwesome name="dollar" size={15} color="black" /> {item.paidcase}/{item.case} Paid
                </Text>
                <ProgressBar progress={item.paidcase / item.case} color={colors.success} />
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ marginBottom: 2 }}>
                  <FontAwesome name="check" size={15} color="black" /> {item.visited}/{item.case} Visit
                </Text>
                <ProgressBar progress={item.visited / item.case} color={colors.info} />
              </View>
            </TouchableOpacity>
          )
        }} />
    </View>
  )

}


const mapStateToProps = (state, ownProps) => {
  return {
    categoryClassify: state.data.categoryClassify,
    showlists: state.showlists
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: 'white'
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 5,
    backgroundColor: "white",
    flexBasis: '46%',
    marginHorizontal: 5,
    borderColor: colors.lightGray,
    borderRadius: 10,
    padding: 10
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassifyCategories);

