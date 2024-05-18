import { Image, ScrollView, Text, View } from 'react-native'
import CurrentPage from '../../src/components/kelas/CurrentPage'
import ScrollNumber from '../../src/components/quiz/ScrollNumber'
import Layout from '../../src/layout/layout'
import biologi from '../../assets/biologi.png'
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList
} from 'accordion-collapse-react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { Accordion } from '../../src/components/kelas/Accordion'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'

export default function App () {
    const {slug} = useLocalSearchParams()
    //TODO: fetch data from API
  return (
    <Layout>
      <CurrentPage page={'Kelas'} />
      <View className='flex flex-row items-center justify-between w-full px-[7vw] '>
        <View>
          <Text className='text-2xl font-bold'>Biologi</Text>
          <Text className='mt-2 text-lg text-secondary'>
            Sri Windarti, S.Pd
          </Text>
        </View>
        <View>
          <Image className='w-36 h-36' source={biologi} alt='aa' />
        </View>
      </View>
      <View className='relative min-h-[52vh] max-h-[52vh]'>
        <View className='bg-[#7A87C4] rounded-t-[30px] opacity-20 w-full min-h-[50vh] h-full absolute top-0'></View>
        <ScrollView>
          <View className='flex gap-3 mx-5 mt-7'>
            <Accordion title='Pertemuan 1: Gagak ' />
            <Accordion title='Pertemuan 2: ' />
          </View>
        </ScrollView>
      </View>
    </Layout>
  )
}
