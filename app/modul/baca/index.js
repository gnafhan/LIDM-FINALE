import { View } from 'react-native'
import Layout from '../../../src/layout/layout'
import FileNameBar from '../../../src/components/modul/FileNameBar'
import CurrentPage from '../../../src/components/kelas/CurrentPage'
import { useState } from 'react'
import PageNumber from '../../../src/components/modul/PageNumber'
import PDFView from '../../../src/components/modul/PDFView'


export default function App(){
    const [modulData, setModulData] = useState(data)
    const [totalPage, setTotalPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const defineCurrentPage = (data) => {
        setCurrentPage(data)
    }
    const defineTotalPage = (data) => {
        setTotalPage(data)
    }

    return (
        <Layout>
            <CurrentPage page={'Baca Modul'} />
            <FileNameBar type={modulData.type} title={modulData.name} />
            <PageNumber currentPage={currentPage} totalPage={totalPage} />
            <View className='bg-[#687FEA] w-full h-full rounded-2xl py-8 px-5'>
                <PDFView source={modulData.source} currentPage={defineCurrentPage} totalPage={defineTotalPage} />
            </View>
        </Layout>
    )
}

const data = {
    type: 'pdf',
    name: 'buku-siswa-biologi-sma-kelas-xii.pdf',
    source: 'https://staffnew.uny.ac.id/upload/198604112015041001/lainlain/Buku%20Bahan%20Ajar%20Biologi%20Full%20(ISBN).pdf'
}