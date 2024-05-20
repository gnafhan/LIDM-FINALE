import Pdf from "react-native-pdf"
import { StyleSheet, View, Text } from "react-native"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import Loading from "../global/Loading"
import { useQuery } from "@tanstack/react-query"
import fetchModul from "../../util/modul/fetchModul"
import CustomAlert from "../home/CustomAlert"
import { router } from "expo-router"

const PDFView = ({ id, currentPage, totalPage, fileTitle }) => {
    const { dispatch, pdfPage, pdfZoom } = useContext(AppContext)
    const {isPending, isError, data, error} = useQuery({queryKey: ['modul'], queryFn: fetchModul})
    const [alertVisible, setAlertVisible] = useState(false)

    const showAlert = () => {
      setAlertVisible(true)
    }
    const handleDismiss = () => {
      setAlertVisible(false)
    }

    useEffect(() => {
        if(data){
            let myData = data.filter((item, index) => item.id == id)
            if(myData.length < 1){
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
    if (isError) {
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
        <View className="flex-1">
            <CustomAlert
                message="ID Modul yang anda masukkan salah!"
                visible={alertVisible}
                onDismiss={handleDismiss}
            />
            {
            data.map((item, index) => {
                if(item.id == id){
                    const modulUrl = process.env.EXPO_PUBLIC_BE_URL + item.attributes.file.data.attributes.url
                    fileTitle(item.attributes.file.data.attributes.name)
                    return (
                        <Pdf 
                            key={index}
                            scale={pdfZoom}
                            page={pdfPage}
                            style={styles.pdf}
                            trustAllCerts={false}
                            source={{
                                uri: modulUrl,
                                cache: true
                            }}
                            onLoadComplete={(numberOfPages, filePath) => {
                                totalPage(numberOfPages)
                            }}
                            onError={(err)=>{
                                console.log(`err pdf : ${err}`)
                            }}
                            onPageChanged={(page) => {
                                currentPage(page)
                                dispatch({
                                    type: 'SCROLL_PAGE',
                                    payload: {
                                        number: page
                                    }
                                })
                            }}
                        />
                    )
                }
            })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    pdf: {
        flex: 1,
    },
    medium: {
        fontFamily: 'Poppins_500Medium'
      },
      regular: {
        fontFamily: 'Poppins_400Regular'
      }
})

export default PDFView