import { View, Text } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { router, usePathname } from 'expo-router'
import Voice from '@react-native-voice/voice'
import React, {useEffect, useState} from 'react'

function BottomNav () {
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

  const checkCommand = (command, voice) => {
    for(let cmd of command){
      if(voice.includes(cmd)){
        return true;
      }
    }
    return false
  }

  const changePage = () => {
    let voice = command.join(" ")
    let validCommand = ["valid", "falit", "pelit"]
    let gantiCommand = ["ganti halaman", "ke halaman", "pindah halaman", "halaman"]
    let backCommand = ["kembali", "back", "bek", "sebelumnya", "bag", "bad", "balik"]
    let halamanCommand = {
      "home": ["beranda", "home", "hom"],
      "modul": ["modul", "baca modul", "buku", "baca buku"],
      "catatan": ["mencatat", "catatan"],
      "quiz": ["quiz", "kuis"],
    }
    
    if(checkCommand(validCommand, voice)){
      if(checkCommand(gantiCommand, voice)){
        if(checkCommand(halamanCommand["modul"], voice)){
          router.push("/modul/baca")
        } else  if(checkCommand(halamanCommand["catatan"], voice)){
          router.push("/catatan")
        } else if(checkCommand(halamanCommand["quiz"], voice)){
          router.push("/quiz")
        } else if(checkCommand(halamanCommand["home"], voice)){
          router.push("/")
        } else if(checkCommand(backCommand, voice)){
          router.back()
        } else {
          //startSpeech()
        }
      } else if(checkCommand(backCommand, voice)){
        router.back()
      } else {
        //startSpeech()
      }
    }
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
    changePage()
    console.log(command)
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
                  onTouchStart={toggleMicrophone}
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
                onTouchStart={() => {
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
    path: '/modul/baca',
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
