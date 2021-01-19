import React from "react";

import ManagerApp from './ManagerApp'

import { connect } from "react-redux";
import { View, StyleSheet} from 'react-native';


function ManagerView(props) {
  return (
    <View style={styles.container}>
      <ManagerApp />
    </View>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps, null)(ManagerView);