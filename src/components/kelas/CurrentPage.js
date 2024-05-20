import { router } from 'expo-router'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const CurrentPage = ({ page }) => {
  return (
    <View className='flex flex-row items-center justify-between w-full py-2 mt-5 '>
      <FontAwesome5Icon
        style={{
          marginLeft: 5,
          alignSelf: 'center'
        }}
        onPress={router.back}
        size={25}
        name='arrow-left'
      />
      <Text style={styles.bold} className='text-lg'>{page}</Text>
      <FontAwesome5Icon
        style={{ marginRight: 5, marginBottom: 1, color: 'black' }}
        size={25}
        name='bars'
      />
    </View>
  )
}

export default CurrentPage

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
