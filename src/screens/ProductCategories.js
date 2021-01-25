import {
  View, Text, Image, TouchableOpacity, Alert, FlatList, StyleSheet
} from 'react-native'
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { ProgressBar } from 'react-native-paper';
import { actUpdateShowlist } from "../actions"
import { colors } from '../styles'

function ProductCategories(props) {
  const handleShow = (list) => {
    props.navigation.navigate('Portfolio', { screen: 'List' });
    props.updateShowlist(list)
  }

  const moneyFormat = (n) => {
    return n.toLocaleString().split(".")[0]
  }

  return (
    <View style={[styles.container,]}>
      <FlatList
        data={props.categoryProduct}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => { handleShow(item.applIds) }}>
              <View style={styles.cardHeader}>
                <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 16 }}>{item.key}</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <Text style={{ width: '40%' }}>
                  <FontAwesome name="file-text-o" size={15} color="black" /> {item.case}
                </Text>
                <Text>
                  <FontAwesome name="dollar" size={15} color="black" /> {moneyFormat(item.paidamt)}
                </Text>
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ marginBottom: 2 }}>
                  <FontAwesome name="dollar" size={15} color="black" /> {item.visited}/{item.case} Paid
                </Text>
                <ProgressBar progress={0.8} color={colors.success} />
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ marginBottom: 2 }}>
                  <FontAwesome name="check" size={15} color="black" /> {item.paidcase}/{item.case} Visit
                </Text>
                <ProgressBar progress={0.5} color={colors.info} />
              </View>
              {/* <View style={{ padding: 2, }}>
                <View style={[styles.row]}>
                  <View style={[styles.box, { flex: 1 }]}>
                    <Text>Số lượng:</Text>
                  </View>
                  <View style={[styles.box, { flex: 1 }]}>
                    <Text>{item.case}</Text>
                  </View>
                </View>

                <View style={[styles.row]}>
                  <View style={[styles.box, { flex: 1 }]}>
                    <Text>Paid case:</Text>
                  </View>
                  <View style={[styles.box, { flex: 1 }]}>
                    <Text style={{ color: colors.green }}>{item.paidcase}</Text>
                  </View>
                </View>

                <View style={[styles.row]}>
                  <View style={[styles.box, { flex: 1 }]}>
                    <Text>Thanh toán:</Text>
                  </View>
                  <View style={[styles.box, { flex: 1, color: colors.green }]}>
                    <Text style={{ color: colors.green }}>{moneyFormat(item.paidamt)}</Text>
                  </View>
                </View>

                <View style={[styles.row]}>
                  <View style={[styles.box, { flex: 1 }]}>
                    <Text>Viếng thăm:</Text>
                  </View>
                  <View style={[styles.box, { flex: 1 }]}>
                    <Text>{item.visited}</Text>
                  </View>
                </View>
              </View> */}
            </TouchableOpacity>
          )
        }} />
    </View>
  )

}


const mapStateToProps = (state, ownProps) => {
  return {
    categoryProduct: state.category.categoryProduct,
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
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories);

