import { View, Text, TextInput, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomAlert from './CustomAlert'
import Loading from '../global/Loading'
import { router } from 'expo-router'
import PanduanAlert from './PanduanAlert'

function WelcomeBanner () {
  const { dispatch, kodeKelas, daftarKelas, showPanduan } = useContext(AppContext)
  const [alertVisible, setAlertVisible] = useState(false)
  const [myClass, setMyClass] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [panduanVisible, setPanduanVisible] = useState(true)

  const showPanduanAlert = () => {
    setPanduanVisible(true)
  }

  const closePanduan = () => {
    setPanduanVisible(false)
  }

  const getData = async () => {
    const classData = await AsyncStorage.getItem('classes')
    const firstOpen = await AsyncStorage.getItem('first_open')
    if(classData){
      setMyClass(JSON.parse(classData))
    }
    if(firstOpen){
      setPanduanVisible(false)
    } else {
      AsyncStorage.setItem('first_open', JSON.stringify({first_open: false}))
      setPanduanVisible(true)
    }
    setIsLoading(false)
  }
  const showAlert = () => {
    setAlertVisible(true)
  }
  const handleDismiss = () => {
    setAlertVisible(false)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if(showPanduan.startsWith('show')){
      showPanduanAlert()
    } else {
      closePanduan()
    }
  }, [showPanduan])

  if(isLoading){
    return <Loading />
  }

  const submitKode = () => {
    const semuaKelas = Object.values(daftarKelas ? daftarKelas : {}).map((item) => item[0])
          let submitKode = 'CLS-'+kodeKelas
          if(semuaKelas.includes(submitKode)){
            let newKelasKey = ''
            for(let key of Object.keys(daftarKelas)){
              if(daftarKelas[newKelasKey]){
                if(daftarKelas[newKelasKey][0] == submitKode){
                  break
                }
              }
              newKelasKey = key
            }
            let newKelas = daftarKelas[newKelasKey]
            console.log(newKelas)
            let newMyClass = { ...myClass }
            newMyClass[newKelasKey] = newKelas
            AsyncStorage.setItem('classes', JSON.stringify(newMyClass))
            router.push(`/kelas/${newKelas[1]}`)
          } else {
            showAlert()
          }
  }

  useEffect(() => {
    dispatch({
      type: 'SET_KODE_KELAS',
      payload: {
        kode: ''
      }
    })
  }, [])

  return (
    <View className='bg-[#687FEA] py-5 px-5 mt-3 rounded-[30px] flex text-[#fff]'>
      <CustomAlert
          message="Kode yang anda masukkan salah!"
          visible={alertVisible}
          onDismiss={handleDismiss}
      />
      <PanduanAlert visible={panduanVisible} onClose={closePanduan} />
      <View className='flex flex-row items-center justify-between w-full'>
        <View className='flex flex-col '>
          <Text style={styles.medium} className='text-3xl text-[#fff]'>
            Halo,{' '}
          </Text>
          <Text style={styles.medium} className='text-2xl text-[#fff]'>
            Selamat Datang
          </Text>
        </View>
        <View className='flex flex-col '>
          <View
            style={{ borderColor: '#fff' }}
            className='items-center p-2 border-[2px] rounded-full aspect-square '
            onTouchEndCapture={showPanduanAlert}
          >
            <FontAwesome5
              className='opacity-0'
              style={{}}
              color={'white'}
              size={20}
              name='question'
            />
          </View>
        </View>
      </View>
      <View className='mt-5'>
        <TextInput
          onChangeText={ (teks) => {
            dispatch({
              type: 'SET_KODE_KELAS',
              payload: {
                kode: teks
              }
            })
          }}
          onSubmitEditing={(e) => {
            submitKode()
          }}
          value={kodeKelas}
          style={styles.regular}
          className='px-5 py-3 pt-4 mt-3 bg-[#fff] rounded-full'
          placeholder='Masukkan kode kelas'
        />
      </View>
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

export default WelcomeBanner
