import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native'
import MatkulCard from './MatkulCard'
import { useQuery } from '@tanstack/react-query'
import fetchKelas from '../../util/home/fetchKelas'
import Loading from '../global/Loading'

function PilihMatkul () {
  const {isPending, isError, data, error} = useQuery({queryKey: ['kelas'], queryFn: fetchKelas})
  if (isPending) {
    return(
      <Loading/>
    )
  }

  if (isError) {
    console.log(error)
    return (
      <View className='flex w-full h-[50vh] justify-center items-center'>
        <Text style={styles.regular} className='text-lg text-center '>
          {error.message}
        </Text>
      </View>
    )
  }

  return (
    <View>
      <View className='flex flex-row items-center justify-start w-full px-3 pt-4 pb-1'>
        <Text style={styles.medium} className='text-xl font-semibold'>
          Pilih kelas anda
        </Text>
      </View>
      <ScrollView className=' h-[45vh]'>
        <View className='flex flex-row flex-wrap justify-between w-full ms-4 '>
          {data.length > 0 ? (
            data.map((item, index) => <MatkulCard id_kelas={item.id} judul={item.attributes.nama_kelas} pengajar={item.attributes.nama_pengajar} image={process.env.EXPO_PUBLIC_BE_URL +  item.attributes.gambar_kelas.data.attributes.url} key={index} />)
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
const styles = StyleSheet.create({
  medium: {
    fontFamily: 'Poppins_500Medium'
  },
  regular: {
    fontFamily: 'Poppins_400Regular'
  }
})

export default PilihMatkul
