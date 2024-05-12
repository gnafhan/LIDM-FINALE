import { View, Text } from 'react-native'

import Layout from '../../src/layout/layout'
import { router } from 'expo-router'


export default function App () {
return (
  <Layout>
    <View
      onTouchStart={() => router.navigate('/quiz/1')}
      className='flex w-full bg-primary '
    >
      <Text>1</Text>
    </View>
  </Layout>
)

}
