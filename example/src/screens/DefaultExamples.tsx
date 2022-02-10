import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import {
  createNotifications,
  SlideInLeftSlideOutRight,
  useNotificationController,
} from 'react-native-notification'
import { SuccessButton } from '../components/basicExamples/SuccessButton'
import { ErrorButton } from '../components/basicExamples/ErrorButton'
import { WarningButton } from '../components/basicExamples/WarningButton'
import { InfoButton } from '../components/basicExamples/InfoButton'
import { ModifyButton } from '../components/basicExamples/ModifyButton'
import { RemoveButton } from '../components/basicExamples/RemoveButton'
import { styles } from './styles'

const { useNotifications, NotificationsProvider } = createNotifications({
  defaultNotificationTime: 3000,
  defaultNotificationTimeLong: 5000,
  notificationPosition: 'top',
  notificationMsgLengthTimerThreshold: 100,
  animationConfig: SlideInLeftSlideOutRight,
  isNotch: true,
  defaultStylesSettings: {
    darkMode: false,
    globalConfig: {
      titleSize: 20,
      titleColor: '#4B0082',
      descriptionSize: 12,
      descriptionColor: '#4B0082',
      bgColor: '#FFFFF0',
      borderType: 'accent',
      borderRadius: 25,
      accentColor: '#B0E0E6',
      borderWidth: 3,
      multiline: 5,
      defaultIconType: 'color',
      leftIconSource: require('../../assets/custom-icon.png'),
    },
    successConfig: {
      titleSize: 18,
      titleColor: '#4B0082',
      descriptionSize: 11,
      descriptionColor: '#4B0082',
      bgColor: '#FFFFF0',
      borderType: 'accent',
      borderRadius: 25,
      accentColor: '#B0E0E6',
      borderWidth: 3,
      multiline: 5,
      defaultIconType: 'color',
      leftIconSource: require('../../assets/custom-icon.png'),
    },
    errorConfig: {
      titleSize: 16,
      titleColor: '#4B0082',
      descriptionSize: 10,
      descriptionColor: '#4B0082',
      bgColor: '#FFFFF0',
      borderType: 'accent',
      borderRadius: 25,
      accentColor: '#B0E0E6',
      borderWidth: 3,
      multiline: 5,
      defaultIconType: 'color',
      leftIconSource: require('../../assets/custom-icon.png'),
    },
    warningConfig: {
      titleSize: 14,
      titleColor: '#4B0082',
      descriptionSize: 9,
      descriptionColor: '#4B0082',
      bgColor: '#FFFFF0',
      borderType: 'accent',
      borderRadius: 25,
      accentColor: '#B0E0E6',
      borderWidth: 3,
      multiline: 5,
      defaultIconType: 'color',
      leftIconSource: require('../../assets/custom-icon.png'),
    },
    infoConfig: {
      titleSize: 22,
      titleColor: '#4B0082',
      descriptionSize: 16,
      descriptionColor: '#4B0082',
      bgColor: '#FFFFF0',
      borderType: 'accent',
      borderRadius: 25,
      accentColor: '#B0E0E6',
      borderWidth: 3,
      multiline: 5,
      defaultIconType: 'color',
      leftIconSource: require('../../assets/custom-icon.png'),
    },
  },
})

export const DefaultExamples = () => {
  const [id, setId] = useState('')
  const { notify } = useNotifications()
  const { remove, modify } = useNotificationController()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <SuccessButton
        onPress={() =>
          setId(
            notify('success', {
              params: {
                description: 'This is where the toast text goes',
                title: 'Success',
              },
              config: {
                notificationPosition: 'center',
              },
            }).id
          )
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
      <ModifyButton
        onPress={() =>
          modify(id, {
            params: {
              params: { id: id, title: 'Modified title', description: 'Modified description' },
            },
          })
        }
      />
      <RemoveButton onPress={() => remove(id)} />
    </SafeAreaView>
  )
}
