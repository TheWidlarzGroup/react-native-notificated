import React from 'react'
import { Text } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { styles } from '../styles'

const { useNotifications } = createNotifications()

export const Info = () => {
  const { notify } = useNotifications()

  return (
    <Text
      style={[styles.text, styles.info]}
      onPress={() =>
        notify('info', {
          description:
            'This is where the toast text goes. This text have more than one line. If the multiline is set by default, only one line is visible. Depends on the number of lines, another text parts are visible. We can set even 100 lines. If the text takes only 1 line, then size of the notification will fit',
          title: 'Info',
          style: {
            titleSize: 22,
            titleColor: '#C71585',
            leftIconSource: require('../../assets/custom-info-icon-2.png'),
            multiline: 8,
            accentColor: '#C71585',
            borderWidth: 2,
          },
        })
      }>
      Emit info
    </Text>
  )
}
