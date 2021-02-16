import React from 'react'
import { Text, View, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import TreeView from 'react-native-final-tree-view'
import { FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { connect } from "react-redux"
import { actUpdateShowlist, actSetTodoShowlist } from "../actions"
import { colors } from '../styles'


//ion-md-remove
function getIndicator(isExpanded, hasChildrenNodes, type, level) {
  if (!hasChildrenNodes) {
    if (type == 'good') {
      return <AntDesign name="like2" size={15} color={colors.success} />
    }
    if (type == 'bad') {
      return <MaterialCommunityIcons name="cancel" size={15} color={colors.danger} />
    }
  } else if (isExpanded) {
    if (type == 'good') {
      return <Text> <FontAwesome name="caret-down" size={16} color='black' style={{ marginRight: 10 }} /> <AntDesign name="like2" size={15} color={colors.success} /></Text>
    }
    else if (type == 'bad') {
      return <Text> <FontAwesome name="caret-down" size={16} color="black" style={{ marginRight: 10 }} /> <MaterialCommunityIcons name="cancel" size={15} color={colors.danger} /></Text>
    }
    else {
      return <Text> <FontAwesome name="caret-down" size={16} color="black" style={{ marginRight: 10 }} /></Text>
    }
  } else {
    if (type == 'good') {
      return <Text> <FontAwesome name="caret-right" size={16} color="black" style={{ marginRight: 10 }} /> <AntDesign name="like2" size={15} color={colors.success} /></Text>
    }
    else if (type == 'bad') {
      return <Text> <FontAwesome name="caret-right" size={16} color="black" style={{ marginRight: 10 }} /> <MaterialCommunityIcons name="cancel" size={15} color={colors.danger} /></Text>
    }
    else {
      return <Text> <FontAwesome name="caret-right" size={16} color="black" style={{ marginRight: 10 }} /></Text>
    }
  }

}

function Tree(props) {

  const handleShow = list => {
    props.setTodoShowlist(true)
    props.navigation.navigate('Portfolio', { screen: 'List' });
    props.updateShowlist(list)
  }
  function getstyle_txttree(name) {
    if (name == 'Total') {
      return { fontWeight: 'bold', fontSize: 20 }
    }
    return null
  }
  return (
    <ScrollView style={{ paddingRight: 10, backgroundColor: 'white' }} >
      <TreeView
        data={props.tree}
        initialExpanded={true}
        getCollapsedNodeHeight={() => { 40 }}
        renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
          return (
            <View
              style={{
                height: 40,
                marginLeft: 25 * level,
                fontSize: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={getstyle_txttree(node.name)}>
                {getIndicator(isExpanded, hasChildrenNodes, node.type, level)} {node.name}
              </Text>
              <Text style={{ fontWeight: 'bold' }}>
                <Text style={{ color: colors.black }}>
                  {node.case}
                </Text>{"\t"}
                <Text style={{ color: colors.info }}>
                  {node.share} %
                  </Text>
              </Text>
            </View>
          )
        }}
      />
    </ScrollView>
  )
}



const mapStateToProps = (state, ownProps) => {
  return {
    tree: state.data.treeCal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    },
    setTodoShowlist: (content) => {
      dispatch(actSetTodoShowlist(content))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree);


