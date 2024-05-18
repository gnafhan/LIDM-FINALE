import { ScrollView, Text, View } from 'react-native'
import CurrentPage from '../../src/components/kelas/CurrentPage'
import Layout from '../../src/layout/layout'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
// import CatatanBox from '../../src/components/catatan/CatatanBox'
import { router } from 'expo-router'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { useEffect, useState, useContext } from 'react'
// import { AppContext } from '../../src/context/AppContext'
import CatatanItems from '../../src/components/catatan/CatatanItems'

export default function App () {

  return (
    <Layout>
      <CurrentPage page={''} />
      <View className='flex flex-col w-full '>
        <View className='flex flex-row items-center justify-between w-full px-5'>
          <Text className='text-xl font-semibold'>Catatan Saya</Text>
          <FontAwesome5Icon
            onPress={() => router.push('/catatan/edit/create')}
            name='plus'
            style={{
              // backgroundColor: '#687FEA',
              color: 'black',
              borderRadius: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              scale: 1.5
            }}
            size={20}
            solid={false}
          />
        </View>
        <ScrollView className=' h-[70vh]'>
          <CatatanItems />
        </ScrollView>
      </View>
    </Layout>
  )
}

// const data = {
//   'AGS81': {
//     teks: 'Lorem ipsum dolor sit , consectetur adipiscing ametelit. consectetur adipiscing ametelit. consectetur adipiscing ametelit. consectetur adipiscing ametelit. consectetur adipiscing ametelit. Donec nec odio vitae nunc. Donec nec odio vitae nunc.  Donec nec odio vitae nunc. Donec nec odio vitae nunc. Donec nec odio vitae nunc.'
//   },
//   'AGVV81': {
//     teks: 'Lorem ipsum dolor sit , consectetur adipiscing ametelit.Lorem ipsum dolor sit , consectetur adipiscing ametelit.Lorem ipsum dolor sit , consectetur adipiscing ametelit. consectetur adipiscing ametelit. consectetur adipiscing ametelit. consectetur adipiscing ametelit. consectetur adipiscing ametelit. Donec nec odio vitae nunc. Donec nec odio vitae nunc.  Donec nec odio vitae nunc. Donec nec odio vitae nunc. Donec nec odio vitae nunc.'
//   },
//   'AGAA81': {
//     teks: 'Lorem ipsum dolor sit , consectetur adipiscing ametelit.Lorem ipsum dolor sit , consectetur adipiscing ametelit.Lorem ipsum dolor sit , consectetur adipiscing ametelit. consectetur adipiscing dolor sit , consectetur adipiscing ametelit.Lorem ipsum dolor sit , consectetur adipiscing ametelit.Lorem ipsum dolor sit , consectetur adipiscing ametelit. consectetur adipiscingdolor sit , consectetur adipiscing ametelit.Lorem ipsum dolor sit , consectetur adipiscing ametelit.Lorem ipsum dolor sit , consectetur adipiscing ametelit. consectetur adipiscing ametelit. consectetur adipiscing ametelit. consectetur adipiscing ametelit. consectetur adipiscing ametelit. Donec nec odio vitae nunc. Donec nec odio vitae nunc.  Donec nec odio vitae nunc. Donec nec odio vitae nunc. Donec nec odio vitae nunc.'
//   }
// }
