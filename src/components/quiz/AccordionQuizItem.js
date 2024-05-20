import { router } from 'expo-router'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const AccordionQuizItem = ({ id, title, jumlah, isDone, nilai }) => {
  if (isDone) {
    return (
      <View className=' rounded-3xl mt-2 border-[#0EDE16] bg bg-white border-2 border-solid pl-6 pr-3 py-2  flex w-full flex-row justify-between items-center'>
        <View className='flex-col flex w-[70%]'>
          <Text style={styles.bolf} className='text-base'>Quiz {id} - {title}</Text>
          <Text style={styles.regular} className='text-md text-secondary'>{jumlah} Soal</Text>
        </View>
        <View className='bg-[#0EDE16] py-2 px-7 rounded-full flex items-center justify-center'>
          <Text style={styles.regular} className='text-white font-semibold text-md'>{nilai}/100</Text>
        </View>
      </View>
    )
  }
  return (
    <View onTouchEndCapture={()=> router.push(`/quiz/${id}`)} className=' rounded-3xl mt-2 border-primary bg bg-white border-2 border-solid pl-6 pr-3 py-2  flex w-full flex-row justify-between items-center'>
      <View className='flex-col flex w-[70%]'>
        <Text style={styles.bold} className='text-base'>Quiz {id} - {title}</Text>
        <Text style={styles.regular} className='text-md text-secondary'>{jumlah} Soal</Text>
      </View>
      <View className='border-primary border-2 border-solid py-2 px-6 rounded-full flex items-center justify-center'>
        <Text style={styles.regular} className='text-primary font-semibold text-md'>Mulai</Text>
      </View>
    </View>
  )
}

export default AccordionQuizItem

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
