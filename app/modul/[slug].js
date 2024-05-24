import { View } from 'react-native'
import Layout from '../../src/layout/layout'
import FileNameBar from '../../src/components/modul/FileNameBar'
import CurrentPage from '../../src/components/kelas/CurrentPage'
import { useEffect, useState } from 'react'
import PageNumber from '../../src/components/modul/PageNumber'
import PDFView from '../../src/components/modul/PDFView'
import { useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../src/components/global/Loading'


export default function App(){
    const { slug } = useLocalSearchParams()
    const [totalPage, setTotalPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [fileTitle, setFileTitle] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const setData = async () => {
        const modulesData = await AsyncStorage.getItem('modules')
        if(modulesData){
          let modulesDataObj = JSON.parse(modulesData)
          if(modulesDataObj[slug]){
          console.log(modulesDataObj)
            if(modulesDataObj[slug]["is_done"] == false){
                let newDoneModules = {...modulesDataObj}
                newDoneModules[slug]["is_done"] = true
                AsyncStorage.setItem("modules", JSON.stringify(newDoneModules))
            }
          }
        }
        setIsLoading(false)
      }

    const defineCurrentPage = (data) => {
        setCurrentPage(data)
    }
    const defineTotalPage = (data) => {
        setTotalPage(data)
    }
    const defineFileTitle = (data) => {
        setFileTitle(data)
    }

    useEffect(() => {
        setData()
    }, [])

    if (isLoading) {
        return (
        <Layout>
          <CurrentPage page={'Baca Modul'} />
          <Loading />
        </Layout>)
      }

    return (
        <Layout>
            <CurrentPage page={'Baca Modul'} />
            <FileNameBar type={'pdf'} title={fileTitle} />
            <PageNumber currentPage={currentPage} totalPage={totalPage} />
            <View className='bg-[#687FEA] w-full h-[80%] rounded-2xl py-8 px-5'>
                <PDFView id={slug} currentPage={defineCurrentPage} totalPage={defineTotalPage} fileTitle={defineFileTitle} />
            </View>
        </Layout>
    )
}
