import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Easing } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { colors } from '../styles'


function CircleTA(props) {

  var MAX_POINTS = 44.8;
  const [colorTA, setColorTA] = useState(colors.success)
  const [over, setOver] = useState(0)
  // useEffect(() => {
  //   circularProgress.animate(MAX_POINTS, 1500, Easing.linear);
  //   if (MAX_POINTS > 100) {
  //     setTimeout(
  //       () => {
  //         circularProgress.reAnimate(0, MAX_POINTS - 100, 1500, Easing.linear),
  //           setOver(100),
  //           setColorTA('#FFA500')
  //       },
  //       1400
  //     )
  //   }
  // }, []);

  return (
    <AnimatedCircularProgress
      size={90}
      width={5}
      backgroundWidth={5}
      fill={0}
      tintColor={colorTA}
      backgroundColor='#BEE4C7'
      ref={(ref) => circularProgress = ref}
      arcSweepAngle={200}
      rotation={260}
      style={{ position: "absolute", paddingTop: 25 }}
    >
      {fill =>
        <View>
          <Text style={{ paddingTop: 32, fontWeight: 'bold', textAlign: "center" }}>
            {(fill + over).toFixed(1)}%
          </Text>
          <Text style={{ fontSize: 9, color: colors.gray, textAlign: "center" }}>
            Hoàn thành{"\n"}chỉ tiêu
          </Text>
        </View>
      }
    </AnimatedCircularProgress>
  );
}

export {
  CircleTA
};
