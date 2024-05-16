import { View, Text, Image, ScrollView } from 'react-native'
import Layout from '../../src/layout/layout'
import CurrentPage from '../../src/components/kelas/CurrentPage'
import biologi from '../../assets/biologi.png'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useState } from 'react'
import AccordionModul from '../../src/components/modul/AccordionModul'




export default function App () {

return (
  <Layout>
    <CurrentPage page={'Modul'} />
      <View className='flex flex-row items-center justify-between w-full px-[7vw] '>
        <View>
          <Text className='text-2xl font-bold'>Modul</Text>
          <View className="flex flex-row items-center w-full gap-2 ">
          <FontAwesome5Icon
            name='check'
            style={{
              backgroundColor: '#687FEA',
              color: 'white',
              padding: 4,
              borderRadius: 100,
              display: 'flex',
              solid: true,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              textAlign: 'center',
              aspectRatio: 1,
              width: 20,
              marginTop: 5,
            }}
            solid={false}
          />
          <Text className='mt-2 text-lg text-secondary'>
            1/2 Modul
            </Text>
          </View>
        </View>
        <View>
          <Image className='w-36 h-36' source={biologi} alt='aa' />
        </View>
      </View>
      <View className='relative min-h-[52vh] max-h-[52vh]'>
        <View className='bg-[#7A87C4] rounded-t-[30px] opacity-20 w-full min-h-[50vh] h-full absolute top-0'></View>
          <ScrollView>
            <View className="mt-3">
              <AccordionModul title={"Biologi"} data={dataSelesai} />
              <AccordionModul title={"Kimia"} data={dataModul} />
            </View>
           
          </ScrollView>
      </View>

  </Layout>
)

}

const dataSelesai = [
  {
    title: 'Modul 1 - DNA Manusia',
    tanggal: new Date(),
    isDone: true

  },
  {
    title: 'Modul 2 - RNA Manusia',
    tanggal: new Date(),
    isDone: true
  }
]

const dataModul = [
  {
    title: 'Modul 1 - DNA Manusia',
    tanggal: new Date(),
    id: 1
  },
  {
    title: 'Modul 2 - RNA Manusia',
    tanggal: new Date(),
    id: 1
  }
]