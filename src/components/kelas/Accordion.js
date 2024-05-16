import { Text, View } from 'react-native'
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useState } from 'react'
import { AccordionItem } from './AccordionItem'

export const Accordion = ({ data, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  data = data || [1, 2, 3, 4, 5]
  return (
    <Collapse
      onToggle={isExpanded => setIsCollapsed(isExpanded)}
      style={{ marginTop: 10 }}
    >
      <CollapseHeader>
        <View
          style={{ zIndex: 10 }}
          className='flex flex-row items-center justify-between px-3 py-3 rounded-xl bg-primary'
        >
          <Text className='text-xl text-white'>{title}</Text>
          <FontAwesome5Icon
            size={20}
            name={isCollapsed ? 'chevron-down' : 'chevron-up'}
            style={{ color: 'white' }}
          />
        </View>
      </CollapseHeader>
      <CollapseBody>
        <View className='flex flex-col w-full px-0 py-3 mt-3 bg-white rounded-xl'>
          {data.length > 0 ? (
            data.map((item, index) => (
              <AccordionItem  name={'aaa'} key={index} />
            ))
          ) : (
            <View className='flex w-full h-[50vh] justify-center items-center'>
              <Text className='text-lg text-center '>Data tidak ditemukan</Text>
            </View>
          )}
        </View>
      </CollapseBody>
    </Collapse>
  )
}
