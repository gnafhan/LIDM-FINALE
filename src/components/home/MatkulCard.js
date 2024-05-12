import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native'
import biologi from '../../../assets/biologi.png'

function MatkulCard () {
  return (
    <View className='w-[48%] aspect-square h-auto justify-between py-2 px-3 bg-white shadow-2xl mt-4 rounded-[17px] '>
      <View className='flex items-end justify-end w-full '>
        <Image className='w-28 h-28' source={biologi} alt='aa' />
      </View>
      <View>
        <Text style={styles.medium} className='text-xl'>
          Biologi
        </Text>
        <Text
          style={styles.regular}
          className='text-normal text-[#7F7F82] line-clamp-1'
        >
          Susi Susanti, S.Pd
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