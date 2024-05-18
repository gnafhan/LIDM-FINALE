import React, { useEffect, useState } from 'react'
import Layout from '../../../src/layout/layout'
import CurrentPage from '../../../src/components/kelas/CurrentPage'
import { View } from 'react-native'
import CatatanEditor from '../../../src/components/catatan/CatatanEditor'
import { useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../../src/components/global/Loading'

export default function App() {
  const { slug } = useLocalSearchParams()
  const [myCatatan, setMyCatatan] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const catatanData = await AsyncStorage.getItem('catatan')
    if (catatanData) {
      setMyCatatan(JSON.parse(catatanData))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  if (isLoading) {
    return <View>
      <Loading />
    </View>
  }

  return (
    <Layout>
      <CurrentPage page={"Catatan"} />
      <View>
        {myCatatan[slug] ? (
          <CatatanEditor id={slug} initialCatatan={myCatatan[slug].teks} />
        ) : (
          <CatatanEditor id={slug} initialCatatan='' />
        )}
      </View>
    </Layout>
  )
}
