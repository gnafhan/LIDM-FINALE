import { View, Text } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { router, usePathname } from 'expo-router'
import React from 'react'

function BottomNav () {
  const route = usePathname()
  return (
    <View className='absolute self-center w-full py-3  shadow-2xl bg-[#E2E4ED] rounded-2xl bottom-7'>
      <View className='flex flex-row w-full'>
        {navigation.map((item, index) => (
          <React.Fragment key={index}>
            {index == 2 ? (
              <View className='flex flex-col items-center justify-center flex-1 gap-1 '>
                <View
                  key={index}
                  className='absolute top-[-46px] p-5 rounded-full justify-center-center text-center flex flex-col items-center bg-primary'
                >
                  <FontAwesome5Icon
                    name={'microphone'}
                    size={30}
                    solid
                    style={{
                      aspectRatio: 1,
                      textAlign: 'center'
                    }}
                    color={`white`}
                  />
                </View>
              </View>
            ) : (
              <View
                onTouchStart={() => {
                  router.replace(item.path.substring(1) || '/')
                }}
                key={index}
                className='flex flex-col items-center justify-center flex-1 gap-1 '
              >
                <FontAwesome5Icon
                  name={item.icon}
                  size={20}
                  solid={false}
                  color={`${route == item.path ? '#687FEA' : 'black'}`}
                />
                <Text
                  className={`text-xs  ${
                    route == item.path ? 'text-primary font-bold' : 'text-black'
                  }`}
                >
                  {item.name}
                </Text>
              </View>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  )
}

const navigation = [
  {
    name: 'Home',
    icon: 'home',
    path: '/',
    active: true
  },
  {
    name: 'Baca Modul',
    icon: 'book',
    path: '/baca-modul',
    active: false
  },
  {
    name: 'Quiz',
    icon: 'question',
    path: '/quiz',
    active: false
  },
  {
    name: 'Mencatat',
    icon: 'pen',
    path: '/mencatat',
    active: false
  },
  {
    name: 'Quiz',
    icon: 'list',
    path: '/quiz',
    active: false
  }
]

export default BottomNav
