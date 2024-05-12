import React from 'react'
import { ScrollView, View } from 'react-native'
import Number from './Number'

function ScrollNumber () {
  return (
    <ScrollView horizontal className='max-h-[100px]'>
      <View className='flex flex-row mt-3 max-h-[83px]'>
        {numbers.map((number, index) => (
          <Number key={index} number={number} isActive={index === 0} />
        ))}
      </View>
    </ScrollView>
  )
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export default ScrollNumber
