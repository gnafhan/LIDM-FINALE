import React, { useEffect, useRef } from 'react'
import { View, Animated, Easing, StyleSheet } from 'react-native'

const AudioWave = () => {
  const bar1Height = useRef(new Animated.Value(10)).current
  const bar2Height = useRef(new Animated.Value(20)).current
  const bar3Height = useRef(new Animated.Value(15)).current
  const bar4Height = useRef(new Animated.Value(20)).current

  useEffect(() => {
    const animateBar = (bar, toValue, duration) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bar, {
            toValue,
            duration,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(bar, {
            toValue: 10,
            duration,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ])
      ).start()
    }

    animateBar(bar1Height, 30, 500)
    animateBar(bar2Height, 50, 700)
    animateBar(bar3Height, 40, 450)
    animateBar(bar4Height, 30, 600)
  }, [bar1Height, bar2Height, bar3Height, bar4Height]);

  return (
    <View className='flex-row items-center justify-center h-[20px]'>
      <Animated.View style={{ height: bar1Height }} className='w-[5px] mx-1 bg-slate-300' />
      <Animated.View style={{ height: bar2Height }} className='w-[5px] mx-1 bg-slate-300' />
      <Animated.View style={{ height: bar3Height }} className='w-[5px] mx-1 bg-slate-300' />
    </View>
  )
}

export default AudioWave