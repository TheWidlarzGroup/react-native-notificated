import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import {
  createNotifications,
  ZoomIn,
  MoveDown,
  ZoomInDownZoomOutDown,
  MoveUp,
  ZoomInDownZoomOutUp,
  SlideInLeft,
  SlideInLeftSlideOutRight,
  RotateZIn,
  FadeIn,
} from 'react-native-notificated'
import { SuccessButton } from '../components/basicExamples/SuccessButton'
import { ErrorButton } from '../components/basicExamples/ErrorButton'
import { WarningButton } from '../components/basicExamples/WarningButton'
import { InfoButton } from '../components/basicExamples/InfoButton'
import { ModifyButton } from '../components/basicExamples/ModifyButton'
import { RemoveButton } from '../components/basicExamples/RemoveButton'
import { styles } from './styles'

const { useNotifications, NotificationsProvider } = createNotifications({
  isNotch: true,
  notificationPosition: 'top',
  defaultStylesSettings: {
    errorConfig: {
      notificationPosition: 'bottom',
    },
  },
})

export const DefaultExamples = () => {
  const { notify, remove, modify } = useNotifications()
  const [id, setId] = useState('')
  const test = SlideInLeftSlideOutRight.add(MoveDown)
    .add(FadeIn)
    .transitionInStylesQueue.map((a) => {
      return {
        x: a({ value: 1 }),
      }
    })

  console.log({
    tutaj: SlideInLeftSlideOutRight.add(MoveDown).add(FadeIn).transitionInStyles({ value: 1 })
      .transform,
  })
  console.log({ tutajjjjj: test[0] })
  console.log(MoveDown.add(FadeIn).transitionOutStyles?.({ value: 1 }))

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
                animationConfig: SlideInLeftSlideOutRight.add(MoveDown).add(FadeIn),
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
            config: {
              duration: 2000,
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
            config: {
              notificationPosition: 'bottom',
            },
          })
        }
      />

      <ModifyButton
        onPress={() =>
          modify(id, {
            params: { title: 'Modified title', description: 'Modified description' },
          })
        }
      />

      <RemoveButton onPress={() => remove(id)} />
    </SafeAreaView>
  )
}
