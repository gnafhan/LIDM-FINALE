import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet
  } from 'react-native'
import biologi from '../../../assets/biologi.png'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import AccordionModul from './AccordionModul'
import { useQuery } from '@tanstack/react-query'
import fetchKelas from '../../util/home/fetchKelas'
import Loading from '../global/Loading'

function PilihModul({ myClass, doneModules }){
    const {isPending, isError, data, error} = useQuery({queryKey: ['kelas'], queryFn: fetchKelas})

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
            <View className='flex flex-row items-center justify-between w-full px-[7vw] '>
                <View>
                <Text style={styles.bold} className='text-2xl'>Modul</Text>
                <View className="flex flex-row items-center w-full gap-2 ">
                <FontAwesome5Icon
                    name='check'
                    style={{
                    backgroundColor: '#687FEA',
                    color: 'white',
                    padding: 4,
                    borderRadius: 100,
                    display: 'flex',
                    solid: true,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    textAlign: 'center',
                    aspectRatio: 1,
                    width: 20,
                    marginTop: 5,
                    }}
                    solid={false}
                />
                <Text style={styles.regular} className='mt-2 text-lg text-secondary'>
                    { Object.values(doneModules).filter((item, index) => item["is_done"] == true).length }/{ data.map((item, index) => {
                            if(myClass.includes(item.id)){
                                const myModules = item.attributes.modules.data.map((item) => item.id)
                                return true
                            }
                        }).filter((item) => item).length } Modul
                    </Text>
                </View>
                </View>
                <View>
                <Image className='w-36 h-36' source={biologi} alt='aa' />
                </View>
            </View>
            <View className='relative min-h-[52vh] max-h-[62vh]'>
                <View className='bg-[#7A87C4] rounded-[30px] opacity-20 w-full min-h-[55vh] h-full absolute top-0'></View>
                <ScrollView>
                    <View className="mt-3">
                    {
                        data.map((item, index) => {
                            if(myClass.includes(item.id)){
                                const myModules = item.attributes.modules.data.map((item) => item.id)
                                return <AccordionModul  key={index} title={item.attributes.nama_kelas} myModules={myModules} doneModules={doneModules} />
                            }
                        })
                    }
                    </View>
                
                </ScrollView>
            </View>
        </View>
    )
}

export default PilihModul

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