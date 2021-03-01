import {
  View, Text, TouchableOpacity, FlatList, StyleSheet
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { ProgressBar } from 'react-native-paper'

import { colors } from '../styles'
import * as constAction from '../consts'
import { moneyFormat } from '../functions'


const CategoryItem = (props) => {

  return (
    <TouchableOpacity style={styles.card} onPress={() => { props.handleShow(props.item.applIds, props.item.key) }}>
      <View style={styles.cardHeader}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{props.item.key}</Text>
      </View>
      <View style={{ flexDirection: 'row', paddingTop: 10 }}>
        <Text style={{ width: '40%' }}>
          <FontAwesome name="file-text" size={15} color={colors.yellow} /> {props.item.case}
        </Text>
        <Text style={{ color: colors.success }}>
          <FontAwesome name="dollar" size={15} color={colors.success} /> {moneyFormat(props.item.paidamt)}
        </Text>
      </View>
      <View style={{ paddingTop: 10 }}>
        <Text style={{ marginBottom: 2 }}>
          <FontAwesome name="dollar" size={15} color="black" /> {props.item.paidcase}/{props.item.case} Paid
        </Text>
        <ProgressBar progress={props.item.paidcase / props.item.case} color={colors.success} />
      </View>
      <View style={{ paddingTop: 10 }}>
        <Text style={{ marginBottom: 2 }}>
          <FontAwesome name="check" size={15} color="black" /> {props.item.visited}/{props.item.case} Visit
        </Text>
        <ProgressBar progress={props.item.visited / props.item.case} color={colors.main} />
      </View>
    </TouchableOpacity>
  )
}


function _Categories(props) {
  const handleShow = (list, title) => {
    props.navigation.navigate('Portfolio', { name: title })
    props.updateShowlist(list)
  }

  const _renderItem = ({ item, index }) => {
    return (
      <CategoryItem
        item={item}
        handleShow={handleShow}
      />
    );
  };

  return (
    <View style={[styles.container,]}>
      <FlatList
        data={props.category}
        horizontal={false}
        numColumns={2}
        renderItem={_renderItem} />
    </View>
  )
}


const mapStateToPropsProduct = (state, ownProps) => {
  return {
    category: state.data.categoryProduct,
    showlists: state.showlists
  };
};

const mapStateToPropsScore = (state, ownProps) => {
  return {
    category: state.data.categoryBinscore,
    showlists: state.showlists
  };
};

const mapStateToPropsClassify = (state, ownProps) => {
  return {
    category: state.data.categoryClassify,
    showlists: state.showlists
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShowlist: (content) => {
      return {
        type: constAction.UPDATE_SHOWLIST,
        content,
      }
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
    borderRadius: 10,
    padding: 10
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  index: {
    fontWeight: '600',
    fontSize: 14,
  },
});

const ProductCategories = connect(mapStateToPropsProduct, mapDispatchToProps)(_Categories)
const ScoreCategories = connect(mapStateToPropsScore, mapDispatchToProps)(_Categories)
const ClassifyCategories = connect(mapStateToPropsClassify, mapDispatchToProps)(_Categories)

export {
  ProductCategories,
  ScoreCategories,
  ClassifyCategories
}

