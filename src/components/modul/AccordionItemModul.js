import { router } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import formatDate from '../../util/formatDate'
import { StyleSheet } from 'react-native'

const AccordionItemModul = ({ id, title, jumlah, isDone, nilai, tanggal }) => {
  if (isDone) {
    return (
      <View className=' rounded-3xl mt-3 border-[#0EDE16] bg bg-white border-2 border-solid pl-6 pr-3 py-2  flex w-full flex-row justify-between items-center'>
        <View className='flex-col flex w-[70%]'>
          <Text style={styles.bold} className='text-base'>Modul {id} - {title}</Text>
          <Text style={styles.regular} className='text-sm text-secondary'>{formatDate(tanggal)}</Text>
        </View>
        <View className='bg-[#0EDE16] py-2 px-7 rounded-full flex items-center justify-center'>
          <Text  style={styles.bold} className='text-white text-sm'>Selesai</Text>
        </View>
      </View>
    )
  }
  return (
    <View onTouchEndCapture={()=> router.push(`/modul/${id}`)} className=' rounded-3xl mt-2 border-primary bg bg-white border-2 border-solid pl-6 pr-3 py-2  flex w-full flex-row justify-between items-center'>
      <View className='flex-col flex w-[70%]'>
        <Text style={styles.bold} className='text-base'>Modul {id} - {title}</Text>
        <Text style={styles.regular} className='text-sm text-secondary'>{formatDate(tanggal)}</Text>
      </View>
      <View className='border-primary border-2 border-solid px-7 rounded-full flex items-center justify-center py-2'>
        <Text style={styles.regular} className='text-primary font-semibold text-sm'>Baca</Text>
      </View>
    </View>
  )
}

export default AccordionItemModul

const styles = StyleSheet.create({
  medium: {
    fontFamily: 'Poppins_500Medium'
  },
  regular: {
    fontFamily: 'Poppins_400Regular'
  },
  bold: {
    fontFamily: 'Poppins_600SemiBold'
  }
})
