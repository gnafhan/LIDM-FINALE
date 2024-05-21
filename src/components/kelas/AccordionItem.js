import { router } from 'expo-router'
import { Text, View, StyleSheet } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

export const AccordionItem = ({ type, name, id }) => {
  if (type == 'quizzes') {
    return (
      <View className='m-3 flex p-2 flex-row justify-between rounded-2xl border-2 border-[#DCDCDC] border-solid ' onTouchEndCapture={(e) => router.push('/quiz/'+id)}>
        <View className='flex flex-row items-center gap-3'>
          <FontAwesome5Icon
            name='clipboard'
            style={{
              backgroundColor: '#687FEA',
              color: 'white',
              padding: 8,
              borderRadius: 100,
              display: 'flex',
              solid: true,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              textAlign: 'center',
              aspectRatio: 1,
              width: 30
            }}
            solid={false}
          />
          <Text style={styles.bold} className='text-[16px] font-semibold text-md w-[80%]'>
            Quiz {id} - {name}
          </Text>
        </View>
      </View>
    )
  } else {
    return (
      <View className='m-3 flex p-2 flex-row justify-between rounded-2xl border-2 border-[#DCDCDC] border-solid '  onTouchEndCapture={(e) => router.push('/modul/'+id)}>
        <View className='flex flex-row items-center gap-3'>
          <FontAwesome5Icon
            name='book-open'
            style={{
              backgroundColor: '#687FEA',
              color: 'white',
              padding: 8,
              borderRadius: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            solid={false}
          />
          <Text style={styles.bold} className='text-[16px] font-semibold text-md w-[80%]'>
            Modul {id} - {name}
          </Text>
        </View>
      </View>
    )
  }
}

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
