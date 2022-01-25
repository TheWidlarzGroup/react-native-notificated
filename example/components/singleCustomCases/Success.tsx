import React from 'react'
import { Text } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { styles } from '../styles'

const { useNotifications } = createNotifications()

export const Success = () => {
  const { notify } = useNotifications()

  return (
    <Text
      style={[styles.text, styles.success]}
      onPress={() =>
        notify('success', {
          description: 'Task has been completed without any error ',
          title: 'Action completed',
          style: {
            defaultIconType: 'no-icon',
          },
        })
      }>
      Emit success
    </Text>
  )
}
