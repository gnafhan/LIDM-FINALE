import { ScrollView, View, StyleSheet } from 'react-native'
import CurrentPage from '../../src/components/kelas/CurrentPage'
import Layout from '../../src/layout/layout'
import { Accordion } from '../../src/components/kelas/Accordion'
import { useLocalSearchParams } from 'expo-router'
import KelasHeader from '../../src/components/kelas/KelasHeader'

export default function App () {
  const {slug} = useLocalSearchParams()
    
  return (
    <Layout>
      <CurrentPage page={'Kelas'} />
      <KelasHeader classId={slug} />
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


const styles = StyleSheet.create({
  medium: {
    fontFamily: 'Poppins_500Medium'
  },
  regular: {
    fontFamily: 'Poppins_400Regular'
  }
})