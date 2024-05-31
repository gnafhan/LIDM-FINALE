import React, { useEffect, useState , useContext} from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { AppContext } from '../../context/AppContext'

const CustomPanduanAlert = ({ visible, onClose, path, dataSteps, dataIcons }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const { changePanduanNumber } = useContext(AppContext)

  const handleClose = () => {
    setCurrentStep(0)
    onClose() 
  }
  
  const handleNext = () => {
    if (currentStep < dataSteps.length - 1) {
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
      if(changePanduanNumber.startsWith(path+'Next')){
        if(currentStep < dataSteps.length - 1){
          handleNext()
        } else {
          handleClose()
        }
      } else if(changePanduanNumber.startsWith(path+'Previous')){
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
              name={dataIcons[currentStep]}
            />
          <Text style={styles.bold} className='text-lg text-justify mb-5 mt-7'>{dataSteps[currentStep]}</Text>
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
            {currentStep < dataSteps.length - 1 ? (
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


export default CustomPanduanAlert

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