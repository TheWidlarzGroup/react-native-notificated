import { Easing, interpolate } from 'react-native-reanimated'
import { generateAnimationConfig } from '../core/utils/generateAnimationConfig'

export const ZoomInDownZoomOutUp = generateAnimationConfig({
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
    const translateY = interpolate(progress.value, [0, 1], [-100, 0])

    return {
      opacity: progress.value,
      transform: [{ scale }, { translateY }],
    }
  },
})

export const ZoomInDownZoomOutDown = generateAnimationConfig({
  animationConfigIn: {
    type: 'spring',
    config: {
      damping: 4,
      mass: 0.8,
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const scale = interpolate(progress.value, [0, 1], [0.8, 1])
    const translateY = interpolate(progress.value, [0, 1], [-100, 0])

    return {
      opacity: progress.value,
      transform: [{ scale }, { translateY }],
    }
  },
  transitionOutStyles: (progress) => {
    'worklet'

    const scale = interpolate(progress.value, [0, 1], [0.8, 1])
    const translateY = interpolate(progress.value, [0, 1], [100, 0])

    return {
      opacity: progress.value,
      transform: [{ scale }, { translateY }],
    }
  },
})

export const RotateInRotateOut = generateAnimationConfig({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 700,
      easing: Easing.out(Easing.exp),
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const rotate = interpolate(progress.value, [0, 1], [-360, 0])

    return {
      transform: [{ rotate: `${rotate}deg` }, { scale: progress.value }],
      opacity: progress.value,
    }
  },
})

export const RotateZIn = generateAnimationConfig({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 2000,
      easing: Easing.out(Easing.exp),
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const rotateZ = interpolate(progress.value, [0, 1], [-140, 0])
    const rotateX = interpolate(progress.value, [0, 1], [200, 20])
    const rotateY = interpolate(progress.value, [0, 1], [-40, 5])

    return {
      transform: [
        { rotateZ: `${rotateZ}deg` },
        { rotateX: `${rotateX}deg` },
        { rotateY: `${rotateY}deg` },
        { scale: progress.value },
        { perspective: 1500 },
      ],
      opacity: progress.value,
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
      transform: [{ translateX }],
    }
  },
  transitionOutStyles: (progress) => {
    'worklet'

    const translateX = interpolate(progress.value, [0, 1], [100, 0])

    return {
      opacity: progress.value,
      transform: [{ translateX }],
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
      transform: [{ translateY: interpolatedTrans }],
      opacity: progress.value,
    }
  },
})

export const VeryCustomTransition = generateAnimationConfig({
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

    const translateY = interpolate(progress.value, [0, 1], [0, 100])

    return {
      transform: [{ translateY }],
      opacity: progress.value,
    }
  },
  transitionOutStyles: (progress) => {
    'worklet'

    const translateY = interpolate(progress.value, [0, 1], [500, 100])

    return {
      transform: [{ translateY }],
      opacity: progress.value,
    }
  },
})

export const DiagonalSlideInLeftSlideOutRight = generateAnimationConfig({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 700,
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const translateX = interpolate(progress.value, [0, 1], [-100, 0])
    const translateY = interpolate(progress.value, [0, 1], [-100, 0])
    return {
      transform: [{ translateX }, { translateY }],
      opacity: progress.value,
    }
  },
  transitionOutStyles: (progress) => {
    'worklet'

    const translateX = interpolate(progress.value, [0, 1], [100, 0])
    const translateY = interpolate(progress.value, [0, 1], [-100, 0])
    return {
      transform: [{ translateX }, { translateY }],
      opacity: progress.value,
    }
  },
})
