import React, { Component } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

function RenBarChart() {
  return (
    <BarChart
      data={{
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
        ],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
          },
        ],
      }}
      width={Dimensions.get('window').width - 16}
      height={220}
      yAxisLabel={'Rs'}
      chartConfig={{
        backgroundColor: 'white',
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  )
}

export {
  RenBarChart,
};

