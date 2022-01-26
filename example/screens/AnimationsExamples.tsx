import React from 'react'
import { SafeAreaView } from 'react-native'
import {
  createNotifications,
  RotateInRotateOut,
  RotateZIn,
  SlideInLeftSlideOutRight,
  ZoomInDownZoomOutDown,
  ZoomInDownZoomOutUp,
} from 'react-native-notification'
import { styles } from './styles'
import { AnimationButton } from '../components/basicExamples/AnimationButton'

const { useNotifications, NotificationsProvider } = createNotifications()

export const AnimationsExamples = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <AnimationButton
        onPress={() =>
          notify('success', {
            ...baseNotifyConfig,
            notifyAnimationConfig: SlideInLeftSlideOutRight,
          })
        }
        buttonText="Slide In"
      />
      <AnimationButton
        onPress={() =>
          notify('success', {
            ...baseNotifyConfig,
            notifyAnimationConfig: ZoomInDownZoomOutUp,
          })
        }
        buttonText="Zoom In"
      />
      <AnimationButton
        onPress={() =>
          notify('success', {
            ...baseNotifyConfig,
            notifyAnimationConfig: ZoomInDownZoomOutDown,
          })
        }
        buttonText="Zoom In Bounce"
      />
      <AnimationButton
        onPress={() =>
          notify('success', {
            ...baseNotifyConfig,
            notifyAnimationConfig: RotateInRotateOut,
          })
        }
        buttonText="Rotate In"
      />
      <AnimationButton
        onPress={() =>
          notify('success', {
            ...baseNotifyConfig,
            notifyAnimationConfig: RotateZIn,
          })
        }
        buttonText="Rotate with 3D"
      />
    </SafeAreaView>
  )
}

const baseNotifyConfig = {
  description: 'Placeholder text',
  title: 'Showcase them animations!',
}
