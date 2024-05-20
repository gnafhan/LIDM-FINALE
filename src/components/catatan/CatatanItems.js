import { View } from 'react-native'
import CatatanBox from './CatatanBox'
import { useEffect, useState, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

function CatatanItems(){
    const [ myCatatan, setMyCatatan ] = useState({})
    const { dispatch } = useContext(AppContext)
    const getData = async () => {
        const catatanData = await AsyncStorage.getItem('catatan')
        setMyCatatan(JSON.parse(catatanData))
        dispatch({
            type: 'SET_DAFTAR_CATATAN',
            payload: {
                daftarCatatan: JSON.parse(catatanData)
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View className='flex flex-row flex-wrap justify-between w-full ms-4 pb-10 '>
            {Object.keys(myCatatan ? myCatatan : {}).reverse().map((item, index) => (
                  <CatatanBox key={item} id={item} teks={myCatatan[item].teks} />
              ))}
          </View>
    )
}

export default CatatanItems