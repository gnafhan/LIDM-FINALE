import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native'
import MatkulCard from './MatkulCard'

function PilihMatkul () {
  return (
    <View>
      <View className='flex flex-row items-center justify-between w-full px-3 pt-4 pb-1'>
        <Text style={styles.medium} className='text-xl font-semibold'>
          Pilih kelas anda
        </Text>
        <Text style={styles.regular} className='text-xl text-[#687FEA]'>
          Kode
        </Text>
      </View>
      <ScrollView className=' h-[55%]'>
        <View className='flex flex-row flex-wrap justify-between w-full '>
          {data.length > 0 ? (
            data.map((item, index) => <MatkulCard key={index} />)
          ) : (
            <View className='flex w-full h-[50vh] justify-center items-center'>
              <Text style={styles.regular} className='text-lg text-center '>
                Data tidak ditemukan
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
const data = [1, 2, 3, 4, 5]
const styles = StyleSheet.create({
  medium: {
    fontFamily: 'Poppins_500Medium'
  },
  regular: {
    fontFamily: 'Poppins_400Regular'
  }
})

export default PilihMatkul
