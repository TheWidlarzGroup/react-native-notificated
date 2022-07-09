import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { DefaultExamples } from './src/screens/DefaultExamples'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <DefaultExamples />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
