import { Easing, interpolate } from 'react-native-reanimated'
import { generateAnimationConfig } from '../core/generateAnimationConfig'

export const ZoomInAndOut = generateAnimationConfig({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 400,
      easing: Easing.inOut(Easing.sin),
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const scale = interpolate(progress.value, [0, 1], [0.8, 1])

    return {
      opacity: progress.value,
      transform: [{ scale }],
    }
  },
})

export const SlideInLeftSlideOutRight = generateAnimationConfig({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 400,
      easing: Easing.inOut(Easing.sin),
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const translateX = interpolate(progress.value, [0, 1], [-100, 0])

    return {
      opacity: progress.value,
      transform: [{ translateX }, { translateY: 200 }],
    }
  },
  transitionOutStyles: (progress) => {
    'worklet'

    const translateX = interpolate(progress.value, [0, 1], [100, 0])

    return {
      opacity: progress.value,
      transform: [{ translateX }, { translateY: 200 }],
    }
  },
})

export const CrazyAnimationConfig = generateAnimationConfig({
  animationConfigIn: {
    type: 'spring',
    config: { damping: 10, velocity: 20, stiffness: 80, mass: 1.2 },
  },
  animationConfigOut: {
    type: 'timing',
    config: { duration: 200 },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const interpolatedTrans = interpolate(progress.value, [0, 1], [0, 100])

    return {
      transform: [{ translateY: 500 }, { translateX: interpolatedTrans }],
      opacity: progress.value,
    }
  },
  transitionOutStyles: (progress) => {
    'worklet'

    const interpolatedTrans = interpolate(progress.value, [0, 1], [0, 500])

    return {
      transform: [{ translateY: interpolatedTrans }, { translateX: 100 }],
      opacity: progress.value,
    }
  },
})
