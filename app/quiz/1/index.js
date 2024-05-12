import {
  View,
  Text,
  DrawerLayoutAndroid,
  StyleSheet,
  ScrollView
} from 'react-native'

import Layout from '../../../src/layout/layout'
import Drawer from '../../../src/components/quiz/Drawer'
import Number from '../../../src/components/quiz/Number'
import ScrollNumber from '../../../src/components/quiz/ScrollNumber'
import { useMemo, useState } from 'react'
import { RadioGroup } from 'react-native-radio-buttons-group'

export default function App () {
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'A. Timin',
        value: 'timin',
        color: '#687FEA'
      },
      {
        id: '2',
        label: 'B. Adenin',
        value: 'adenin',
        color: '#687FEA'
      },
      {
        id: '3',
        label: 'C. Sitosin',
        value: 'sitosin',
        color: '#687FEA'
      },
      {
        id: '4',
        label: 'D. Guanin',
        value: 'guanin',
        color: '#687FEA'
      }
    ],
    []
  )
  const [selectedId, setSelectedId] = useState()
  return (
    <Layout>
      <Drawer>
        <ScrollNumber />
        <View className='flex flex-col px-5 py-5 rounded-2xl bg-[#E2E4ED] justify-between min-h-[60vh]'>
          <View className='flex flex-col'>
            <Text className='text-lg text-secondary'>Pertanyaan 1</Text>
            <Text className='mt-3 text-xl font-semibold text-black'>
              Pasangan basa Watson Crick dari urasil adalah
            </Text>
            <View className='flex flex-col mt-5'>
              <RadioGroup
                containerStyle={{
                  flexDirection: 'column',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  borderColor: 'red',
                  gap: 15
                }}
                labelStyle={{
                  color: 'black',
                  borderColor: '#687FEA',
                  borderBlockColor: '#687FEA',
                  fontSize: 20,
                  fontWeight: '500'
                }}
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
              />
            </View>
          </View>

          <View className='flex flex-row justify-between w-full px-2 mt-9'>
            <Text className='px-5 py-3 text-lg font-bold text-white rounded-xl w-fit bg-primary'>
              Prev
            </Text>
            <Text className='px-5 py-3 text-lg font-bold text-white rounded-xl w-fit bg-primary'>
              Next
            </Text>
          </View>
        </View>
      </Drawer>
    </Layout>
  )
}
