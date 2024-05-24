import { View, Text, StyleSheet, Keyboard, Dimensions } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { router, usePathname } from 'expo-router'
import Voice from '@react-native-voice/voice'
import checkCommand from '../../util/checkCommand'
import getCommand from '../../util/getCommand'
import React, {useEffect, useState, useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomAlert from '../home/CustomAlert'
import AudioWave from './AudioWave'
import PanduanAlert from '../home/PanduanAlert'
import generateRandomId from '../../util/generateRandomId'

function BottomNav () {
  const { dispatch, pdfPage, pdfZoom, editCatatan, currentCatatan, kodeKelas, daftarKelas, currentJawaban, daftarJawaban, changeQuizNumber } = useContext(AppContext)
  const [alertVisible, setAlertVisible] = useState(false)
  const [microphone, setMicrophone] = useState(true)
  const [command, setCommand] = useState([])
  const [myClass, setMyClass] = useState({})
  const [myCatatan, setMyCatatan] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [commandStatus, setCommandStatus] = useState('netral')
  const route = usePathname()
  const screenWidth = Dimensions.get('window').width
  const commandColor = {
    'netral': 'black',
    'wrong': '#ff304f',
    'correct': '#22eaaa'
  }
  const getNumberOfLines = (teks, fontSize = 18) => {
    return Math.floor((teks.length * fontSize) / screenWidth)
  }

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

    if(checkCommand(getCommand('valid'), command[0] ? command[0].replace('-', '').trim() : '')){
      setIsValid(true)
      setCommandStatus('netral')
    }
    if(isValid){
      // If user if home page
      setCommandStatus('wrong')
      if(checkCommand(getCommand('stop'), command[0] ? command[0].replace('-', '').trim() : '')){
        setIsValid(false)
      }
      if(route == '/'){
        if(checkCommand(getCommand('kodeKelas'), voice)){
          setCommandStatus('correct')
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
          setCommandStatus('correct')
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
          setCommandStatus('correct')
          let namaKelas = command[0].toLowerCase()
          namaKelas = namaKelas.replace('masuk', '').replace('buka', '').replace('kelas', '')
          namaKelas = namaKelas.replace('valid', '').replace('falit', '').replace('pelit', '')
          namaKelas = namaKelas.trim().toLowerCase()
          if(daftarKelas.hasOwnProperty(namaKelas)){
            console.log(daftarKelas[namaKelas])
            router.push(`/kelas/${daftarKelas[namaKelas][1]}`)
          }
        } else if(checkCommand(getCommand('openPanduan'), voice)){
          setCommandStatus('correct')
          dispatch({
            type: 'SET_SHOW_PANDUAN',
            payload: {
              show: 'show' + generateRandomId(4)
            }
          })
        } else if(checkCommand(getCommand('nextNumber'), voice)){
          setCommandStatus('correct')
          dispatch({
            type: 'SET_NOMOR_PANDUAN',
            payload: {
              panduanNumber: 'next' + generateRandomId(4)
            }
          })
        } else if(checkCommand(getCommand('previousNumber'), voice)){
          setCommandStatus('correct')
          dispatch({
            type: 'SET_NOMOR_PANDUAN',
            payload: {
              panduanNumber: 'previous' + generateRandomId(4)
            }
          })
        } else if(checkCommand(getCommand('skipNumber'), voice)){
          setCommandStatus('correct')
          dispatch({
            type: 'SET_NOMOR_PANDUAN',
            payload: {
              panduanNumber: 'skip' + generateRandomId(4)
            }
          })
        }  else if(checkCommand(getCommand('close'), voice)){
          setCommandStatus('correct')
          dispatch({
            type: 'SET_NOMOR_PANDUAN',
            payload: {
              panduanNumber: 'close' + generateRandomId(4)
            }
          })
        } else {
          setCommandStatus('wrong')
        }
      }

      // If user in modul page
      if((route == '/modul') || (route.startsWith('/kelas/'))){
        if(checkCommand(getCommand('openModul'), voice)){
          setCommandStatus('correct')
          let modulRaw = command[0].toLowerCase()
          modulRaw = modulRaw.replace('buka', '').replace('lihat', '').replace('modul', '').replace('module', '')
          modulRaw = modulRaw.replace('valid', '').replace('falit', '').replace('pelit', '')
          modulRaw = modulRaw.trim().split(' ')
          let modulNumber = modulRaw[0]
          let modulName = modulRaw.slice(1).join(' ')
          router.push(`/modul/${modulNumber}`)
        } else {
          setCommandStatus('wrong')
        }
      }
      // If user in baca modul page
      if(route.startsWith('/modul/')){
        if(checkCommand(getCommand('scroll'), voice)){
            setCommandStatus('correct')
            if(checkCommand(getCommand('scrollNaik'), voice)){
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
                dispatch({
                    type: 'SCROLL_PAGE',
                    payload: {
                        number: pdfPage+1
                    }
                })
            }
          } else if(checkCommand(getCommand('zoomIn'), voice)){
            setCommandStatus('correct')
            dispatch({
                type: 'ZOOM_PAGE',
                payload: {
                    zoom: pdfZoom + 0.05
                }
            })
          } else if(checkCommand(getCommand('zoomOut'), voice)){
            setCommandStatus('correct')
            dispatch({
                type: 'ZOOM_PAGE',
                payload: {
                    zoom: pdfZoom - 0.05
                }
            })
          } else {

          }
      } 

      // If user in catatan page
      if(route == '/catatan'){
        if(checkCommand(getCommand('openCatatan'), voice)){
          setCommandStatus('correct')
          let catatanKode = command[0].toLowerCase()
          catatanKode = catatanKode.replace('buka', '').replace('lihat', '').replace('catatan', '')
          catatanKode = catatanKode.replace('valid', '').replace('falit', '').replace('pelit', '')
          catatanKode = catatanKode.replace(/\s/g, '').toUpperCase()
          if((myCatatan ? myCatatan : {}).hasOwnProperty(catatanKode)){
            router.push(`/catatan/edit/${catatanKode}`)
          } else {
            showAlert()
          }
        } else if(checkCommand(getCommand('createCatatan'), voice)){
          setCommandStatus('correct')
          router.push('/catatan/edit/create')
        } else {
          
        }
      }
      // If user in catatan edit page
      if(route.startsWith('/catatan/edit')){
        if(checkCommand(getCommand('startEdit'), voice)){
          setCommandStatus('correct')
          dispatch({
            type: 'EDIT_CATATAN',
            payload: {
              edit: true
            }
          })
        }
        if(checkCommand(getCommand('stopEdit'), voice)){
          setCommandStatus('correct')
          dispatch({
            type: 'EDIT_CATATAN',
            payload: {
              edit: false
            }
          })
        }
        if(editCatatan){
          if(checkCommand(getCommand('backspace'), voice)){
            setCommandStatus('correct')
            let editedCatatan = currentCatatan.slice(0, -1)
            dispatch({
              type: 'SET_CATATAN',
              payload: {
                catatan: editedCatatan
              }
            })
          } else if(checkCommand(getCommand('deleteLastWord'), voice)){
            setCommandStatus('correct')
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
            setCommandStatus('correct')
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
            setCommandStatus('correct')
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
            setCommandStatus('correct')
            let editedCatatan = currentCatatan + '<br>'
            dispatch({
              type: 'SET_CATATAN',
              payload: {
                catatan: editedCatatan
              }
            })
          } else {
            
          }
        }
      }

      // If user in quiz page
      if((route == '/quiz') || (route.startsWith('/kelas/'))){
        if(checkCommand(getCommand('openQuiz'), voice)){
          setCommandStatus('correct')
          let quizRaw = command[0].toLowerCase()
          quizRaw = quizRaw.replace('buka', '').replace('lihat', '').replace('quiz', '').replace('kuis', '').replace('mulai', '')
          quizRaw = quizRaw.replace('valid', '').replace('falit', '').replace('pelit', '')
          quizRaw = quizRaw.trim().split(' ')
          let quizNumber = quizRaw[0]
          router.push('/quiz/' + quizNumber)
        } else {
          setCommandStatus('wrong')
        }
      }
      if(route.startsWith('/quiz/')){
        if(changeQuizNumber == 'submit'){
          if(command[0]){
            if((command[0] != 'valid valid') && (command[0] != 'pelit pelit') && (command[0] != 'balik balik') && (command[0] != 'balik-balik') && (command[0] != 'cancel') && (command[0] != 'batalkan') && (command[0] != 'submit') && (command[0] != 'kirim')){
              if(command[0] == 'hapus kata terakhir'){
                dispatch({
                  type: 'SET_NAMA',
                  payload: {
                    nama: command[0] + generateRandomId(4)
                  }
                })
              } else {
                dispatch({
                  type: 'SET_NAMA',
                  payload: {
                    nama: command[0]
                  }
                })
              }
            }
          }
        }
        if(checkCommand(getCommand('pilihJawaban'), voice)){
          setCommandStatus('correct')
          let jawabRaw = command[0].toLowerCase()
          jawabRaw = jawabRaw.replace('pilih', '').replace('jawab', '').replace('jawaban', '')
          jawabRaw = jawabRaw.replace('valid', '').replace('falit', '').replace('pelit', '')
          jawabRaw = jawabRaw.trim().split(' ')
          let jawabanUser = jawabRaw[jawabRaw.length - 1].toUpperCase()
          if(['A', 'B', 'C', 'D', 'E', 'F'].includes(jawabanUser)){
            if(currentJawaban.hasOwnProperty(jawabanUser)){
              let currentQuizId = route.split("/")
              currentQuizId = currentQuizId[currentQuizId.length - 1]
              let newDaftarJawaban = { ...daftarJawaban }
              newDaftarJawaban[currentQuizId][currentJawaban['questionNo'] - 1] = currentJawaban[jawabanUser]
              dispatch({
                type: 'SET_DAFTAR_JAWABAN',
                payload: {
                  daftarJawaban: newDaftarJawaban
                }
              })
            }
          }
        } else if(checkCommand(getCommand('nextNumber'), voice)){
          setCommandStatus('correct')
          dispatch({
            type: 'SET_NOMOR_KUIS',
            payload: {
              quizNumber: 'next'
            }
          })
        } else if(checkCommand(getCommand('previousNumber'), voice)){
          setCommandStatus('correct')
          dispatch({
            type: 'SET_NOMOR_KUIS',
            payload: {
              quizNumber: 'previous'
            }
          })
        } else if(checkCommand(getCommand('toNumber'), voice)){
          setCommandStatus('correct')
          let nomor = command[0].split(" ")
          nomor = nomor[nomor.length - 1].trim()
          if(!isNaN(nomor)){
            dispatch({
              type: 'SET_NOMOR_KUIS',
              payload: {
                quizNumber: nomor
              }
            })
          }
        } else if(checkCommand(getCommand('enterKode'), voice)){
          setCommandStatus('correct')
          if(changeQuizNumber != 'submit'){
            dispatch({
              type: 'SET_NOMOR_KUIS',
              payload: {
                quizNumber: 'submit'
              }
            })
          } else {
            dispatch({
              type: 'SET_NOMOR_KUIS',
              payload: {
                quizNumber: 'submitFinal'
              }
            })
          }
        } else if(checkCommand(getCommand('cancel'), voice)){
          setCommandStatus('correct')
          dispatch({
            type: 'SET_NOMOR_KUIS',
            payload: {
              quizNumber: 'cancel'
            }
          })
        } else {
            setCommandStatus('wrong')
        }
      }
      
      // Change page
      if(checkCommand(getCommand('gantiHalaman'), voice)){
        if(checkCommand(getCommand('halaman', 'modul'), voice)){
            setCommandStatus('correct')
            router.push("/modul")
        } else  if(checkCommand(getCommand('halaman', 'catatan'), voice)){
            setCommandStatus('correct')
            router.push("/catatan")
        } else if(checkCommand(getCommand('halaman', 'quiz'), voice)){
            setCommandStatus('correct')
            router.push("/quiz")
        } else if(checkCommand(getCommand('halaman', 'home'), voice)){
            setCommandStatus('correct')
            router.push("/")
        } else if(checkCommand(getCommand('back'), voice)){
            setCommandStatus('correct')
            router.back()
        } else {
          if(!checkCommand(getCommand('scroll'), voice)){
            setCommandStatus('wrong')
          }
        }
      } else if(checkCommand(getCommand('back'), voice)){
        setCommandStatus('correct')
        router.back()
      } else {

      } 
       
    } else {
      if(route.startsWith('/catatan/edit')){
        if(editCatatan){
          if(command[0]){
            if((command[0] != 'valid valid') && (command[0] != 'pelit pelit') && (command[0] != 'balik balik') && (command[0] != 'balik-balik')){
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
    }

  }, [command])

  return (
    <View style={{
      display: route.startsWith('/quiz/') ? 'block' : 'flex',
      flex: route.startsWith('/quiz/') ? 0 : 1
    }}>
      <View 
        style={{
          display: isValid ? 'inline-flex' : 'none',
          transform: [{translateY: ((route == '/') || (route == '/modul')) ? -80 : ((route == '/catatan') || (route.startsWith('/kelas'))) ? -120 : (route == '/quiz') ? 100 : (route.startsWith('/modul/')) ? -210 : (route.startsWith('/catatan/edit')) ? (Keyboard.isVisible() ? (200 - getNumberOfLines(currentCatatan) * 22): (480 - getNumberOfLines(currentCatatan) * 31)) : (route.startsWith('/quiz/') ? -40 : -80)}]
        }} 
        className='bg-white h-[300px] rounded-t-2xl animate-bounce py-8 px-5 items-center '
      >
        <Text style={[{color: ((command[0] == 'valid valid') || (command[0] == 'pelit pelit') || (command[0] == 'balik balik') || (command[0] == 'balik-balik')) ? commandColor['netral'] : commandColor[commandStatus]}, styles.bold]} className='text-lg'>{((command[0] == 'valid valid') || (command[0] == 'pelit pelit') || (command[0] == 'balik balik') || (command[0] == 'balik-balik')) ? 'Ucapkan perintah anda!' : command[0]}</Text>
        <View className='m-10'>
          <AudioWave />
        </View>
      </View>
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
                  style={styles.regular}
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