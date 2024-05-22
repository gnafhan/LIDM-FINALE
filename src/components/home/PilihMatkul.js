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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState, useContext } from 'react'
import { AppContext } from '../../context/AppContext'

function PilihMatkul () {
  const {isPending, isError, data, error} = useQuery({queryKey: ['kelas'], queryFn: fetchKelas})
  const { dispatch } = useContext(AppContext)
  const [ classes, setClasses ] = useState({})
  const getData = async () => {
      const data = await AsyncStorage.getItem('classes')
      if(data){
        setClasses(JSON.parse(data))
      }
  }

  useEffect(() => {
    if(data){
      let newData = {}
      for(let item of data){
        let classTitle = item.attributes.nama_kelas.trim().toLowerCase()
        let classCode = item.attributes.kode_kelas.trim()
        let classId = item.id
        newData[classTitle] = [classCode, classId]
      }
      dispatch({
        type: 'SET_KELAS',
        payload: {
          kelas: newData
        }
      })
    }
  }, [data])

  useEffect(() => {
    getData()
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
      <View className='flex flex-row items-center justify-start w-full px-3 pt-4 pb-1'>
        <Text style={styles.medium} className='text-xl font-semibold'>
          Pilih kelas anda
        </Text>
      </View>
      <ScrollView className=' h-[45vh]'>
        <View className='flex flex-row flex-wrap justify-between w-full ms-4 pb-10 '>
          {data.length > 0 ? (
            data.map((item, index) => {
              const kelasku = Object.values(classes ? classes : {}).map((item) => item[0])
              let itemClass = item.attributes.kode_kelas
              if(kelasku.includes(itemClass)){
                return <MatkulCard id_kelas={item.id} judul={item.attributes.nama_kelas} pengajar={item.attributes.nama_pengajar} image={process.env.EXPO_PUBLIC_BE_URL +  item.attributes.gambar_kelas.data.attributes.url} key={index} />
              }
            })
          ) : (
            <View className='flex w-full h-[50vh] justify-center items-center'>
              <Text style={styles.regular} className='text-lg text-center '>
                Data tidak ditemukan
              </Text>
            </View>
          )}
          {
            Object.values(classes).length > 0 ? <></> : (
              <Text style={styles.regular} className="text-normal mt-5 ml-3">Anda belum bergabung dengan kelas apapun.</Text>
            )
          }
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
