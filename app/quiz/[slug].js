import Layout from '../../src/layout/layout'
import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import PilihQuestion from '../../src/components/quiz/PilihQuestion'
import Loading from '../../src/components/global/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native'
import CurrentPage from '../../src/components/kelas/CurrentPage'
import CustomAlert from '../../src/components/home/CustomAlert'

export default function App () {
  const { slug } = useLocalSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [myQuiz, setMyQuiz] = useState({})
  const [alertVisible, setAlertVisible] = useState(false)

  const getData = async () => {
    const quizData = await AsyncStorage.getItem('quizzes')
    let quizDataNew = JSON.parse(quizData)
    if (quizData) {
      if(!quizDataNew.hasOwnProperty(slug)){
        quizDataNew[slug] = {
          answers: new Array(500).fill(0),
          is_done: false,
          score: 0,
          id: slug
        }
      }
      setMyQuiz(quizDataNew)
    } else {
      if(quizData == null){
        setMyQuiz(
          {
            [slug]: {
              answers: new Array(500).fill(0),
              is_done: false,
              score: 0,
              id: slug
            }
          }
        )
        AsyncStorage.setItem('quizzes', JSON.stringify({
          [slug]: {
            answers: new Array(500).fill(0),
            is_done: false,
            score: 0,
            id: slug
          }
        }))
      }
    }
    setIsLoading(false)
  }
  const showAlert = () => {
    setAlertVisible(true)
  }

  const handleDismiss = () => {
    setAlertVisible(false)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (!isLoading && myQuiz[slug] && (myQuiz[slug].is_done)) {
      showAlert()
      const timer = setTimeout(() => {
        router.back()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isLoading, myQuiz, slug])

  if (isLoading) {
    return (
    <Layout>
      <Loading />
    </Layout>)
  }

  return (
    <Layout>
        { myQuiz[slug]["is_done"] ? (
          <View>
            <CurrentPage page={'Quiz'} /> 
            <View className='h-[90%]'></View>
          </View>
        ): <PilihQuestion quizId={slug} quizData={myQuiz} />}
        <CustomAlert
            message="Quiz telah berakhir!"
            visible={alertVisible}
            onDismiss={handleDismiss}
        />
    </Layout>
  )
}
  