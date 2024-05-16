import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native'
import biologi from '../../../assets/biologi.png'
import { router } from 'expo-router'
import { Image } from 'expo-image'


function MatkulCard ({judul, pengajar, image, id_kelas}) {
  return (
    <View onTouchEndCapture={()=>router.push(`/kelas/${id_kelas}`)} style={{shadowOpacity: 3, shadowColor: '#7F7F82', shadowOffset: 10, shadowRadius: 10}} className='w-[48%] aspect-square h-auto justify-between py-2 px-3 bg-white shadow-md  mt-4 rounded-[17px] '>
      <View className='flex items-end justify-end w-full '>
        <Image className='w-28 h-28' source={image} alt='aa' />
      </View>
      <View>
        <Text style={styles.medium} className='text-xl'>
          {judul}
        </Text>
        <Text
          style={styles.regular}
          className='text-normal text-[#7F7F82] line-clamp-1'
        >
          {pengajar}
        </Text>
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

export default MatkulCard
