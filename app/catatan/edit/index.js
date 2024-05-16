import React from 'react'
import Layout from '../../../src/layout/layout'
import CurrentPage from '../../../src/components/kelas/CurrentPage'
import { View } from 'react-native'
import CatatanEditor from '../../../src/components/catatan/CatatanEditor'

export default function App() {
  return (
    <Layout>
        <CurrentPage page={"Catatan"} />
          <View>
            <CatatanEditor />
        </View>
    </Layout>
  )
}
