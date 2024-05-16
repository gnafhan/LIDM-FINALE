import React from 'react'
import Layout from '../../../src/layout/layout'
import CurrentPage from '../../../src/components/kelas/CurrentPage'
import { RichEditor } from 'react-native-pell-rich-editor'
import { View } from 'react-native'

export default function App() {
  return (
    <Layout>
        <CurrentPage page={"Catatan"} />
        <View>
        <RichEditor
        initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
        />
        </View>
    </Layout>
  )
}
