import { View, Text } from "react-native"
import { router } from "expo-router"

function CatatanBox({ id, teks }){
    return (
        <View
              onTouchEndCapture={() => router.push(`/catatan/edit/${id}`)}
              style={{
                shadowOpacity: 3,
                shadowColor: '#7F7F82',
                shadowOffset: 10,
                shadowRadius: 10
              }}
              key={id}
              className='w-[48%] h-[100%] aspect-square justify-between pt-3 pb-7 px-4 bg-white shadow-md  mt-4 rounded-[17px] '
            >
              <View>
                <View className='bg-slate-200 w-[55px] flex justify-center items-center rounded-full'>
                    <Text className='text-xs'>{id}</Text>
                </View>
                <Text className='text-xl font-bold'>{ teks.substring(0, 13)  }</Text>
                <Text className='text-normal text-[#7F7F82] max-h-[80%] '>
                  { teks }
                </Text>
              </View>
            </View>
    )
}

export default CatatanBox