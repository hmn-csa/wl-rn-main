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


function BarChartPM(data, title) {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        marginLeft: 5,
      }}>
      <Text style={{
        color: colors.black,
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 14,
        backgroundColor: colors.white,
      }}>
        {title}
      </Text>
      <BarChart
        data={data}
        style={{ borderRadius: 0, marginLeft: -40, }}
        width={Dimensions.get('window').width}
        height={200}
        showValuesOnTopOfBars={true}
        showBarTops={true}

        //yAxisLabel={'y'}
        //horizontalLabelRotation={45}
        //verticalLabelRotation={30}
        withOuterLines={false}
        withInnerLines={false}
        withHorizontalLabels={false}
        fromZero={true}
        bezier
        chartConfig={{
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          useShadowColorFromDataset: false,
          fillShadowGradientOpacity: 1,
          strokeWidth: 0.2,
          barPercentage: 0.4,
          fill: colors.main,
          fillOpacity: 1,
          color: (opacity = 1) => colors.main,
          labelColor: (opacity = 1) => colors.main,
        }}
      />
    </View>
  )
}

function BarChartFL() {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: 0,
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
        showBarTops={true}
        chartConfig={{
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          //fillShadowGradient: colors.info,
          fillShadowGradientOpacity: 1,
          barPercentage: 1,
          color: (opacity = 1) => colors.main,
          labelColor: (opacity = 1) => colors.main,
        }}
        withOuterLines={false}
        withInnerLines={false}
        //withHorizontalLabels={false}
        fromZero={true}
      />
    </View>
  )
}

function LineChartFL(data) {
  return (
    <View
      style={{

        backgroundColor: colors.white,
        borderRadius: 0,
        marginLeft: 5,
        justifyContent: 'space-around'
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
        data={data}
        style={{ borderRadius: 10, marginLeft: -40 }}
        width={Dimensions.get('window').width}
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
            strokeWidth: "2",
            stroke: colors.success
          },
        }}

        withOuterLines={false}
        withInnerLines={false}
        withHorizontalLabels={false}
        fromZero={true}
        onDataPointClick={({ value, dataset, getColor }) => console.log({ value, dataset, getColor })}
      //renderDotContent={({ x, y, index, indexData }) => <Text style={{ fontSize: 11, position: 'absolute', color: colors.success }}>{indexData}</Text>}
      />
    </View>
  )
}

export {
  BarChartPM,
  BarChartFL,
  LineChartFL
};

