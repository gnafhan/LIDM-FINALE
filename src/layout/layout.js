import React from 'react'
import { SafeAreaView } from 'react-native'
import BottomNav from '../components/global/BottomNav'
import { useFonts } from 'expo-font'
import {
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular
} from '@expo-google-fonts/poppins'
import Loading from '../components/global/Loading'
import { AppProvider } from '../context/AppContext'

function Layout ({ children, className }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold
  })
  if (!fontsLoaded) {
    return <Loading />
  }
  return (
    <AppProvider>
      <SafeAreaView className={`relative flex h-full px-4 ${className}`}>
        {children}
        <BottomNav />
      </SafeAreaView>
    </AppProvider>
  )
}

export default Layout
