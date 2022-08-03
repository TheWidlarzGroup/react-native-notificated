import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNotifications } from 'react-native-notificated'
import { Button } from '../components/Button'

export const DefaultExamples = () => {
  const { notify } = useNotifications()
  return (
    <>
      <View style={s.container}>
        <Button
          variant="success"
          onPress={() =>
            notify('success', {
              params: { title: 'Hellooooo!', description: 'Some text goes here...' },
            })
          }
        />
        <Button
          variant="error"
          onPress={() =>
            notify('error', { params: { title: 'Hello!', description: 'Some text goes here...' } })
          }
        />
        <Button
          variant="warning"
          onPress={() =>
            notify('warning', {
              params: { title: 'Hello!', description: 'Some text goes here...' },
            })
          }
        />
        <Button
          variant="info"
          onPress={() =>
            notify('info', { params: { title: 'Hello!', description: 'Some text goes here...' } })
          }
        />
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
