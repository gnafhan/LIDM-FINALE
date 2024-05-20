import React, { useEffect } from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'

const CustomAlert = ({ message, visible, onDismiss }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onDismiss()
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [visible, onDismiss])

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onDismiss}
        >
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)'}} className='flex-1 justify-center items-center'>
                <View className='max-w-[80vh] p-5 bg-white rounded-xl items-center'>
                    <Text style={styles.regular} className='text-base'>{message}</Text>
                </View>
            </View>
        </Modal>
    )
}

export default CustomAlert

const styles = StyleSheet.create({
    medium: {
      fontFamily: 'Poppins_500Medium'
    },
    regular: {
      fontFamily: 'Poppins_400Regular'
    }
  })
