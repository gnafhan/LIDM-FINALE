import { RichEditor } from 'react-native-pell-rich-editor'
import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import generateRandomId from '../../util/generateRandomId'
import AsyncStorage from '@react-native-async-storage/async-storage'

function CatatanEditor({ id,  initialCatatan }){
    const { dispatch, currentCatatan } = useContext(AppContext)
    const richEditor = useRef()
    const [myCatatan, setMyCatatan] = useState({})
    const currentCatatanRef = useRef(currentCatatan)
    const myCatatanRef = useRef(myCatatan)
    const getData = async () => {
        const catatanData = await AsyncStorage.getItem('catatan')
        setMyCatatan(JSON.parse(catatanData))
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
            console.log('component will unmount: (currentCatatan) ' + currentCatatanRef.current)
            console.log('component will unmount: (myCatatan): ' + JSON.stringify(myCatatanRef.current))
            let finalCatatan = currentCatatanRef.current

            if(id == 'create'){
                if(finalCatatan.length > 0){
                    let catatan = {...myCatatanRef.current}
                    let catatanId = generateRandomId(6)
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
        currentCatatanRef.current = currentCatatan
        myCatatanRef.current = myCatatan
    }, [currentCatatan, myCatatan])

    return (
        <RichEditor
            ref={richEditor}
            initialFocus={true}
            initialContentHTML={currentCatatan}
            onChange={(teks) => {
                dispatch({
                    type: 'SET_CATATAN',
                    payload: {
                        catatan: teks ? teks : ''
                    }
                })
            }}
        />
    )
}

export default CatatanEditor