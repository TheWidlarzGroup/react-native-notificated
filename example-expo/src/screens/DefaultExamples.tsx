import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '../components/Button'

export const DefaultExamples = () => {
  return (
    <>
      <View style={s.container}>
        <Button variant="error" onPress={() => {}} />
        <Button variant="success" onPress={() => {}} />
        <Button variant="warning" onPress={() => {}} />
        <Button variant="info" onPress={() => {}} />
      </View>
    </>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
})
