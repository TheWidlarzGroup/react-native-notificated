import React from 'react'
import { SafeAreaView } from 'react-native'
import { styles } from './styles'
import { createNotifications } from 'react-native-notification'
import { SuccessButton } from '../components/basicExamples/SuccessButton'
import { ErrorButton } from '../components/basicExamples/ErrorButton'
import { WarningButton } from '../components/basicExamples/WarningButton'
import { InfoButton } from '../components/basicExamples/InfoButton'

const { useNotifications, NotificationsProvider } = createNotifications()

export const SingleCustomCases = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <SuccessButton
        onPress={() =>
          notify('success', {
            params: {
              description: 'Task has been completed without any error ',
              title: 'Action completed',
              style: {
                titleSize: 20,
                descriptionSize: 14,
                accentColor: '#7CFC00',
                borderType: 'accent',
                defaultIconType: 'monochromatic',
                multiline: 2,
              },
            },
          })
        }
      />
      <ErrorButton
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
        }
      />
      <WarningButton
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
        }
      />
      <InfoButton
        onPress={() =>
          notify('info', {
            params: {
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
            },
          })
        }
      />
    </SafeAreaView>
  )
}
