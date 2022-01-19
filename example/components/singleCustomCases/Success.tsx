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
          titleSize: 20,
          descriptionSize: 14,
          accentColor: '#7CFC00',
          borderType: 'accent',
          defaultIconType: 'monochromatic',
          multiline: 2,
        })
      }>
      Emit success
    </Text>
  )
}
