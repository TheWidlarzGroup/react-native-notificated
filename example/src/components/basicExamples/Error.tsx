import React from 'react'
import { Text } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { styles } from '../styles'

const { useNotifications } = createNotifications()

export const Error = () => {
  const { notify } = useNotifications()

  return (
    <Text
      style={[styles.text, styles.error]}
      onPress={() =>
        notify('error', {
          description: 'This is where the toast text goes. ',
          title: 'Error',
        })
      }>
      Emit error
    </Text>
  )
}
