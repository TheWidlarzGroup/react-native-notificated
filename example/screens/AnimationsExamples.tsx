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
import { generateAnimationConfig } from '../../src/core/generateAnimationConfig'
import { Easing } from 'react-native-reanimated'

const { useNotifications, NotificationsProvider } = createNotifications()

const customFadeInFadeOut = generateAnimationConfig({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 700,
      easing: Easing.inOut(Easing.sin),
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const translateX = 0

    return {
      opacity: progress.value,
      transform: [{ translateX }],
    }
  },
  transitionOutStyles: (progress) => {
    'worklet'

    const translateX = 0

    return {
      opacity: progress.value,
      transform: [{ translateX }],
    }
  },
})

export const AnimationsExamples = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <AnimationButton
        onPress={() =>
          notify('success', {
            ...baseNotifyConfig,
            notifyAnimationConfig: customFadeInFadeOut,
          })
        }
        buttonText="Fade In"
      />
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
