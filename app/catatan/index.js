import { ScrollView, Text, View, StyleSheet } from 'react-native'
import CurrentPage from '../../src/components/kelas/CurrentPage'
import Layout from '../../src/layout/layout'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { router } from 'expo-router'
import CatatanItems from '../../src/components/catatan/CatatanItems'

export default function App () {

  return (
    <Layout>
      <CurrentPage page={'Catatan'} />
      <View className='flex flex-col w-full '>
        <View className='flex flex-row items-center justify-between w-full px-5'>
          <Text style={styles.medium} className='text-xl font-semibold'>Catatan Saya</Text>
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

const styles = StyleSheet.create({
  medium: {
    fontFamily: 'Poppins_500Medium'
  },
  regular: {
    fontFamily: 'Poppins_400Regular'
  }
})
