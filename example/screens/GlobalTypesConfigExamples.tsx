import React from 'react'
import { SafeAreaView } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { SuccessButton } from '../components/basicExamples/SuccessButton'
import { ErrorButton } from '../components/basicExamples/ErrorButton'
import { WarningButton } from '../components/basicExamples/WarningButton'
import { InfoButton } from '../components/basicExamples/InfoButton'
import { styles } from './styles'

const { useNotifications, NotificationsProvider } = createNotifications({
  defaultStylesSettings: {
    successConfig: {
      leftIconSource: require('../assets/custom-success-icon.png'),
      titleSize: 15,
      titleColor: '#006400',
      descriptionSize: 12,
      descriptionColor: '#006400',
      bgColor: '#F5F5F5',
      borderRadius: 5,
      accentColor: '#7FFF00',
      borderWidth: 2,
    },
    errorConfig: {
      leftIconSource: require('../assets/custom-error-icon.png'),
      titleSize: 18,
      titleColor: '#8B0000',
      descriptionSize: 12,
      bgColor: '#DEB887',
      borderRadius: 15,
      accentColor: '#8B0000',
    },
    warningConfig: {
      leftIconSource: require('../assets/custom-warning-icon.png'),
      titleSize: 20,
      titleColor: '#fff',
      descriptionSize: 14,
      descriptionColor: '#fff',
      bgColor: '#191970',
      borderRadius: 10,
      accentColor: '#FF8C00',
      borderWidth: 3,
      multiline: 3,
    },
    infoConfig: {
      leftIconSource: require('../assets/custom-info-icon.png'),
      titleSize: 20,
      titleColor: '#1E90FF',
      descriptionSize: 14,
      descriptionColor: '#1E90FF',
      borderWidth: 0,
      multiline: 4,
    },
  },
})

export const GlobalTypesConfigExamples = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <SuccessButton
        onPress={() =>
          notify('success', {
            params: {
              description: 'This is where the toast text goes',
              title: 'Success',
            },
          })
        }
      />
      <ErrorButton
        onPress={() =>
          notify('error', {
            params: {
              description: 'This is where the toast text goes. ',
              title: 'Error',
            },
          })
        }
      />
      <WarningButton
        onPress={() =>
          notify('warning', {
            params: {
              description: 'This is where the toast text goes',
              title: 'Warning',
            },
          })
        }
      />
      <InfoButton
        onPress={() =>
          notify('info', {
            params: {
              description: 'This is where the toast text goes.',
              title: 'Info',
            },
          })
        }
      />
    </SafeAreaView>
  )
}
