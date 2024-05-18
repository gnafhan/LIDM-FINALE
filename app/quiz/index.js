import { View, Text, Image, ScrollView } from 'react-native'
import Layout from '../../src/layout/layout'
import CurrentPage from '../../src/components/kelas/CurrentPage'
import biologi from '../../assets/biologi.png'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useState } from 'react'
import AccordionQuiz from '../../src/components/quiz/AccordionQuiz'




export default function App () {
const [isCollapsed, setIsCollapsed] = useState(true)

return (
  <Layout>
    <CurrentPage page={'Quiz'} />
      <View className='flex flex-row items-center justify-between w-full px-[7vw] '>
        <View>
          <Text className='text-2xl font-bold'>Quiz</Text>
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
          <Text className='mt-2 text-lg text-secondary'>
            1/2 Quiz
            </Text>
          </View>
        </View>
        <View>
          <Image className='w-36 h-36' source={biologi} alt='aa' />
        </View>
      </View>
      <View className='relative min-h-[52vh] max-h-[52vh]'>
        <View className='bg-[#7A87C4] rounded-t-[30px] opacity-20 w-full min-h-[50vh] h-full absolute top-0'></View>
          <ScrollView>
            <View>
              <View
                style={{ zIndex: 10 }}
                className='flex flex-row items-center justify-center px-3 py-3 m-3 rounded-full bg-primary'
              >
                <Text className='text-xl font-bold text-white'>Selesai</Text>
              </View>
              <AccordionQuiz title={"Matematika"} data={dataSelesai} />
            </View>
            <View>
              <View
                style={{ zIndex: 10 }}
                className='flex flex-row items-center justify-center px-3 py-3 m-3 rounded-full bg-primary'
              >
                <Text className='text-xl font-bold text-white'>Belum Dikerjakan</Text>
              </View>
              <AccordionQuiz title={"Kimia"} data={dataQuiz} />
            </View>
          </ScrollView>
      </View>

  </Layout>
)

}

const dataSelesai = [
  {
    title: 'Quiz 1 - DNA Manusia',
    jumlah: 10,
    isDone: true,
    nilai: 80
  },
  {
    title: 'Quiz 2 - RNA Manusia',
    jumlah: 10,
    isDone: true,
    nilai: 90
  }
]

const dataQuiz = [
  {
    title: 'Quiz 1 - DNA Manusia',
    jumlah: 10,
    isDone: false,
    id: 1
  },
  {
    title: 'Quiz 2 - RNA Manusia',
    jumlah: 10,
    isDone: false,
    id: 1
  }
]