import { router } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import formatDate from '../../util/formatDate'

const AccordionItemModul = ({ id, title, jumlah, isDone, nilai, tanggal }) => {
  if (isDone) {
    return (
      <View className=' rounded-3xl mt-3 border-[#0EDE16] bg bg-white border-2 border-solid pl-6 pr-3 py-2  flex w-full flex-row justify-between'>
        <View className='flex-col flex '>
          <Text className='text-lg font-bold'>{title}</Text>
          <Text className='text-md text-secondary'>{formatDate(tanggal)}</Text>
        </View>
        <View className='bg-[#0EDE16] py-2 px-7 rounded-full flex items-center justify-center'>
          <Text className='text-white font-semibold text-lg'>Selesai</Text>
        </View>
      </View>
    )
  }
  return (
    <View onTouchStart={()=> router.push(`/modul/${id}`)} className=' rounded-3xl mt-2 border-primary bg bg-white border-2 border-solid pl-6 pr-3 py-2  flex w-full flex-row justify-between'>
      <View className='flex-col flex '>
        <Text className='text-lg font-bold'>{title}</Text>
        <Text className='text-md text-secondary'>{formatDate(tanggal)}</Text>
      </View>
      <View className='border-primary border-2 border-solid py-2 px-7 rounded-full flex items-center justify-center'>
        <Text className='text-primary font-semibold text-lg'>Baca</Text>
      </View>
    </View>
  )
}

export default AccordionItemModul
