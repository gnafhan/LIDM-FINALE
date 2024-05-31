import React, { useState, useContext, useEffect } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { AppContext } from '../../context/AppContext'

const NameAlert = ({ visible, onClose, onSubmit, passName }) => {
  const [nama, setNama] = useState('')
  const { dispatch, namaLengkap, changeQuizNumber } = useContext(AppContext)

  const handleClose = () => {
    dispatch({
      type: 'SET_NOMOR_KUIS',
      payload: {
        quizNumber: ''
      }
    })
    dispatch({
      type: 'SET_NAMA',
      payload: {
        nama: ''
      }
    })
    onClose()
  }
  
  const handleSubmit = () => {
    onSubmit()
  }

  useEffect(()=> {
    if(namaLengkap){
      if(namaLengkap !=  ''){
        if(namaLengkap.toLowerCase().startsWith('hapus kata terakhir')){
          let newNama = nama.split(' ')
          newNama.pop()
          newNama = newNama.join(' ')
          setNama(newNama)
        } else  if(namaLengkap.toLowerCase().startsWith('hapus kalimat terakhir')){
          let newNama = nama.split(".")
          newNama.pop()
          newNama = newNama.join(".")
          setNama(newNama)
        } else if(namaLengkap.toLowerCase().startsWith('eja')){
          let newNama = namaLengkap.slice(3).trim()
          newNama = newNama.replace(/\s/g, '')
          setNama(nama + ' ' + newNama)
        } else {
          setNama(nama + ' ' + namaLengkap)
        }
      }
    }
  }, [namaLengkap])

  useEffect(() => {
    if((changeQuizNumber == 'cancel')|| (changeQuizNumber == '')){
      setNama('')
    }
  }, [changeQuizNumber])

  useEffect(() => {
    dispatch({
      type: 'SET_NAMA_FINAL',
      payload: {
        namaFinal: nama
      }
    })
  }, [nama])

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{backgroundColor: 'rgba(0,0,0,0.5)'}} className='flex-1 justify-center items-center'>
        <View className='w-[80%] bg-white px-5 py-8 rounded-2xl items-center'>
        <FontAwesome5
              className='opacity-0'
              style={{}}
              color={'#687FEA'}
              size={70}
              name='paper-plane'
            />
          <Text style={styles.bold} className='text-lg text-justify mb-5 mt-7'>Masukkan nama anda</Text>
          <TextInput
            style={styles.regular}
            className='py-2 border-2 px-3 text-base w-[100%] rounded-xl border-primary'
            onChangeText={setNama}
            placeholder="Ucapkan atau ketik nama anda"
            value={nama}
        />
          <View className='flex-row justify-between w-[100%] mt-7'>
              <TouchableOpacity className='px-5 py-3 text-lg text-center items-center text-white rounded-xl w-fit bg-white border-2 border-primary' onPress={handleClose}>
                <Text style={styles.bold} className='text-primary text-base'>Batalkan</Text>
              </TouchableOpacity>
              <TouchableOpacity className='px-5 py-3 text-lg  text-center items-center text-white rounded-xl w-fit bg-primary' onPress={handleSubmit}>
                <Text style={styles.bold} className='text-white text-base'>Kirim</Text>
              </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </Modal>
  )
}


export default NameAlert

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