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