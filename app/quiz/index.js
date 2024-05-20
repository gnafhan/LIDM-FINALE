import Layout from '../../src/layout/layout'
import CurrentPage from '../../src/components/kelas/CurrentPage'
import { useState, useEffect } from 'react'
import PilihQuiz from '../../src/components/quiz/PilihQuiz'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../src/components/global/Loading'

export default function App () {
  const [isLoading, setIsLoading] = useState(true)
  const [myClass, setMyClass] = useState({})

  const getData = async () => {
    const classesData = await AsyncStorage.getItem('classes')
    if (classesData) {
      setMyClass(JSON.parse(classesData))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  if (isLoading) {
    return (
    <Layout>
      <CurrentPage page={'Quiz'} />
      <Loading />
    </Layout>)
  }

return (
  <Layout>
    <CurrentPage page={'Quiz'} />
      <PilihQuiz myClass={Object.values(myClass ? myClass : {}).map((item) => item[1])} />
  </Layout>
)

}
