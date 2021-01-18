import React, { useEffect, useState } from 'react'
import { Animated, Text } from 'react-native'
export default function FavTouch({shouldEnlarge}) {
  const [size, setSize] = useState(new Animated.Value(shouldEnlarge ? 80:40))

  useEffect(() => {
      Animated.spring(
        size,
        {
          toValue: shouldEnlarge ? 80 : 40,
          useNativeDriver: false
        },
      ).start()
  }, [shouldEnlarge])

  return (
      <Animated.View style={{width: size, height: size}}>
          <Text>Ahihi</Text>
      </Animated.View>
  )
}