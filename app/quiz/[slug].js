import Layout from '../../src/layout/layout'
import { useEffect, useMemo, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import PilihQuestion from '../../src/components/quiz/PilihQuestion'
import Loading from '../../src/components/global/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App () {
  const { slug } = useLocalSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [myQuiz, setMyQuiz] = useState({})

  const getData = async () => {
    const quizData = await AsyncStorage.getItem('quizzes')
    let quizDataNew = JSON.parse(quizData)
    if (quizData) {
      if(!quizDataNew.hasOwnProperty(slug)){
        quizDataNew[slug] = new Array(500).fill(0)
      } else {
        if(quizDataNew[slug].length < 1){
          quizDataNew[slug] = new Array(500).fill(0)
        }
      }
      setMyQuiz(quizDataNew)
    } else {
      if(quizData == null){
        AsyncStorage.setItem('quizzes', JSON.stringify({[slug]: new Array(500).fill(0)}))
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  if (isLoading) {
    return (
    <Layout>
      <Loading />
    </Layout>)
  }

  return (
    <Layout>
        <PilihQuestion quizId={slug} quizData={myQuiz} />
    </Layout>
  )
}
  