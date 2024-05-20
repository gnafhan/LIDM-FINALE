import { ScrollView, Text, View, StyleSheet } from 'react-native'
import biologi from '../../../assets/biologi.png'
import { useQuery } from '@tanstack/react-query'
import fetchKelas from '../../util/home/fetchKelas'
import Loading from '../global/Loading'
import { Image } from 'expo-image'
import { useEffect } from 'react'


const KelasHeader = ({ classId }) => {
    const { isPending, isError, data, error } = useQuery({queryKey: ['kelas'], queryFn: fetchKelas})

    useEffect(() => {
      console.log(classId)
    }, [])

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
          {
            data.map((item, index) => {
              if(item.id == classId){
                return (
                  <View className='flex flex-row items-center justify-between w-full px-[7vw] ' key={index}>
                    <View>
                    <Text style={styles.bold} className='text-2xl'>{item.attributes.nama_kelas}</Text>
                    <Text style={styles.regular} className='mt-2 text-lg text-secondary'>
                        {item.attributes.nama_pengajar}
                    </Text>
                    </View>
                    <View>
                    <Image className='w-36 h-36' source={process.env.EXPO_PUBLIC_BE_URL + item.attributes.gambar_kelas.data.attributes.url} alt='aa' />
                    </View>
                </View>
                )
              }
            })
          }
        </View>
    )
}

export default KelasHeader

const styles = StyleSheet.create({
  medium: {
    fontFamily: 'Poppins_500Medium'
  },
  regular: {
    fontFamily: 'Poppins_400Regular'
  },
  bold: {
    fontFamily: 'Poppins_600SemiBold'
  }
})