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
          params: {
            description:
              'All the css styles are now inactive. You can fix that by setting new values in your example',
            title: 'Warning',
            style: {
              defaultIconType: 'no-icon',
              borderType: 'no-border',
              multiline: 3,
            },
          },
        })
      }>
      Emit warning
    </Text>
  )
}
