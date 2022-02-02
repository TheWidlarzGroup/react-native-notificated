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
          params: {
            description: 'This error may damage your system. ',
            title: 'Integration error',
            style: {
              titleSize: 25,
              titleColor: '#FF0000',
              descriptionSize: 12,
              accentColor: '#FF0000',
              borderType: 'accent',
              defaultIconType: 'no-icon',
            },
          },
        })
      }>
      Emit error
    </Text>
  )
}
