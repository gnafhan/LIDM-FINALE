import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native'
import { useState, useContext } from 'react'
import AccordionItemModul from './AccordionItemModul'
import { useQuery } from '@tanstack/react-query'
import fetchModul from '../../util/modul/fetchModul'
import Loading from '../global/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AccordionModul = ({myModules, title, doneModules}) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const {isPending, isError, data, error} = useQuery({queryKey: ['modul'], queryFn: fetchModul})

    if (isPending) {
        return(
          <Loading/>
        )
    }
    if (isError) {
        console.log(error)
        return (
          <View className='flex w-full h-[50vh] justify-center items-center'>
            <Text style={styles.regular} className='text-lg text-center '>
              {error.message}
            </Text>
          </View>
        )
    }

  return (
    <Collapse style={{marginTop: 10}} onToggle={isExpanded => setIsCollapsed(isExpanded)} isExpanded={true}>
      <CollapseHeader>
        <View
          style={{ zIndex: 10 }} 
          className='flex flex-row items-center justify-between px-6 rounded-xl '
        >
          <Text style={styles.bold} className='text-xl text-black'>{title}</Text>
          <FontAwesome5Icon
            size={20}
            name={isCollapsed ? 'chevron-down' : 'chevron-up'}
            style={{ color: 'black' }}
          />
        </View>
      </CollapseHeader>
      <CollapseBody style={{ paddingHorizontal: 10 }}>
        {data.map((item, index) => {
            if(myModules.includes(item.id)){
              let is_done = false
              if(doneModules[item.id]){
                if(doneModules[item.id]["is_done"] == true){
                  is_done = true
                }
              } else {
                let newDoneModules = {...doneModules}
                newDoneModules[item.id] = {is_done: false}
                AsyncStorage.setItem("modules", JSON.stringify(newDoneModules))
              }
              return <AccordionItemModul key={index} id={item.id} source={item.attributes.file.data.attributes.url} title={item.attributes.module_title} isDone={is_done} tanggal={new Date(item.attributes.createdAt)} />
            }
        })}
      </CollapseBody>
    </Collapse>
  )
}

export default AccordionModul

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