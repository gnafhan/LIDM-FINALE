import { View } from 'react-native'
import Layout from '../../src/layout/layout'
import FileNameBar from '../../src/components/modul/FileNameBar'
import CurrentPage from '../../src/components/kelas/CurrentPage'
import { useState } from 'react'
import PageNumber from '../../src/components/modul/PageNumber'
import PDFView from '../../src/components/modul/PDFView'
import { useLocalSearchParams } from 'expo-router'


export default function App(){
    const { slug } = useLocalSearchParams()
    const [totalPage, setTotalPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [fileTitle, setFileTitle] = useState('')

    const defineCurrentPage = (data) => {
        setCurrentPage(data)
    }
    const defineTotalPage = (data) => {
        setTotalPage(data)
    }
    const defineFileTitle = (data) => {
        setFileTitle(data)
    }

    return (
        <Layout>
            <CurrentPage page={'Baca Modul'} />
            <FileNameBar type={'pdf'} title={fileTitle} />
            <PageNumber currentPage={currentPage} totalPage={totalPage} />
            <View className='bg-[#687FEA] w-full h-full rounded-2xl py-8 px-5'>
                <PDFView id={slug} currentPage={defineCurrentPage} totalPage={defineTotalPage} fileTitle={defineFileTitle} />
            </View>
        </Layout>
    )
}
