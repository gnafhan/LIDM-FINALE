import { View, Text } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { router, usePathname } from 'expo-router'
import Voice from '@react-native-voice/voice'
import checkCommand from '../../util/checkCommand'
import getCommand from '../../util/getCommand'
import React, {useEffect, useState, useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

function BottomNav () {
  const { dispatch, pdfPage, pdfZoom, editCatatan, currentCatatan } = useContext(AppContext)
  const [microphone, setMicrophone] = useState(true)
  const [command, setCommand] = useState([])
  const route = usePathname()

  const startSpeech = async () => {
    await Voice.start("id-ID", {
      "EXTRA_PARTIAL_RESULTS": true
    })
  }
  const stopSpeech = async () => {
    await Voice.stop()
  }
  const toggleMicrophone = () => {
    if(microphone){
      console.log("Microphone aktif")
      setMicrophone(false)
      startSpeech()
    } else {
      console.log("Microphone tidak aktif")
      setMicrophone(true)
      stopSpeech()
    }
  }
  
  const onSpeechResults = (result) => {
    setCommand(result.value)
  }
  const onSpeechError = (error) => {
    console.log(error)
    setTimeout(()=>{
      startSpeech()
      setMicrophone(false)
    }, 500)
  }
  const onSpeechEnd = (e) => {
      setTimeout(()=>{
        startSpeech()
        setMicrophone(false)
      }, 500)
  }

  const changePage = () => {
    
  }

  useEffect(() => {
    setTimeout(()=>{
      startSpeech()
      setMicrophone(false)
    }, 500)

    Voice.onSpeechError = onSpeechError
    Voice.onSpeechResults = onSpeechResults
    Voice.onSpeechEnd = onSpeechEnd
    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  useEffect(() => {
    console.log(command)
    let voice = command.join(" ").toLowerCase()

    if(checkCommand(getCommand('valid'), voice)){
      // If user in modul page
      if(route == '/modul'){
        if(checkCommand(getCommand('openModul'), voice)){
          router.push('/modul/baca')
        }
      }
      // If user in baca modul page
      if(route == '/modul/baca'){
        if(checkCommand(getCommand('scroll'), voice)){
            if(checkCommand(getCommand('scrollNaik'), voice)){
                console.log("scroll naik")
                dispatch({
                    type: 'SCROLL_PAGE',
                    payload: {
                        number: pdfPage-1
                    }
                })
            } else if(checkCommand(getCommand('scrollTo'), voice)){
                let commandSplit = command[0].split(" ")
                let pageNumber = parseInt(commandSplit[commandSplit.length - 1])
                dispatch({
                  type: 'SCROLL_PAGE',
                  payload: {
                      number: pageNumber
                  }
              })
            } else {
              console.log("scroll turun")
                dispatch({
                    type: 'SCROLL_PAGE',
                    payload: {
                        number: pdfPage+1
                    }
                })
            }
          } else if(checkCommand(getCommand('zoomIn'), voice)){
            dispatch({
                type: 'ZOOM_PAGE',
                payload: {
                    zoom: pdfZoom + 0.05
                }
            })
          } else if(checkCommand(getCommand('zoomOut'), voice)){
            dispatch({
                type: 'ZOOM_PAGE',
                payload: {
                    zoom: pdfZoom - 0.05
                }
            })
          } else {
             console.log('command salah')
          }
      } 

      // If user in catatan page
      if(route == '/catatan'){
        console.log(editCatatan)
        if(checkCommand(getCommand('openCatatan'), voice)){
          router.push('/catatan/edit')
        }
      }
      // If user in catatan edit page
      if(route == '/catatan/edit'){
        if(checkCommand(getCommand('startEdit'), voice)){
          dispatch({
            type: 'EDIT_CATATAN',
            payload: {
              edit: true
            }
          })
        }
        if(checkCommand(getCommand('stopEdit'), voice)){
          dispatch({
            type: 'EDIT_CATATAN',
            payload: {
              edit: false
            }
          })
        }
        if(editCatatan){
          if(checkCommand(getCommand('backspace'), voice)){
            let editedCatatan = currentCatatan.slice(0, -1)
            dispatch({
              type: 'SET_CATATAN',
              payload: {
                catatan: editedCatatan
              }
            })
          } else if(checkCommand(getCommand('deleteLastWord'), voice)){
            let editedCatatan = currentCatatan.split(" ")
            editedCatatan.pop()
            editedCatatan = editedCatatan.join(" ")
            dispatch({
              type: 'SET_CATATAN',
              payload: {
                catatan: editedCatatan
              }
            })
          } else if(checkCommand(getCommand('deleteLastSentence'), voice)){
            let editedCatatan = currentCatatan.split(".")
            editedCatatan.pop()
            editedCatatan = editedCatatan.join(".")
            dispatch({
              type: 'SET_CATATAN',
              payload: {
                catatan: editedCatatan
              }
            })
          } else {
            //
          }
        }
      }
      
      // Change page
      if(checkCommand(getCommand('gantiHalaman'), voice)){
        if(checkCommand(getCommand('halaman', 'modul'), voice)){
            router.push("/modul")
        } else  if(checkCommand(getCommand('halaman', 'catatan'), voice)){
            router.push("/catatan")
        } else if(checkCommand(getCommand('halaman', 'quiz'), voice)){
            router.push("/quiz")
        } else if(checkCommand(getCommand('halaman', 'home'), voice)){
            router.push("/")
        } else if(checkCommand(getCommand('back'), voice)){
            router.back()
        } else {
          console.log('page tidak ditemukan')
        }
      } else if(checkCommand(getCommand('back'), voice)){
        router.back()
      } else {
        console.log('command salah')
      } 
       
    } else {
      if(route == '/catatan/edit'){
        if(editCatatan){
          if(command[0]){
            let signExcepted = [',', '.', ' ', '!', '?']
            let space = signExcepted.includes(command[0]) ? '' : ' '
            dispatch({
              type: 'SET_CATATAN',
              payload: {
                catatan: currentCatatan + space + command[0]
              }
            })
          }
        }
      }
    }

  }, [command])

  return (
    <View className='absolute self-center w-full py-3  shadow-2xl bg-[#E2E4ED] rounded-2xl bottom-7'>
      <View className='flex flex-row w-full'>
        {navigation.map((item, index) => (
          <React.Fragment key={index}>
            {index == 2 ? (
              <View className='flex flex-col items-center justify-center flex-1 gap-1 '>
                <View
                  key={index}
                  onTouchEndCapture={toggleMicrophone}
                  className='absolute top-[-46px] p-5 rounded-full justify-center-center text-center flex flex-col items-center bg-primary'
                >
                  <FontAwesome5Icon
                    name={microphone ? 'microphone' : 'stop'}
                    size={30}
                    solid
                    style={{
                      aspectRatio: 1,
                      textAlign: 'center'
                    }}
                    color={`white`}
                  />
                </View>
              </View>
            ) : (
              <View
                onTouchEndCapture={() => {
                  router.push(item.path.substring(1) || '/')
                }}
                key={index}
                className='flex flex-col items-center justify-center flex-1 gap-1 '
              >
                <FontAwesome5Icon
                  name={item.icon}
                  size={20}
                  solid={false}
                  color={`${route == item.path || (item.path!== '/' && route.includes(item.path.substring(1))) ? '#687FEA' : 'black'}`}
                />
                <Text
                  className={`text-xs  ${
                        route == item.path ||
                        (item.path !== '/' && route.includes(item.path.substring(1)))
                          ? 'text-primary font-bold'
                          : 'text-black'

                                          }`}
                >
                  {item.name}
                </Text>
              </View>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  )
}

const navigation = [
  {
    name: 'Home',
    icon: 'home',
    path: '/',
    active: true
  },
  {
    name: 'Baca Modul',
    icon: 'book',
    path: '/modul',
    active: false
  },
  {
    name: 'Quiz',
    icon: 'question',
    path: '/quiz',
    active: false
  },
  {
    name: 'Mencatat',
    icon: 'pen',
    path: '/catatan',
    active: false
  },
  {
    name: 'Quiz',
    icon: 'list',
    path: '/quiz',
    active: false
  }
]

export default BottomNav
