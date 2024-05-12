import React from 'react'
import AnimatedLoader from 'react-native-animated-loader'
import { View } from 'react-native'
import loading from '../../../assets/loading.json'

function Loading () {
  return (
    <View className='flex items-center justify-center w-full h-full'>
      <AnimatedLoader
        visible={true}
        source={loading}
        animationStyle={{ width: 200, height: 200 }}
      ></AnimatedLoader>
    </View>
  )
}

export default Loading
