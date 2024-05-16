import { RichEditor } from 'react-native-pell-rich-editor'
import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'

function CatatanEditor(){
    const { dispatch, editCatatan, currentCatatan } = useContext(AppContext)
    const richEditor = useRef()

    useEffect(() => {
        dispatch({
            type: 'SET_CATATAN',
            payload: {
                catatan: catatanData.teks
            }
        })
    }, [])

    useEffect(() => {
        console.log(richEditor.current?.setContentHTML(currentCatatan))
    }, [currentCatatan])

    return (
        <RichEditor
            ref={richEditor}
            initialFocus={true}
            initialContentHTML={currentCatatan}
        />
    )
}

const catatanData = {
    teks: 'Selamat malam semuanya'
}

export default CatatanEditor