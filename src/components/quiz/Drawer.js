import { router } from 'expo-router'
import React, { useRef } from 'react'
import { DrawerLayoutAndroid, Text, View, StyleSheet } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Number from './Number'

function Drawer ({ children, questions, isActive, goTo }) {
  const drawer = useRef(null)
  const navigationView = () => (
    <View className='flex flex-col w-full px-4 '>
      <View className='flex flex-row items-center justify-center w-full py-2 '>
        <Text style={styles.regular} className='mt-3 ml-2 text-lg font-bold text-primary'>SOAL</Text>
      </View>
      <View className='flex flex-row flex-wrap w-full gap-4 ml-[-5px] mt-2'>
        {questions.map((item, index) => (
          <Number key={index} number={index + 1} isActive={index+1 == isActive} goTo={goTo} />
        ))}
      </View>
    </View>
  )
  return (
    <DrawerLayoutAndroid
      drawerPosition='right'
      // drawerWidth={'84%'}
      renderNavigationView={navigationView}
      ref={drawer}
      drawerWidth={300}
    >
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
        <Text style={styles.bold} className='text-lg'>Quiz</Text>
        <FontAwesome5Icon
          style={{ marginRight: 5, marginBottom: 1 }}
          size={25}
          name='bars'
          onPress={() => drawer.current.openDrawer()}
        />
      </View>
      {children}
    </DrawerLayoutAndroid>
  )
}

export default Drawer

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