import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '../components/Button'
import { useNotificationController, useNotifications } from '../../../src/index'

export const DefaultExamples = () => {
  const { notify } = useNotifications()
  const { remove } = useNotificationController()
  return (
    <>
      <View style={s.container}>
        <Button
          variant="error"
          onPress={() =>
            notify('error', {
              params: { title: 'Hello!', description: 'Notification text goes here' },
            })
          }
        />
        <Button
          variant="success"
          onPress={() =>
            notify('success', {
              params: { title: 'Hello!', description: 'Notification text goes here' },
            })
          }
        />
        <Button
          variant="warning"
          onPress={() =>
            notify('warning', {
              params: { title: 'Hello!', description: 'Notification text goes here' },
            })
          }
        />
        <Button
          variant="info"
          onPress={() =>
            notify('info', {
              params: { title: 'Hello!', description: 'Notification text goes here' },
            })
          }
        />{' '}
        <Button variant="primary" title="Remove notification" onPress={() => remove()} />
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
