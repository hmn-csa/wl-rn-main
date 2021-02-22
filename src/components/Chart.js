import React, { Component } from 'react';
import {
  View, Text
} from 'react-native'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { colors } from '../styles';
const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

function BarChartPM() {
  return (
    <View
      style={{
        marginTop: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
        marginLeft: 5,
        flex: 1,
        justifyContent: 'space-around'
      }}>
      <Text style={{
        color: colors.black,
        textAlign: 'left',
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 14,
        backgroundColor: colors.white,
        borderRadius: 5
      }}>
        Daily Payment
      </Text>
      <BarChart
        data={{
          labels: ["01/02", "02/02", "03/02", "04/02", "05/02", "06/02", "07/02"],
          datasets: [
            {
              data: [20, 145, 228, 80, 99, 43, 144]
            }
          ],
        }}
        style={{ borderRadius: 10, marginLeft: -40 }}
        width={Dimensions.get('window').width}
        height={180}
        showValuesOnTopOfBars={true}
        chartConfig={{
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          fillShadowGradient: colors.info,
          fillShadowGradientOpacity: 0.4,
          barPercentage: 0.8,
          color: (opacity = 1) => colors.black,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          decimalPlaces: 0
        }}
        withOuterLines={false}
        withInnerLines={false}
        withHorizontalLabels={false}
        fromZero={true}
      />
    </View>
  )
}

function BarChartFL() {
  return (
    <View
      style={{
        marginTop: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
        marginLeft: 5,
        flex: 1,
        justifyContent: 'space-around'
      }}>
      <Text style={{
        color: colors.black,
        textAlign: 'left',
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 14,
        backgroundColor: colors.white,
        borderRadius: 5
      }}>
        Daily Follow
      </Text>
      <BarChart
        data={{
          labels: ["01/02", "02/02", "03/02", "04/02", "05/02", "06/02", "07/02"],
          datasets: [
            {
              data: [7, 0, 3, 10, 9, 2, 4]
            }
          ],
        }}
        style={{ borderRadius: 10, marginLeft: -40 }}
        width={Dimensions.get('window').width}
        height={180}
        showValuesOnTopOfBars={true}
        chartConfig={{
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          fillShadowGradient: colors.success,
          fillShadowGradientOpacity: 0.4,
          barPercentage: 0.8,
          color: (opacity = 1) => colors.black,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          decimalPlaces: 0
        }}
        withOuterLines={false}
        withInnerLines={false}
        withHorizontalLabels={false}
        fromZero={true}
      />
    </View>
  )
}

function LineChartFL() {
  return (
    <View
      style={{
        marginTop: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
      }}>
      <Text style={{
        color: colors.info,
        textAlign: 'left',
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 14,
        backgroundColor: colors.white,
        borderRadius: 5
      }}>
        Daily Follow
      </Text>
      <LineChart
        data={{
          labels: ["01/02", "02/02", "03/02", "04/02", "05/02", "06/02", "07/02"],
          datasets: [
            {
              data: [1, 0, 10, 0, 2, 14, 3]
            }
          ],
        }}
        style={{ borderRadius: 10 }}
        width={Dimensions.get('window').width - 0}
        height={180}
        chartConfig={{
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          fillShadowGradient: colors.success,
          fillShadowGradientOpacity: 0.6,
          barPercentage: 1,
          color: (opacity = 1) => colors.success,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          decimalPlaces: 0,
          propsForDots: {
            r: "2",
            strokeWidth: "3",
            stroke: colors.success
          },
        }}

        withOuterLines={false}
        withInnerLines={false}
        withHorizontalLabels={false}
        fromZero={true}
        bezier
        renderDotContent={({ x, y, index, indexData }) => <Text style={{ fontSize: 11, position: 'absolute', color: colors.success, top: y - 30, left: x - 5, }}>{indexData}</Text>}
      />
    </View>
  )
}

export {
  BarChartPM,
  BarChartFL,
  LineChartFL
};

