import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import fetchKelas from '../../util/home/fetchKelas'
import Loading from '../global/Loading'
import { Image } from 'expo-image'
import { useEffect } from 'react'
import { Accordion } from './Accordion'

const KelasHeader = ({ classId }) => {
    const { isPending, isError, data, error } = useQuery({queryKey: ['kelas'], queryFn: fetchKelas})

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
          {
            data.map((item, index) => {
              if(item.id == classId){
                let itemsData = Object.keys(item.attributes).map((x, n) => {
                   if((x == "modules") || (x=="quizzes")){
                    let theData = item.attributes[`${x}`].data
                    theData = theData.map((item, index) => {
                      return {id: item.id, name: x == "modules" ? item.attributes["module_title"] : item.attributes["quiz_title"],...item.attributes, type: x}
                    })
                    return theData
                   } 
                }).filter((item, index) => item)
                itemsData =  itemsData.length > 1 ? [...itemsData[0], ...itemsData[1]] : []
                return (
                  <View key={index} className='relative min-h-[55vh] max-h-[62vh]'>
                    <View className='bg-[#7A87C4] rounded-[30px] opacity-20 w-full min-h-[55vh] h-full absolute top-0'></View>
                    <ScrollView>
                      <View className='flex gap-3 mx-5 mt-7'>
                        <Accordion title='Pertemuan 1: Pendahuluan' data={itemsData} />
                      </View>
                    </ScrollView>
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