import { View, Text, Image, ScrollView } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native'
import { useState } from 'react'
import AccordionQuizItem from './AccordionQuizItem'

const AccordionQuiz = ({data, title}) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <Collapse onToggle={isExpanded => setIsCollapsed(isExpanded)}>
      <CollapseHeader>
        <View
          style={{ zIndex: 10 }}
          className='flex flex-row items-center justify-between px-6 rounded-xl '
        >
          <Text className='text-xl text-black font-bold'>{title}</Text>
          <FontAwesome5Icon
            size={20}
            name={isCollapsed ? 'chevron-down' : 'chevron-up'}
            style={{ color: 'black' }}
          />
        </View>
      </CollapseHeader>
      <CollapseBody style={{ paddingHorizontal: 10 }}>
        {data.map((item, index) => (
          <AccordionQuizItem key={index} {...item} />
        ))}
      </CollapseBody>
    </Collapse>
  )
}

export default AccordionQuiz
