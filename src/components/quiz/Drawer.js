import { router } from 'expo-router'
import React, { useRef } from 'react'
import { DrawerLayoutAndroid, Text, View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Number from './Number'

function Drawer ({ children }) {
  const drawer = useRef(null)
  const navigationView = () => (
    <View className='flex flex-col w-full px-4 '>
      <View className='flex flex-row items-center justify-center w-full py-2 '>
        <Text className='mt-3 ml-2 text-lg font-bold text-primary'>SOAL</Text>
      </View>
      <View className='flex flex-row flex-wrap w-full gap-4 ml-[-5px] mt-2'>
        {numbers.map((item, index) => (
          <Number key={index} number={index + 1} isActive={index == 0} />
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
        <Text className='text-lg font-bold'>Quiz</Text>
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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export default Drawer
