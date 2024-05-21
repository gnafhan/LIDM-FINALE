import Layout from '../../src/layout/layout'
import CurrentPage from '../../src/components/kelas/CurrentPage'
import { useState, useEffect } from 'react'
import PilihModul from '../../src/components/modul/PilihModul'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../src/components/global/Loading'


export default function App () {
  const [isLoading, setIsLoading] = useState(true)
  const [myClass, setMyClass] = useState({})
  const [myModules, setMyModules] = useState({})

  const getData = async () => {
    const classesData = await AsyncStorage.getItem('classes')
    const modulesData = await AsyncStorage.getItem('modules')
    if (classesData) {
      setMyClass(JSON.parse(classesData))
    }
    if(modulesData){
      setMyModules(JSON.parse(modulesData))
    } else {
      AsyncStorage.setItem('modules', JSON.stringify({}))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  if (isLoading) {
    return (
    <Layout>
      <CurrentPage page={'Modul'} />
      <Loading />
    </Layout>)
  }

  return (
    <Layout>
      <CurrentPage page={'Modul'} />
      <PilihModul myClass={Object.values(myClass ? myClass : {}).map((item) => item[1])} doneModules={myModules} />
    </Layout>
  )

}