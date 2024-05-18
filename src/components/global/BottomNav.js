import { View, Text } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { router, usePathname } from 'expo-router'
import Voice from '@react-native-voice/voice'
import checkCommand from '../../util/checkCommand'
import getCommand from '../../util/getCommand'
import React, {useEffect, useState, useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomAlert from '../home/CustomAlert'

function BottomNav () {
  const { dispatch, pdfPage, pdfZoom, editCatatan, currentCatatan, kodeKelas, daftarKelas } = useContext(AppContext)
  const [alertVisible, setAlertVisible] = useState(false);
  const [microphone, setMicrophone] = useState(true)
  const [command, setCommand] = useState([])
  const [myClass, setMyClass] = useState({})
  const [myCatatan, setMyCatatan] = useState({})
  const route = usePathname()


  const getData = async () => {
    const classData = await AsyncStorage.getItem('classes')
    const catatanData = await AsyncStorage.getItem('catatan')
    setMyClass(JSON.parse(classData))
    setMyCatatan(JSON.parse(catatanData))
  }
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
  const showAlert = () => {
    setAlertVisible(true)
  }

  const handleDismiss = () => {
    setAlertVisible(false)
  }

  useEffect(() => {
    getData()

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
      // If user if home pae
      if(route == '/'){
        if(checkCommand(getCommand('kodeKelas'), voice)){
          let kodeKelas = command[0].toLowerCase()
          kodeKelas = kodeKelas.replace('masukkan kode', '').replace('kelas', '')
          kodeKelas = kodeKelas.replace('valid', '').replace('falit', '').replace('pelit', '')
          kodeKelas = kodeKelas.replace(/\s/g, '').toUpperCase()
          dispatch({
            type: 'SET_KODE_KELAS',
            payload: {
              kode: kodeKelas
            }
          })
        } else if(checkCommand(getCommand('enterKode'), voice)){
          const semuaKelas = Object.values(daftarKelas ? daftarKelas : {}).map((item) => item[0])
          let submitKode = 'CLS-'+kodeKelas
          if(semuaKelas.includes(submitKode)){
            let newKelasKey = ''
            for(let key of Object.keys(daftarKelas)){
              if(daftarKelas[newKelasKey]){
                if(daftarKelas[newKelasKey][0] == submitKode){
                  break
                }
              }
              newKelasKey = key
            }
            let newKelas = daftarKelas[newKelasKey]
            let newMyClass = { ...myClass }
            newMyClass[newKelasKey] = newKelas
            AsyncStorage.setItem('classes', JSON.stringify(newMyClass))
            setMyClass(newMyClass)
            router.push(`/kelas/${newKelas[1]}`)
          } else {
            showAlert()
          }
        } else if(checkCommand(getCommand('masukKelas'), voice)){
          let namaKelas = command[0].toLowerCase()
          namaKelas = namaKelas.replace('masuk', '').replace('buka', '').replace('kelas', '')
          namaKelas = namaKelas.replace('valid', '').replace('falit', '').replace('pelit', '')
          namaKelas = namaKelas.trim().toLowerCase()
          if(daftarKelas.hasOwnProperty(namaKelas)){
            router.push(`/kelas/${daftarKelas[namaKelas].id}`)
          }
        }
      }

      // If user in modul page
      if(route == '/modul'){
        if(checkCommand(getCommand('openModul'), voice)){
          let modulRaw = command[0].toLowerCase()
          modulRaw = modulRaw.replace('buka', '').replace('lihat', '').replace('modul', '').replace('module', '')
          modulRaw = modulRaw.replace('valid', '').replace('falit', '').replace('pelit', '')
          modulRaw = modulRaw.trim().split(' ')
          let modulNumber = modulRaw[0]
          let modulName = modulRaw.slice(1).join(' ')
          console.log('Awal : ' + modulName)
          console.log('Modul number : ' + modulNumber)
          console.log('Modul name : ' + modulName)
          //router.push('/modul/baca')
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
        if(checkCommand(getCommand('openCatatan'), voice)){
          let catatanKode = command[0].toLowerCase()
          catatanKode = catatanKode.replace('buka', '').replace('lihat', '').replace('catatan', '')
          catatanKode = catatanKode.replace('valid', '').replace('falit', '').replace('pelit', '')
          catatanKode = catatanKode.replace(/\s/g, '').toUpperCase()
          console.log('Kode catatan : ' + catatanKode)
          if((myCatatan ? myCatatan : {}).hasOwnProperty(catatanKode)){
            router.push(`/catatan/edit/${catatanKode}`)
          } else {
            showAlert()
          }
        } else if(checkCommand(getCommand('createCatatan'), voice)){
          router.push('/catatan/edit/create')
        }
      }
      // If user in catatan edit page
      if(route.startsWith('/catatan/edit')){
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
          } else if(checkCommand(getCommand('deleteLastLine'), voice)){
            console.log(currentCatatan)
            let editedCatatan = currentCatatan.split("<br>")
            editedCatatan.pop()
            editedCatatan = editedCatatan.join("<br>")
            dispatch({
              type: 'SET_CATATAN',
              payload: {
                catatan: editedCatatan
              }
            })
          } else if(checkCommand(getCommand('createNewLine'), voice)){
            let editedCatatan = currentCatatan + '<br>'
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
      if(route == '/quiz'){
        if(checkCommand(getCommand('openQuiz'), voice)){
          let quizRaw = command[0].toLowerCase()
          quizRaw = quizRaw.replace('buka', '').replace('lihat', '').replace('quiz', '').replace('kuis', '')
          quizRaw = quizRaw.replace('valid', '').replace('falit', '').replace('pelit', '')
          quizRaw = quizRaw.trim().split(' ')
          let quizNumber = quizRaw[0]
          let quizName = quizRaw.slice(1).join(' ')
          console.log('Awal : ' + quizRaw)
          console.log('Quiz number : ' + quizNumber)
          console.log('Quiz name : ' + quizName)
          // route.push('/quiz/1)
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
      if(route.startsWith('/catatan/edit')){
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
      <CustomAlert
                message="Kode yang anda masukkan salah!"
                visible={alertVisible}
                onDismiss={handleDismiss}
            />
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
