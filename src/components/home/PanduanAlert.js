import React, { useEffect, useState , useContext} from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { AppContext } from '../../context/AppContext'

const PanduanAlert = ({ visible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const { dispatch, changePanduanNumber } = useContext(AppContext)

  const steps = [
    'Ucapkan "valid-valid" untuk mulai memberi perintah.  untuk berhenti memberi perintah, ucapkan "stop" / "berhenti". Untuk melanjutkan panduan, ucapkan "selanjutnya"', 
    'Ucapkan "next" / "selanjutnya", "previous" / "sebelumnya", atau "skip" /"lewati" untuk melanjutkan konten.',
    'Untuk membuka panduan ini lagi, pergi ke halaman home dan ucapkan "buka panduan".',
    'Untuk berpindah halaman, ucapkan "pindah halaman (nama halaman)". Terdapat halaman home, modul, catatan, dan quiz. Untuk kembali, ucapkan "back" / "kembali"',
    'Untuk masuk ke suatu kelas, pergi ke halaman home dan ucapkan "masukkan kode (kode kelas)". Kode kelas akan diberitahu gurumu. Setelah kode dirasa benar, ucapkan "enter".',
    'Untuk membuka suatu kelas, pergi ke halaman home dan ucapkan "buka kelas (nama kelas)". Kamu hanya bisa membuka kelas yang sudah kamu masuki.',
    'Untuk membuka suatu modul, buka suatu kelas atau pergi ke halaman modul dan ucapkan "buka modul (nomor modul)."',
    'Untuk menscroll halaman modul, ucapkan "scroll (opsi)". Opsi yang tersedia adalah "naik", "turun", dan "ke halaman (nomor halaman)".',
    'Untuk memperbesar halaman modul, ucapkan "perbesar". Untuk memperkecil, ucapkan "perkecil".',
    'Untuk membuat catatan baru, pergi ke halaman catatan dan ucapkan "buat catatan".',
    'Untuk membuka catatan, ucapkan "buka catatan (kode catatan). Semua ucapanmu akan langsung dikonversi menjadi teks ketika catatan dibuka. Untuk menghentikannya, ucapkan "valid-valid".',
    'Untuk menghapus kata terakhir, ucapkan "hapus kata terakhir". Untuk menghapus kalimat terakhir, ucapkan "hapus kalimat terakhir".',
    'Untuk membuat baris baru, ucapkan "enter". Untuk menghapusnya, ucapkan "hapus baris terakhir".',
    'Untuk membuka suatu quiz, pergi ke halaman quiz dan ucapkan "buka quiz (nomor quiz)."',
    'Untuk memilih jawaban, ucapkan "jawab (opsi)". Opsi yang tersedia adalah "A", "B", "C", atau "D"',
    'Untuk melanjutkan quiz, ucapkan "next" / "selanjutnya", "previous" / "sebelumnya", atau "submit" /"kirim".',
    'Ketika quiz disubmit, kamu harus menginput namamu. Kamu bisa langsung mengucapkan namamu atau mulai dengan "eja" kemudian eja namamu. Untuk menghapus kata terakhir, ucapkan "hapus kata terakhir".',
    'Selamat belajar!'
  ]
  const stepIcons = [
    'microphone-alt',
    'arrow-right',
    'question-circle',
    'plane-departure',
    'school',
    'door-open',
    'book-open',
    'scroll',
    'search-plus',
    'plus-square',
    'pencil-alt',
    'eraser',
    'grip-lines',
    'newspaper',
    'font',
    'location-arrow',
    'file-signature',
    'smile-beam'
  ]

  const handleClose = () => {
    setCurrentStep(0)
    onClose() 
  }
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  useEffect(() => {
    if(changePanduanNumber.length > 0){
      if(changePanduanNumber.startsWith('next')){
        if(currentStep < steps.length - 1){
          handleNext()
        } else {
          handleClose()
        }
      } else if(changePanduanNumber.startsWith('previous')){
        if(currentStep > 0){
          handlePrevious()
        } else {
          handleClose()
        }
      }  else {
        handleClose()
      }
    }
  }, [changePanduanNumber])

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
              size={80}
              name={stepIcons[currentStep]}
            />
          <Text style={styles.bold} className='text-lg text-justify mb-5 mt-7'>{steps[currentStep]}</Text>
          <View className='flex-row justify-between w-[100%]'>
            {currentStep > 0 && (
              <TouchableOpacity className='px-5 py-3 text-lg text-center items-center text-white rounded-xl w-fit bg-primary' onPress={handlePrevious}>
                <Text style={styles.bold} className='text-white text-sm'>Sebelumnya</Text>
              </TouchableOpacity>
            )}
            {currentStep == 0 && (
              <TouchableOpacity className='px-5 py-3 text-lg text-center items-center text-white rounded-xl w-fit bg-white border-2 border-primary' onPress={handleClose}>
                <Text style={styles.bold} className='text-primary text-sm'>Lewati</Text>
              </TouchableOpacity>
            )}
            {currentStep < steps.length - 1 ? (
              <TouchableOpacity className='px-5 py-3 text-lg  text-center items-center text-white rounded-xl w-fit bg-primary' onPress={handleNext}>
                <Text style={styles.bold} className='text-white text-sm'>Selanjutnya</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className='px-5 py-3 text-lg text-center items-center text-white rounded-xl w-fit bg-primary' onPress={handleClose}>
                <Text style={styles.bold} className='text-white text-sm'>Tutup</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}


export default PanduanAlert

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