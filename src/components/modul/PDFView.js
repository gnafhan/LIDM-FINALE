import Pdf from "react-native-pdf"
import { StyleSheet } from "react-native"
import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"

const PDFView = ({ source, currentPage, totalPage }) => {
    const { dispatch, pdfPage, pdfZoom } = useContext(AppContext)

    return (
        <Pdf 
            scale={pdfZoom}
            page={pdfPage}
            style={styles.pdf}
            trustAllCerts={false}
            source={{
                uri: source,
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

const styles = StyleSheet.create({
    pdf: {
        flex: 1,
    }
})

export default PDFView