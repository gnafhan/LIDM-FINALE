import {
    View,
    Text,
    StyleSheet
  } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import fetchQuestions from '../../util/quiz/fetchQuestions'
import Loading from '../global/Loading'
import { RadioGroup } from 'react-native-radio-buttons-group'
import { useState, useMemo, useEffect, useContext } from 'react'
import Drawer from './Drawer'
import ScrollNumber from './ScrollNumber'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../../context/AppContext'
import { router } from 'expo-router'
import CustomAlert from '../home/CustomAlert'

const PilihQuestion = ({ quizId, quizData }) => {
    const { isPending, isError, data, error }= useQuery({queryKey: ['question'], queryFn: fetchQuestions})
    const [selectedId, setSelectedId] = useState()
    const [questionsData, setQuestionsData] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [currentAnswers, setCurrentAnswers] = useState(quizData[quizId] ? quizData[quizId] : [])
    const [nowAnswer, setNowAnswer] = useState([])
    const { dispatch, currentJawaban, daftarJawaban, changeQuizNumber } = useContext(AppContext)
    const [alertVisible, setAlertVisible] = useState(false)

    const showAlert = () => {
      setAlertVisible(true)
    }
    const handleDismiss = () => {
      setAlertVisible(false)
    }
    const changeSelected = (data) => {
      setSelectedId(data)
      let newDaftarJawaban = { ...daftarJawaban }
      newDaftarJawaban[quizId][currentQuestion - 1] = data
      dispatch({
        type: 'SET_DAFTAR_JAWABAN',
        payload: {
          daftarJawaban: newDaftarJawaban
        }
      })
    }
    const goToQuestion = (question) => {
      question = parseInt(question)
      if( (question > 0) && (question <= questionsData.length)){
        setCurrentQuestion(question)
        let newQuizData = [ ...currentAnswers ]
        newQuizData[currentQuestion - 1] = selectedId ? selectedId : 0
        let myData = data.filter((item, index) => item.attributes.quiz.data.id == quizId)
        if((newQuizData[currentQuestion - 1] == 0) && (currentAnswers[currentQuestion - 1] != 0)){
          newQuizData = currentAnswers
        }
        setCurrentAnswers(newQuizData)
        setSelectedId(0)
        setNowAnswer(getAnswers(myData[currentQuestion - 1])) 
        if(daftarJawaban[quizId]){
          if(daftarJawaban[quizId] != currentAnswers){
            let newDaftarJawaban = {...daftarJawaban}
            newDaftarJawaban[quizId] = currentAnswers
            dispatch({
              type: 'SET_DAFTAR_JAWABAN',
              payload: {
                daftarJawaban: newDaftarJawaban
              }
            })
          }
        }
      }
    }
    const getAnswers = (data) => {
      if(data){
        let answers = data.attributes.answers.data.map((item, index) => {
          let questionChoice = {
            0: 'A',
            1: 'B',
            2: 'C',
            3: 'D',
            4: 'E',
            5: 'F'
          }

          return {
            id: item.id,
            label: `${questionChoice[index]}. ${item.attributes.answer}`,
            value: 'guanin',
            color: '#687FEA'
          }
        })

        return answers
      } else {
        return []
      }
      
    }
    useEffect(() => {
      dispatch({
        type: 'SET_NOMOR_KUIS',
        payload: {
          quizNumber: ''
        }
      })

      if(daftarJawaban[quizId]){
        if(daftarJawaban[quizId] != currentAnswers){
          let newDaftarJawaban = {...daftarJawaban}
          newDaftarJawaban[quizId] = currentAnswers
          dispatch({
            type: 'SET_DAFTAR_JAWABAN',
            payload: {
              daftarJawaban: newDaftarJawaban
            }
          })
        }
      } else {
        let newDaftarJawaban = {...daftarJawaban}
        newDaftarJawaban[quizId] = currentAnswers
        dispatch({
          type: 'SET_DAFTAR_JAWABAN',
          payload: {
            daftarJawaban: newDaftarJawaban
          }
        })
      }

      return () => {
        let newLocalData = {...quizData}
        newLocalData[quizId] = currentAnswers
        AsyncStorage.setItem('quizzes', JSON.stringify(newLocalData))
      }
    }, [])

    useEffect(() => {
      if(changeQuizNumber == 'next'){
        goToQuestion(currentQuestion + 1)
      } else if(changeQuizNumber == 'previous'){
        goToQuestion(currentQuestion - 1)
      } else {
        if(changeQuizNumber != ''){
          goToQuestion(changeQuizNumber)
        }
      }
    }, [changeQuizNumber])

    useEffect(() => {
      let newCurrentJawaban = { ...currentJawaban }
      if(newCurrentJawaban['questionNo'] != currentQuestion){
        newCurrentJawaban['questionNo'] = currentQuestion
      }
      let myData = data ? data.filter((item, index) => item.attributes.quiz.data.id == quizId) : []
      let jawabanSekarang = getAnswers(myData[currentQuestion - 1]) ? getAnswers(myData[currentQuestion - 1]) : []
      jawabanSekarang.forEach((item, index) => {
        let questionChoice = {
          0: 'A',
          1: 'B',
          2: 'C',
          3: 'D',
          4: 'E',
          5: 'F'
        }
        newCurrentJawaban[questionChoice[index]] = item.id
      })
      if(JSON.stringify(currentJawaban) != JSON.stringify(newCurrentJawaban)){
        dispatch({
          type: 'SET_JAWABAN',
          payload:  {
            jawaban: newCurrentJawaban
          }
        })
      } else {
      }
      
    }), [nowAnswer]

    useEffect(() => {
      if(daftarJawaban[quizId]){
        if(daftarJawaban[quizId] != currentAnswers){
          setCurrentAnswers(daftarJawaban[quizId])
        }
      }
    }, [daftarJawaban])

    useEffect(() => {
      if(data){
        let myData = data.filter((item, index) => item.attributes.quiz.data.id == quizId)
        setQuestionsData(myData)
        if(myData.length > 0){
          setNowAnswer(getAnswers(myData[currentQuestion - 1])) 
        } else {
          showAlert()
          setTimeout(() => {
            router.back()
          }, 2000)
        }
      }
    }, [data])

    if(isPending){
        return <Loading />
    }

    if(isError){
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
        <Drawer questions={questionsData ? questionsData : []} isActive={currentQuestion} goTo={goToQuestion} >
          <ScrollNumber questions={questionsData ? questionsData : []} isActive={currentQuestion} goTo={goToQuestion} />
          <CustomAlert
                message="ID Quiz yang anda masukkan salah!"
                visible={alertVisible}
                onDismiss={handleDismiss}
            />
          { questionsData.length < 1 ? <></> : (
            <View className='flex flex-col px-5 py-5 rounded-2xl bg-[#E2E4ED] justify-between min-h-[60vh]'>
            <View className='flex flex-col'>
                <Text style={styles.regular} className='text-normal text-secondary'>Pertanyaan {currentQuestion}</Text>
                <Text style={styles.bold} className='mt-3 text-lg font-semibold text-black'>
                  {questionsData[currentQuestion-1].attributes.question}
                </Text>
                <View className='flex flex-col mt-5'>
                  <RadioGroup
                    containerStyle={{
                      flexDirection: 'column',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      borderColor: 'red',
                      gap: 15
                    }}
                    labelStyle={{
                      color: 'black',
                      borderColor: '#687FEA',
                      borderBlockColor: '#687FEA',
                      fontSize: 18,
                      fontWeight: '500',
                      fontFamily: 'Poppins_500Medium'
                    }}
                    radioButtons={  questionsData[currentQuestion-1] ? getAnswers(questionsData[currentQuestion-1]) : []}
                    onPress={changeSelected}
                    selectedId={currentAnswers[currentQuestion-1] == 0 ? selectedId : currentAnswers[currentQuestion-1]}
                  />
                </View>
              </View>
              <View className='flex flex-row justify-between w-full px-2 mt-9'>
                { currentQuestion == 1 ? <View></View> : (
                  <Text style={styles.bold} className='px-5 py-3 text-lg text-white rounded-xl w-fit bg-primary' onPress={(e) => goToQuestion(currentQuestion-1)}>
                  Prev
                </Text>
                )  }
                { currentQuestion == questionsData.length ? <View></View> : (
                  <Text style={styles.bold} className='px-5 py-3 text-lg text-white rounded-xl w-fit bg-primary' onPress={(e) => goToQuestion(currentQuestion+1)}>
                  Next
                </Text>
                )  }
                
              </View>
            </View>
          )}
        </Drawer>
    )
}

export default PilihQuestion

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