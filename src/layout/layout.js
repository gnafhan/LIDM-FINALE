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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

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
    <SafeAreaView className={`relative flex h-full px-4 ${className}`}>
      <QueryClientProvider client={queryClient} >
      {children}
      <BottomNav />
      </QueryClientProvider>
    </SafeAreaView>
  )
}

export default Layout
