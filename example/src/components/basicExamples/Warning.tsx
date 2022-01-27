import React from 'react'
import { Text } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { styles } from '../styles'

const { useNotifications } = createNotifications()

export const Warning = () => {
  const { notify } = useNotifications()

  return (
    <Text
      style={[styles.text, styles.warning]}
      onPress={() =>
        notify('warning', {
          description: 'This is where the toast text goes',
          title: 'Warning',
        })
      }>
      Emit warning
    </Text>
  )
}
