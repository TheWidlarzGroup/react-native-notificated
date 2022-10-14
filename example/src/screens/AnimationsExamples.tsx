import React from 'react'
import { SafeAreaView } from 'react-native'
import {
  createNotifications,
  RotateZIn,
  SlideInLeftSlideOutRight,
  ZoomInDownZoomOutDown,
  ZoomInDownZoomOutUp,
} from 'react-native-notificated'
import { styles } from './styles'
import { AnimationButton } from '../components/basicExamples/AnimationButton'
import { Easing } from 'react-native-reanimated'
import { generateAnimationConfig } from '../../../src/core/utils/generateAnimationConfig'

const { useNotifications, NotificationsProvider } = createNotifications({
  isNotch: true,
})

const CustomFadeInFadeOut = generateAnimationConfig({
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
            params: {
              ...baseNotifyConfig,
            },
            config: {
              animationConfig: CustomFadeInFadeOut,
            },
          })
        }
        buttonText="Fade In"
      />
      <AnimationButton
        onPress={() =>
          notify('success', {
            params: {
              ...baseNotifyConfig,
            },
            config: { animationConfig: SlideInLeftSlideOutRight },
          })
        }
        buttonText="Slide In"
      />
      <AnimationButton
        onPress={() =>
          notify('success', {
            params: {
              ...baseNotifyConfig,
            },
            config: { animationConfig: ZoomInDownZoomOutUp },
          })
        }
        buttonText="Zoom In"
      />
      <AnimationButton
        onPress={() =>
          notify('success', {
            params: {
              ...baseNotifyConfig,
            },
            config: { animationConfig: ZoomInDownZoomOutDown },
          })
        }
        buttonText="Zoom In Bounce"
      />

      <AnimationButton
        onPress={() =>
          notify('success', {
            params: {
              ...baseNotifyConfig,
            },
            config: { animationConfig: RotateZIn },
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
