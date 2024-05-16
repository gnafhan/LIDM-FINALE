import { ScrollView, Text, View } from 'react-native'
import CurrentPage from '../../src/components/kelas/CurrentPage'
import Layout from '../../src/layout/layout'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { router } from 'expo-router'

export default function App () {
  return (
    <Layout>
      <CurrentPage page={''} />
      <View className='flex flex-col w-full '>
        <View className='flex flex-row items-center justify-between w-full px-5'>
          <Text className='text-xl font-semibold'>Catatan Saya</Text>
          <FontAwesome5Icon
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
        <ScrollView className=' h-[65vh]'>
          <View className='flex flex-row flex-wrap justify-between w-full ms-4 '>
            {[1, 2, 3, 4, 5].map((item, index) => (
            <View
              onTouchStart={() => router.push('/catatan/edit')}
              style={{
                shadowOpacity: 3,
                shadowColor: '#7F7F82',
                shadowOffset: 10,
                shadowRadius: 10
              }}
              key={index}
              className='w-[48%] h-[100%] aspect-square justify-between py-3 px-4 bg-white shadow-md  mt-4 rounded-[17px] '
            >
              <View>
                <Text className='text-xl font-bold'>Matematika 1</Text>
                <Text className='text-normal text-[#7F7F82] max-h-[80%] '>
                  Lorem ipsum dolor sit , consectetur adipiscing ametelit. consectetur adipiscing ametelit. consectetur adipiscing ametelit. consectetur adipiscing ametelit. consectetur adipiscing ametelit. Donec nec odio vitae nunc. Donec nec odio vitae nunc.  Donec nec odio vitae nunc. Donec nec odio vitae nunc. Donec nec odio vitae nunc.
                </Text>
              </View>
            </View>
              ))}

          </View>
        </ScrollView>
      </View>
    </Layout>
  )
}
