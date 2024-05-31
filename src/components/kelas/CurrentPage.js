import { router } from 'expo-router'
import React, { useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CustomPanduanAlert from '../global/CustomPanduanAlert'
import { usePathname } from 'expo-router'
import { AppContext } from '../../context/AppContext'

const CurrentPage = ({ page }) => {
  const { dispatch, showPanduan, changePanduanNumber} = useContext(AppContext)
  const [panduanVisible, setPanduanVisible] = useState({
    "/modul": false,
    "/catatan": false,
    "/quiz": false
  })
  const route = usePathname()
  const panduanData = {
    '/modul': {
      steps: [
        'Untuk membuka suatu modul, buka suatu kelas atau pergi ke halaman modul dan ucapkan "buka modul (nomor modul)."',
        'Untuk menscroll halaman modul, ucapkan "scroll (opsi)". Opsi yang tersedia adalah "naik", "turun", dan "ke halaman (nomor halaman)".',
        'Untuk memperbesar halaman modul, ucapkan "perbesar". Untuk memperkecil, ucapkan "perkecil".',
      ],
      icons: [
        'book-open',
        'scroll',
        'search-plus',
      ]
    },
    '/catatan': {
      steps: [
        'Untuk membuat catatan baru, pergi ke halaman catatan dan ucapkan "buat catatan".',
        'Untuk membuka catatan, ucapkan "buka catatan (kode catatan). Semua ucapanmu akan langsung dikonversi menjadi teks ketika catatan dibuka. Untuk menghentikannya, ucapkan "valid-valid".',
        'Untuk menghapus kata terakhir, ucapkan "hapus kata terakhir". Untuk menghapus kalimat terakhir, ucapkan "hapus kalimat terakhir".',
        'Untuk membuat baris baru, ucapkan "enter". Untuk menghapusnya, ucapkan "hapus baris terakhir".',
        'Ketika kamu keluar dari halaman edit catatan, catatan tersebut akan otomatis tersimpan',
      ],
      icons: [
        'plus-square',
        'pencil-alt',
        'eraser',
        'grip-lines',
        'save'
      ]
    },
    '/quiz': {
      steps: [
        'Untuk membuka suatu quiz, pergi ke halaman quiz dan ucapkan "buka quiz (nomor quiz)."',
        'Untuk memilih jawaban, ucapkan "jawab (opsi)". Opsi yang tersedia adalah "A", "B", "C", atau "D"',
        'Untuk melanjutkan quiz, ucapkan "next" / "selanjutnya", "previous" / "sebelumnya", atau "submit" /"kirim".',
        'Ketika quiz disubmit, kamu harus menginput namamu. Kamu bisa langsung mengucapkan namamu atau mulai dengan "eja" kemudian eja namamu. Untuk menghapus kata terakhir, ucapkan "hapus kata terakhir".',
      ],
      icons: [
        'newspaper',
        'font',
        'location-arrow',
        'file-signature',
      ]
    } 
  }
  const showPanduanAlert = (path) => {
    if(panduanVisible.hasOwnProperty(path)){
      setPanduanVisible({
        ...panduanVisible,
        [path]: true
      })
    }
  }
  
  const closePanduan = (path) => {
    if(panduanVisible.hasOwnProperty(path)){
      setPanduanVisible({
        ...panduanVisible,
        [path]: false
      })
    }
  }
  useEffect(() => {
    dispatch({
      type: 'SET_SHOW_PANDUAN',
      payload: {
        show: ''
      }
    })
  }, [])
  useEffect(() => {
    if(showPanduan.startsWith(route.startsWith('/catatan/edit') ? '/catatan' : route)){
      showPanduanAlert(route.startsWith('/catatan/edit') ? '/catatan' : route)
    } else {
      closePanduan(route.startsWith('/catatan/edit') ? '/catatan' : route)
    }
  }, [showPanduan])


  return (
    <View className='flex flex-row items-center justify-between w-full py-2 mt-5 '>
      <CustomPanduanAlert visible={panduanVisible[route.startsWith('/catatan/edit') ? '/catatan' : route] ? panduanVisible[route.startsWith('/catatan/edit') ? '/catatan' : route] : false} onClose={() => closePanduan(route.startsWith('/catatan/edit') ? '/catatan' : route)} path={route.startsWith('/catatan/edit') ? '/catatan' : route} dataSteps={panduanData[route.startsWith('/catatan/edit') ? '/catatan' : route] ? panduanData[route.startsWith('/catatan/edit') ? '/catatan' : route].steps : []} dataIcons={panduanData[route.startsWith('/catatan/edit') ? '/catatan' : route]? panduanData[route.startsWith('/catatan/edit') ? '/catatan' : route].icons  : []} />
      <FontAwesome5
        style={{
          marginLeft: 5,
          alignSelf: 'center'
        }}
        onPress={router.back}
        size={25}
        name='arrow-left'
      />
      <Text style={styles.bold} className='text-lg'>{page}</Text>
      <View onTouchEndCapture={() =>{showPanduanAlert(route.startsWith('/catatan/edit') ? '/catatan' : route)}} className='w-10 h-10 flex justify-center items-center'>
        <FontAwesome5
            className='opacity-0'
            style={{marginRight: 5}}
            color={'black'}
            size={20}
            name='question'
          />
      </View>
    </View>
  )
}


export default CurrentPage

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
