import { RichEditor } from 'react-native-pell-rich-editor'
import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import generateRandomId from '../../util/generateRandomId'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet } from 'react-native'

function CatatanEditor({ id,  initialCatatan }){
    const { dispatch, currentCatatan } = useContext(AppContext)
    const richEditor = useRef()
    const [myCatatan, setMyCatatan] = useState({})
    const [keyboardCatatan, setKeyboardCatatan] = useState('')
    const [idCatatan, setIdCatatan] = useState('')
    const myCatatanRef = useRef(myCatatan)
    const idRef = useRef(idCatatan)
    const keyboardCatatanRef = useRef(keyboardCatatan)
    const getData = async () => {
        const catatanData = await AsyncStorage.getItem('catatan')
        setIdCatatan(getId(generateRandomId(3),  Object.keys(JSON.parse(catatanData))))
        setMyCatatan(JSON.parse(catatanData))
    }

    const getId = (id, listId) => {
        if((id.length > 0) && !listId.includes(id)){
            return id
        } 
        return getId(generateRandomId(3), listId)
    }

    useEffect(() => {
        getData()
        dispatch({
            type: 'SET_CATATAN',
            payload: {
                catatan: initialCatatan
            }
        })

        return(() => {
            let finalCatatan = keyboardCatatanRef.current
            if(id == 'create'){
                if(finalCatatan.length > 0){
                    let catatan = {...myCatatanRef.current}
                    let catatanId = idRef.current.length > 0 ? idRef.current : generateRandomId(3)
                    catatan[catatanId] = {
                        teks: finalCatatan
                    }
                    AsyncStorage.setItem('catatan', JSON.stringify(catatan))
                }
            } else {
                if(finalCatatan.length > 0){
                    let catatan = {...myCatatanRef.current}
                    catatan[id].teks = finalCatatan
                    AsyncStorage.setItem('catatan', JSON.stringify(catatan))
                } else {
                    let catatan = {...myCatatanRef.current}
                    delete catatan[id]
                    AsyncStorage.setItem('catatan', JSON.stringify(catatan))
                }
            }
        })
    }, [])

    useEffect(() => {
        richEditor.current?.setContentHTML(currentCatatan)
        keyboardCatatanRef.current = currentCatatan
        myCatatanRef.current = myCatatan
        idRef.current = idCatatan
    }, [currentCatatan, myCatatan, idCatatan])

    return (
        <RichEditor
            minimumFontSize={22}
            ref={richEditor}
            initialFocus={true}
            initialContentHTML={currentCatatan}
            onChange={(teks) => {
                keyboardCatatanRef.current = teks
            }}
        />
    )
}

export default CatatanEditor

const styles = StyleSheet.create({
    medium: {
      fontFamily: 'Poppins_500Medium'
    },
    regular: {
      fontFamily: 'Poppins_400Regular'
    },
    bold: {
      fontFamily: 'Poppins_600SemiBold'
    }
  })