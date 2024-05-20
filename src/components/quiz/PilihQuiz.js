import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import AccordionQuiz from './AccordionQuiz'
import { useState } from 'react'
import biologi from '../../../assets/biologi.png'
import fetchKelas from '../../util/home/fetchKelas'
import { useQuery } from '@tanstack/react-query'
import Loading from '../global/Loading'

const PilihQuiz = ({ myClass }) => {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['kelas'], queryFn: fetchKelas })
    const [totalQuiz, setTotalQuiz] = useState(0)
    const [totalQuizDone, setTotalQuizDone] = useState(0)
    const [quizDone, setQuizDone] = useState(false)
    const [quizNotDone, setQuizNotDone] = useState(false)

    const defineTotalQuiz = (data) => {
        setTotalQuiz(totalQuiz + data)
    }
    const defineTotalQuizDone = (data) => {
        setTotalQuizDone(data)
    }

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
        <View className="flex-1">
            <View className='flex flex-row items-center justify-between w-full px-[7vw] '>
                <View>
                <Text style={styles.bold} className='text-2xl'>Quiz</Text>
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
                    {totalQuizDone}/{totalQuiz} Quiz
                    </Text>
                </View>
                </View>
                <View>
                <Image className='w-36 h-36' source={biologi} alt='aa' />
                </View>
            </View>
            <View className='relative min-h-[55vh] max-h-[62vh]'>
                <View className='bg-[#7A87C4] rounded-[30px] opacity-20 w-full min-h-[55vh] h-full absolute top-0'></View>
                <ScrollView>
                    <View>
                    {
                        quizDone ? (<View
                            style={{ zIndex: 10 }}
                            className='flex flex-row items-center justify-center px-3 py-3 m-3 rounded-full bg-primary'
                        >
                            <Text style={styles.bold} className='text-xl text-white'>Selesai</Text>
                        </View>) : (<></>)
                    }
                    {
                        data.map((item, index) => {
                            if(myClass.includes(item.id)){
                                if(item.attributes.quizzes.data.length > 0){
                                    let quizData = item.attributes.quizzes.data
                                    let doneQuiz = quizData.filter((item) => item.attributes.is_done == true)
                                    if(doneQuiz.length > 0){
                                        if(!quizDone){
                                            setQuizDone(true)
                                        }
                                        return <AccordionQuiz key={index} title={item.attributes.nama_kelas} data={doneQuiz} passTotalQuiz={defineTotalQuiz} passTotalQuizDone={defineTotalQuizDone} />
                                    }
                                }
                            }
                        })
                    }
                    </View>

                    <View>
                    {
                        quizNotDone ? (
                            <View
                        style={{ zIndex: 10 }}
                        className='flex flex-row items-center justify-center px-3 py-3 m-3 rounded-full bg-primary'
                    >
                        <Text style={styles.bold} className='text-xl text-white'>Belum Dikerjakan</Text>
                    </View>
                        ) : (<></>)
                    }
                    {
                        data.map((item, index) => {
                            if(myClass.includes(item.id)){
                                if(item.attributes.quizzes.data.length > 0){
                                    let quizData = item.attributes.quizzes.data
                                    let notDoneQuiz = quizData.filter((item) => item.attributes.is_done == false)
                                    if(notDoneQuiz.length > 0){
                                        if(!quizNotDone){
                                            setQuizNotDone(true)
                                        }
                                        return <AccordionQuiz key={index} title={item.attributes.nama_kelas} data={notDoneQuiz} passTotalQuiz={defineTotalQuiz} passTotalQuizDone={(data) => {}} />
                                    }
                                }
                            }
                        })
                    }
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default PilihQuiz

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