import React from 'react'
import { Text } from 'react-native'

function Number ({ number, isActive, goTo }) {
  if (isActive) {
    return (
      <Text onPress={() => goTo(number)} className='max-h-[64px] items-center my-2 mx-2 min-w-[70px] justify-center px-5 py-4 text-lg font-bold text-center bg-primary text-white rounded-md'>
        {number}
      </Text>
    )
  }
  return (
    <Text onPress={() => goTo(number)} className='max-h-[64px]  items-center my-2 mx-2  min-w-[70px] justify-center px-5 py-4 text-lg font-bold text-center border-2 border-solid rounded-md text-primary border-primary'>
      {number}
    </Text>
  )
}

export default Number
