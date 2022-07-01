import { interpolate } from 'react-native-reanimated'
import type {
  AnimationTypeConfig,
  CustomAnimationConfig,
  TransitionStylesConfigFunction,
} from '../../types/animations'

export class AnimationBuilder {
  animationConfigIn: AnimationTypeConfig
  animationConfigOut?: AnimationTypeConfig
  transitionInStylesQueue: TransitionStylesConfigFunction[] = []
  transitionOutStylesQueue?: TransitionStylesConfigFunction[] = []

  transitionInStyles: TransitionStylesConfigFunction // helper field for handling style funcs merging
  transitionOutStyles?: TransitionStylesConfigFunction // helper field for handling style funcs merging

  constructor(config: CustomAnimationConfig) {
    this.animationConfigIn = config.animationConfigIn
    this.animationConfigOut = config.animationConfigOut

    this.transitionInStyles = config.transitionInStyles

    if (config.transitionOutStyles) {
      this.transitionOutStyles = config.transitionOutStyles
    }

    this.transitionInStylesQueue.push(config.transitionInStyles)
    config.transitionOutStyles && this.transitionOutStylesQueue?.push(config.transitionOutStyles)
  }

  add(configToPipe: AnimationBuilder) {
    this.animationConfigIn = configToPipe.animationConfigIn

    if (configToPipe.animationConfigOut) {
      this.animationConfigOut = configToPipe.animationConfigOut
    }

    this.transitionInStyles = configToPipe.transitionInStyles

    if (configToPipe.transitionOutStyles) {
      this.transitionOutStyles = configToPipe.transitionOutStyles
    }

    this.transitionInStylesQueue.push(configToPipe.transitionInStyles)

    configToPipe.transitionOutStyles &&
      this.transitionOutStylesQueue?.push(configToPipe.transitionOutStyles)

    return this
  }
}

export const SlideInTest = new AnimationBuilder({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 2000,
    },
  },
  transitionInStyles: (progress) => {
    'worklet'
    const slideIn = interpolate(progress.value, [0, 1], [-200, 0])
    return {
      transform: [{ translateX: slideIn }],
      opacity: progress.value,
    }
  },
})

export const SlideUpTest = new AnimationBuilder({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 2000,
    },
  },
  transitionInStyles: (progress) => {
    'worklet'
    const slideIn = interpolate(progress.value, [0, 1], [-200, 0])
    return {
      transform: [{ translateY: slideIn }],
      opacity: progress.value,
    }
  },
})

export const FadeInTest = new AnimationBuilder({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 2000,
    },
  },
  transitionInStyles: (progress) => {
    'worklet'
    return {
      opacity: progress.value,
      transform: [{ translateX: 0 }, { translateY: 0 }],
    }
  },
})

export const RotateTest = new AnimationBuilder({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 2000,
    },
  },
  transitionInStyles: (progress) => {
    'worklet'
    const rotate = interpolate(progress.value, [0, 1], [-200, 0])
    return {
      perspective: 400,
      transform: [{ rotate: `${rotate}deg` }],
    }
  },
})

export const generateAnimationConfig = (config: CustomAnimationConfig): CustomAnimationConfig => {
  return config
}
