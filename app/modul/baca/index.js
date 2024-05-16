import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Layout from '../../../src/layout/layout'
import FileNameBar from '../../../src/components/modul/FileNameBar'
import CurrentPage from '../../../src/components/kelas/CurrentPage'
import { useState } from 'react'
import Pdf from 'react-native-pdf'
import PageNumber from '../../../src/components/modul/PageNumber'


export default function App(){
    const [modulData, setModulData] = useState(data)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    return (
        <Layout>
            <CurrentPage page={'Baca Modul'} />
            <FileNameBar type={modulData.type} title={modulData.name} />
            <PageNumber currentPage={currentPage} totalPage={totalPage} />
            <View className='bg-[#687FEA] w-full h-full rounded-2xl py-8 px-5'>
                <Pdf 
                    scale={1.2}
                    style={styles.pdf}
                    trustAllCerts={false}
                    source={{
                        uri: modulData.source,
                        cache: true
                    }}
                    onLoadComplete={(numberOfPages, filePath) => {
                        setTotalPage(numberOfPages)
                    }}
                    onError={(err)=>{
                        console.log(`err pdf : ${err}`)
                    }}
                    onPageChanged={(page) => {
                        setCurrentPage(page)
                    }}
                />
            </View>
        </Layout>
    )
}

const data = {
    type: 'pdf',
    name: 'buku-siswa-biologi-sma-kelas-xii.pdf',
    source: 'https://staffnew.uny.ac.id/upload/198604112015041001/lainlain/Buku%20Bahan%20Ajar%20Biologi%20Full%20(ISBN).pdf'
}
const styles = StyleSheet.create({
    pdf: {
        flex: 1,
    }
})