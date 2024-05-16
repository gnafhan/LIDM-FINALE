import { View, Text, Image, ScrollView } from 'react-native'
import Layout from '../../../src/layout/layout'
import pdf_icon from '../../../assets/pdf-icon.png'
import { useState } from 'react'

const fileIcon = {
    'pdf': pdf_icon
}

const FileNameBar = ({type, title}) => {
    return (
        <View className='w-80 translate-y-4 z-10 flex-row justify-center items-center bg-[#FFF] mx-auto py-2 rounded-full'>
            <Image className='mr-2' source={fileIcon[type]} alt='icon' />
            <Text className='text-normal'>{ title }</Text>
        </View>
    )
}

export default FileNameBar