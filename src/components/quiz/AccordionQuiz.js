import { View, Text, StyleSheet } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native'
import { useEffect, useState } from 'react'
import AccordionQuizItem from './AccordionQuizItem'

const AccordionQuiz = ({data, title, passTotalQuiz, passTotalQuizDone}) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  useEffect(() => {
      passTotalQuiz(data.length)
      passTotalQuizDone(data.length)
  }, [])

  return (
    <Collapse onToggle={isExpanded => setIsCollapsed(isExpanded)} isExpanded={true}>
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
          let quiz = item.attributes
          return <AccordionQuizItem key={index} id={item.id} title={quiz.quiz_title} isDone={quiz.is_done} nilai={quiz.mark ? quiz.mark : 0} jumlah={10} />
        })}
      </CollapseBody>
    </Collapse>
  )
}

export default AccordionQuiz

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
